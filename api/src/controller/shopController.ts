import { Request, Response } from "express";
import { shopSchema } from "../schema/validSchema";
import { prisma } from "../lib/prisma";
import { RequestWithUserId } from "../types";

export async function shopCreate(req: Request, res: Response) {
  try {
    const id = (req as RequestWithUserId).user?.id;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    const shopData = shopSchema.parse(req.body);
    const { shopName, platform } = shopData;

    await prisma.shop.create({
      data: {
        shopName,
        platform,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    return res.status(200).json({
      message: "Shop Created",
      ok: true,
    });
  } catch (error) {
    console.error("SignUp error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
