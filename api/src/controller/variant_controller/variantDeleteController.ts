// import { Request, Response } from "express";
// import { RequestWithUserId } from "../../types";
// import { prisma } from "../../lib/prisma";

// export async function deleteVariant(req: Request, res: Response) {
//   try {
//     const userId = (req as RequestWithUserId).user?.id;
//     const variantId = req.params.variantId as string;
//     const productId = req.params.productId as string;

//     if (!userId) {
//       return res.status(401).json({ message: "unauthorized" });
//     }

//     if (!productId || !variantId) {
//       return res.status(404).json({ message: "product / variant not found" });
//     }

//     await prisma.variant.delete({
//       where: {
//         id: variantId,
//         productId: productId,
//       },
//     });

//     return res.status(200).json({ message: "variant delete success", ok: true });
//   } catch (error) {
//     console.error("error: ", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }
