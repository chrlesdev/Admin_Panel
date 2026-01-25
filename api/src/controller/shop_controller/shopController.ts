import { Request, Response } from "express";
import { shopSchema } from "../../schema/validSchema";
import { prisma } from "../../lib/prisma";
import { RequestWithUserId } from "../../types";

export async function shopCreate(req: Request, res: Response) {
  try {
    const userId = (req as RequestWithUserId).user?.id;

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }
    const shopData = shopSchema.parse(req.body);
    const { shopName, platform } = shopData;

    const newShop = await prisma.shop.create({
      data: {
        shopName,
        platform,
        userId,
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
