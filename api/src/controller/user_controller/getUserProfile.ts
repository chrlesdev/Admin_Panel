import { Request, Response } from "express";
import { RequestOwnerId } from "../../types";
import { prisma } from "../../lib/prisma";

export async function getOwner(req: Request, res: Response) {
  try {
    const id = (req as RequestOwnerId).owner?.id;
    const ownerId = await prisma.owner.findUnique({
      where: {
        id,
      },
    });

    if (!ownerId) {
      console.log("ownerId", ownerId);
      return res.status(404).json({ message: `user not found id: ${id}`, id: ownerId });
    }

    return res.status(200).json({ message: "user Found", data: ownerId });
  } catch (error) {
    console.error(error);
  }
}
