import { Request, Response, NextFunction } from "express";
import { AuthenticatedAdmin, AuthenticatedOwner, RequestAdminId, RequestOwnerId } from "../types";
import jwt from "jsonwebtoken";

export async function verifyOwnerToken(req: Request, res: Response, next: NextFunction) {
  try {
    const ownerToken = req.cookies.token;

    if (!ownerToken) {
      return res.status(401).json({ message: "Unauthorized, Please try To login again" });
    }

    jwt.verify(ownerToken, process.env.JWT_SECRET_KEY as string, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized Owner, Please try To login again" });
      }
      const payload = decoded as AuthenticatedOwner;

      if (payload.role !== "admin") {
        return res.status(403).json({ message: "Forbidden only for Admin" });
      }
      (req as RequestOwnerId).owner = payload;
      next();
    });
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({
      message: "Authentication failed",
    });
  }
}

export async function verifyAdminToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "please login again" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized Admin, Please try To login again" });
      }

      const payload = decoded as AuthenticatedAdmin;

      if (payload.role !== "admin") {
        return res.status(403).json({ message: "Forbidden only for Admin" });
      }
      (req as RequestAdminId).admin = payload;

      next();
    });
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({
      message: "Authentication failed",
    });
  }
}
