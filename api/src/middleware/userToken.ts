import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function verifyUserToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "please login again" });
    }

    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    if (!verifiedUser) {
      return res.status(401).json({ message: "token expired, please login again" });
    }

    next();
  } catch (error) {
    console.error("error : ", error);
  }
}
