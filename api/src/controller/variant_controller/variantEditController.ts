import { Request, Response } from "express";
import { RequestWithUserId } from "../../types";
import { variantScema } from "../../schema/validSchema";
import { prisma } from "../../lib/prisma";

export async function editVariant(req: Request, res: Response) {
  try {
    const userId = (req as RequestWithUserId).user?.id;
    const variantId = req.params.variantId as string;
    const productId = req.params.productId as string;

    if (!userId) {
      return res.status(401).json({ message: "unauthorized" });
    }

    if (!variantId) {
      return res.status(404).json({ message: "variant not found" });
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

    const editVariants = await prisma.variant.update({
      where: {
        id: productId,
      },
      data: {
        variantName,
        sellingPrice,
        costPrice,
        stock,
      },
    });

    return res.status(200).json({ message: "edit variant success", ok: true, data: editVariants });
  } catch (error) {
    console.error("error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
