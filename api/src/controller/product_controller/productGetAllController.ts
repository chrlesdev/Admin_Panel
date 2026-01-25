import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export async function getAllProduct(req: Request, res: Response) {
  try {
    const shopId = req.params.shopId;
    if (typeof shopId !== "string") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!shopId) {
      return res.status(400).json({ message: "Shop ID required" });
    }

    const allProduct = await prisma.shop.findMany({
      where: {
        id: shopId,
      },

      include: {
        products: true,
      },
    });

    console.log(allProduct);
    return res.status(200).json({ message: "get all product succes", ok: true, data: allProduct });
  } catch (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({
      message: "Fetch failed",
    });
  }
}
