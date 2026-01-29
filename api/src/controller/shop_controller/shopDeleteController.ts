import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export async function deleteShop(req: Request, res: Response) {
  try {
    const shopId = req.params.shopId as string;
    if (!shopId) {
      return res.status(401).json({ message: "unauthorized" });
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
