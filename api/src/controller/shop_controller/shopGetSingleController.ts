import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export async function getSingleShop(req: Request, res: Response) {
  try {
    const shopId = req.params.shopId as string;
    if (!shopId) {
      return res.status(404).json({ message: "shop not found" });
    }

    const singleShop = await prisma.shop.findUnique({
      where: {
        id: shopId,
      },
      include: {},
    });

    return res.status(200).json({ message: "fetch single shop success", ok: true, data: singleShop });
  } catch (error) {
    console.error("error :", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
