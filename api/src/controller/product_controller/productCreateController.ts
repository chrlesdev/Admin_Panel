import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { productSchema } from "../../schema/validSchema";

export async function productCreate(req: Request, res: Response) {
  try {
    const shopId = req.params.shopId;
    if (typeof shopId !== "string") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!shopId) {
      return res.status(400).json({ message: "Shop ID required" });
    }

    const productData = productSchema.parse(req.body);
    const { productName, productStock, productCostPrice, productSellingPrice } = productData;

    await prisma.product.create({
      data: {
        productName,
        productStock,
        productCostPrice,
        productSellingPrice,
        shop: {
          connect: {
            id: shopId,
          },
        },
      },
    });

    return res.status(201).json({
      message: "Product created",
      ok: true,
    });
  } catch (error) {
    console.error("SignUp error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
