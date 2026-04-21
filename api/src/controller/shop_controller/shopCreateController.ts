import { Request, Response } from "express";
import { shopSchema } from "../../schema/validSchema";
import { prisma } from "../../lib/prisma";
import { RequestOwnerId } from "../../types";

export async function createShop(req: Request, res: Response) {
  try {
    const userId = (req as RequestOwnerId).owner?.id;

    if (!userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const shopData = shopSchema.parse(req.body);
    const { shopName, platformName, feePercent, fixedFee } = shopData;

    const newShop = await prisma.shop.create({
      data: {
        owner: {
          connect: {
            id: userId,
          },
        },
        shopName,
        platform: {
          create: {
            name: platformName,
            feePercent: feePercent,
            fixedFee: fixedFee,
          },
        },
      },
    });
    return res.status(200).json({
      message: "Shop Created",
      shop: newShop,
      ok: true,
    });
  } catch (error) {
    console.error("SignUp error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
