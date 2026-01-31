import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { RequestWithUserId } from "../../types";
import { saleSchema } from "../../schema/validSchema";
import { productSchema } from "../../schema/validSchema";
import { variantScema } from "../../schema/validSchema";

export async function sales(req: Request, res: Response) {
  try {
    const userId = (req as RequestWithUserId).user?.id;
    const shopIds = req.params.shopId as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const shops = await prisma.shop.findUnique({
      where: {
        id: shopIds,
        userId: userId,
      },
    });

    if (!shops) {
      return res.status(404).json({ message: "Shop not found or unauthorized" });
    }

    const productData = productSchema.parse(req.body);
    const { productName, productStock, productCostPrice, productSellingPrice } = productData;

    const variantData = variantScema.parse(req.body);
    const { variantName, costPrice, sellingPrice, stock } = variantData;

    const saleData = saleSchema.parse(req.body);
    const { shopId, productId, variantId, quantity, totalPrice, totalCost, profit, resi, saleDate } = saleData;

    // const total =

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        shopId: shopId,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "product not found in this shop" });
    }

    if (variantId) {
      const variant = await prisma.variant.findFirst({
        where: {
          id: variantId,
          productId: productId,
        },
      });

      if (!variant) {
        return res.status(404).json({ message: "Variant not found" });
      }
    }

    const sale = await prisma.sale.create({
      data: {
        shopId,
        productId,
        variantId: variantId || null,
        quantity,
        totalPrice,
        totalCost,
        profit,
        resi: resi || null,
        saleDate: saleDate ? new Date(saleDate) : new Date(),
      },
    });

    res.status(200).json({ message: "sale record created", ok: true, data: sale });
  } catch (error) {
    console.error("error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
