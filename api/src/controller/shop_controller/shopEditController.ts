import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { shopSchema } from "../../schema/validSchema";

export async function editShop(req: Request, res: Response) {
  try {
    const shopId = req.params.shopId as string;
    if (!shopId) {
      return res.status(401).json({ message: "unauthorized" });
    }
    const parsedData = shopSchema.parse(req.body);
    const { shopName, platform } = parsedData;

    const editShops = await prisma.shop.update({
      where: {
        id: shopId,
      },
      data: {
        shopName,
        platform,
      },
    });

    return res.status(201).json({ message: "shop edit success", ok: true, data: editShops });
  } catch (error) {
    console.error("error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
