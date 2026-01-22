import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";
import { Request, Response, NextFunction } from "express";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST || "localhost",
  port: 3306,
  connectionLimit: 5,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const prisma = new PrismaClient({ adapter });

export async function signUp(req: Request, res: Response) {
  // const parsedData
}
