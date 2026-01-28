import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";

export async function logout(req: Request, res: Response) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "no token provided" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { exp: number };

    await prisma.token.create({
      data: {
        token: token,
        expiredAt: new Date(decode.exp * 1000),
      },
    });

    res.clearCookie("token");

    res.status(200).json({ message: "Successfully logged out", ok: true });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
