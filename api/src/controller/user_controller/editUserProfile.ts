import { Request, Response } from "express";
import { RequestWithUserId } from "../../types";
import { prisma } from "../../lib/prisma";

export async function editProfile(req: Request, res: Response) {
  try {
    const userId = (req as RequestWithUserId).user?.id;
    if (!userId) return console.log("please Login again");

    const editsUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return res.status(200).json({ message: "edit success", ok: true, editsUser });
  } catch (error) {
    console.error("SignUp error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
