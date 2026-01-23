import { Request, Response, NextFunction } from "express";
import { authUser } from "../schema/authSchema";
import { prisma } from "../lib/prisma";
import { parse } from "node:path";

export async function signUp(req: Request, res: Response) {
  try {
    const parsedData = authUser.parse(req.body);
    const { name, email, phoneNumber, password } = parsedData;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) return res.status(409).json({ message: "User already logged in" });

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        phoneNumber,
      },
    });

    return res.status(201).json({ message: "userCreated", data: newUser });
  } catch (error) {}
}
