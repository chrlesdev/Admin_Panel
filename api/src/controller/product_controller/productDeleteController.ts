// import { Request, Response } from "express";
// import { prisma } from "../../lib/prisma";
// import { RequestWithUserId } from "../../types";

// export async function deleteProduct(req: Request, res: Response) {
//   try {
//     const userId = (req as RequestWithUserId).user?.id;
//     const shopId = req.params.shopId;
//     const productId = req.params.productId as string;

//     if (!userId) {
//       return res.status(401).json({ message: "unauthorized", ok: false });
//     }
//     if (!shopId || !productId) {
//       return res.status(400).json({ message: "Shop ID required" });
//     }

//     await prisma.product.delete({
//       where: {
//         id: productId,
//       },
//     });

//     return res.status(200).json({ message: "delete product success" });
//   } catch (error) {
//     console.error("error: ", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }
