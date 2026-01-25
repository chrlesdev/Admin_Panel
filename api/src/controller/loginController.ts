import { Request, Response } from "express";
import { loginSchema } from "../schema/validSchema";
import { prisma } from "../lib/prisma";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export async function login(req: Request, res: Response) {
  try {
    const parsedData = loginSchema.parse(req.body);

    const { email, password } = parsedData;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return res.status(404).json({ message: "Invalid Email / Password", ok: false });

    const isValidPassword = await compare(password, user?.password!);

    if (!isValidPassword) return res.status(401).json({ message: "Invalid Email / Password", ok: false });

    const jwtPayload = { id: user.id };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY as string, { expiresIn: "15m" });

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      //cokkie nama token, value nya
      httpOnly: false,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ message: "loggin success", ok: true });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
