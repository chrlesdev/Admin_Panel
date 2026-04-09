import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { RequestOwnerId } from "../../types";

export async function getAllShop(req: Request, res: Response) {
  try {
    const ownerId = (req as RequestOwnerId).owner?.id;

    const owner = await prisma.owner.findUnique({
      where: {
        id: ownerId,
      },
    });

    if (!ownerId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const shopData = await prisma.shop.findMany({
      where: {
        ownerId,
      },
    });

    return res.status(200).json({ message: "fetch all shop success", ok: true, data: shopData });
  } catch (error) {
    console.error("error : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
