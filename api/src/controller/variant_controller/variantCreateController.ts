import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { variantScema } from "../../schema/validSchema";
import { RequestWithUserId } from "../../types";

export async function createVariant(req: Request, res: Response) {
  try {
    const userId = (req as RequestWithUserId).user?.id;
    const productId = req.params.productId as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!productId) {
      return res.status(404).json({ message: "product not found" });
    }

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        shop: {
          userId: userId,
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: "product not found", ok: false });
    }

    const parsedData = variantScema.parse(req.body);
    const { variantName, sellingPrice, costPrice, stock } = parsedData;

    const productVariant = await prisma.variant.create({
      data: {
        variantName,
        costPrice,
        sellingPrice,
        stock,
        productId: productId,
      },
    });

    return res.status(201).json({ message: "variant Product Created!", ok: true, variant: productVariant });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
}
