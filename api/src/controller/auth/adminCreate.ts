import { Request, Response } from "express";
import { authAdmin } from "../../schema/validSchema";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import { RequestOwnerId } from "../../types";
import { hash, genSalt } from "bcryptjs";

export async function adminSignUp(req: Request, res: Response) {
  try {
    const Owner = (req as RequestOwnerId).owner;

    if (!Owner || !Owner.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const parsedData = authAdmin.parse(req.body);
    const { name, email, password, Roles } = parsedData;

    const existingAdmin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (existingAdmin) {
      return res.status(409).json({ error: "user already exists" });
    }

    const salt = await genSalt(12);
    const hashedPass = await hash(password, salt);

    const newAdmin = await prisma.admin.create({
      data: {
        name: name,
        email: email,
        password: hashedPass,
        ownerId: Owner.id,
        roles: Roles,
      },
    });

    const jwtPayload = {
      id: newAdmin.id,
      email: newAdmin.email,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY as string, { expiresIn: "7d" });

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "Admin created successfully",
      user: {
        id: newAdmin.id,
        name: newAdmin.name,
        email: newAdmin.email,
        ownerId: newAdmin.ownerId,
      },
    });
  } catch (error) {
    console.error("SignUp Admin error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
