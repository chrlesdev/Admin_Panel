import { Request, Response } from "express";
import { authUser } from "../schema/authSchema";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
import { hash, genSalt } from "bcryptjs";
import { ZodError } from "zod";

export async function signUp(req: Request, res: Response) {
  try {
    // Validate input
    const parsedData = authUser.parse(req.body);
    const { name, email, phoneNumber, password } = parsedData;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        error: "User already exists", // ← Fixed message
      });
    }

    // Hash password
    const salt = await genSalt(12);
    const hashedPass = await hash(password, salt);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPass,
        phoneNumber,
      },
    });

    // Generate JWT
    const jwtPayload = {
      id: newUser.id,
      email: newUser.email,
    };

    const token = jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "7d" }, // ← Changed to 7 days
    );

    // Send token as httpOnly cookie (more secure)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    // Send response (without password)
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      },
    });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: "Validation error",
      });
    }

    // Handle other errors
    console.error("SignUp error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
