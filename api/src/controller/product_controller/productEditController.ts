import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { productSchema } from "../../schema/validSchema";

export async function editProduct(req: Request, res: Response) {
  try {
    const productId = req.params.productId;
    if (typeof productId !== "string") {
      return res.status(400).json({ message: "Invalid Product Item" });
    }

    if (!productId) {
      return res.status(400).json({ message: "Invalid Product Item" });
    }

    const parsedData = productSchema.parse(req.body);
    const { productName, productStock, productCostPrice, productSellingPrice } = parsedData;

    await prisma.product.update({
      data: {
        productName,
        productStock,
        productCostPrice,
        productSellingPrice,
      },

      where: {
        id: productId,
      },
    });

    return res.status(200).json({ message: "Edit Product success", ok: true });
  } catch (error) {
    console.error("SignUp error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
