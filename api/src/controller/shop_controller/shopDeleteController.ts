import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { RequestOwnerId } from "../../types";

export async function deleteShop(req: Request, res: Response) {
  try {
    const ownerId = (req as RequestOwnerId).owner?.id;
    if (!ownerId) {
      res.status(401).json({ message: "Unauthorized" });
    }
    const shopId = req.params.shopId as string;

    if (!shopId) {
      return res.status(404).json({ message: "Shop Not Found" });
    }

    await prisma.shop.delete({
      where: {
        id: shopId,
      },
    });

    return res.status(201).json({ message: "shop delete success" });
  } catch (error) {
    console.error("error :", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
