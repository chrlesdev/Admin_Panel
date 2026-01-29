import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { RequestWithUserId } from "../../types";

export async function getAllShop(req: Request, res: Response) {
  try {
    const userId = (req as RequestWithUserId).user?.id;

    const allShop = await prisma.shop.findMany({
      where: {
        userId: userId,
      },
    });

    return res.status(200).json({ message: "fetch all shop success", ok: true, data: allShop });
  } catch (error) {
    console.error("error : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
