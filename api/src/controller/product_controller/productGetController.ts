import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export async function getProduct(req: Request, res: Response) {
  try {
    const productId = req.params.productId;
    if (typeof productId !== "string") {
      return res.status(400).json({ message: "Invalid Product Item" });
    }

    if (!productId) {
      return res.status(400).json({ message: "Invalid Product Item" });
    }

    const singleProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {},
    });

    return res.status(200).json({ message: "get product succes", ok: true, data: singleProduct });
  } catch (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({
      message: "Fetch failed",
    });
  }
}
