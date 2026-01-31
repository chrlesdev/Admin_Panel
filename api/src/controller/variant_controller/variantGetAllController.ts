import { Request, Response } from "express";
import { RequestWithUserId } from "../../types";
import { prisma } from "../../lib/prisma";

export async function getAllVariant(req: Request, res: Response) {
  try {
    const userId = (req as RequestWithUserId).user?.id;
    const productId = req.params.productId as string;
    const variantId = req.params.variantId as string;

    if (!userId) {
      return res.status(404).json({ message: "unauthorized" });
    }
    if (!productId || !variantId) {
      return res.status(404).json({ message: "product not found" });
    }

    const getAll = await prisma.variant.findMany({
      where: {
        id: productId,
      },
      include: {},
    });

    return res.status(201).json({ message: "fetch get all success", ok: true, data: getAll });
  } catch (error) {
    console.error("error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
