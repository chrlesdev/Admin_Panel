// import { Request, Response } from "express";
// import { prisma } from "../../lib/prisma";
// import { RequestWithUserId } from "../../types";

// export async function getSingleVariant(req: Request, res: Response) {
//   try {
//     const userId = (req as RequestWithUserId).user?.id;
//     const productId = req.params.productId as string;
//     const variantId = req.params.variantId as string;

//     if (!userId) {
//       return res.status(404).json({ message: "unauthorized" });
//     }
//     if (!productId || !variantId) {
//       return res.status(404).json({ message: "product not found" });
//     }

//     const variant = await prisma.variant.findUnique({
//       where: {
//         id: variantId,
//         productId: productId,
//         product: {
//           shop: {
//             userId: userId,
//           },
//         },
//       },
//       include: {
//         product: {
//           select: {
//             id: true,
//             productName: true,
//           },
//         },
//       },
//     });

//     console.log(variant);

//     if (!variant) {
//       return res.status(404).json({
//         message: "Variant not found or you don't have permission",
//       });
//     }

//     return res.status(200).json({ message: "fetch success", ok: true, variantProduct: variant });
//   } catch (error) {
//     console.error("error", error);
//     return res.status(500).json({ message: "internal server error" });
//   }
// }
