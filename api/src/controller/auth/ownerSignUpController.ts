import { Request, Response } from "express";
import { authOwner } from "../../schema/validSchema";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import { hash, genSalt } from "bcryptjs";

export async function signUp(req: Request, res: Response) {
  try {
    const parsedData = authOwner.parse(req.body);
    const { name, email, phoneNumber, password } = parsedData;

    // Check if user exists
    const existingOwner = await prisma.owner.findUnique({
      where: { email },
    });

    if (existingOwner) {
      return res.status(409).json({
        error: "User already exists",
      });
    }

    // Hash password
    const salt = await genSalt(12);
    const hashedPass = await hash(password, salt);

    const phone = await prisma.owner.findUnique({
      where: {
        phoneNumber,
      },
    });

    if (phone) {
      return res.status(401).json({ message: "phone number already registered" });
    }

    // Create user
    const newOwner = await prisma.owner.create({
      data: {
        name,
        email,
        password: hashedPass,
        phoneNumber,
      },
    });

    // Generate JWT
    const jwtPayload = {
      id: newOwner.id,
      email: newOwner.email,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY as string, { expiresIn: "7d" });

    res.cookie("OwnerToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "Owner created successfully",
      user: {
        id: newOwner.id,
        name: newOwner.name,
        email: newOwner.email,
        phoneNumber: newOwner.phoneNumber,
      },
    });
  } catch (error) {
    console.error("SignUp owner error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
