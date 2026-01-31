import { date, email, z } from "zod";

export const authUser = z.object({
  name: z.string().min(1, { message: "username is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  phoneNumber: z.string().regex(/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/, {
    message: "Invalid phone number format",
  }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export const shopSchema = z.object({
  shopName: z.string().min(1, { message: "shop name is required" }),
  platform: z.string().min(1, { message: "platform name is required" }),
});

export const productSchema = z.object({
  productName: z.string().min(1, { message: "product name is required" }),
  productStock: z.int(),
  productCostPrice: z.float32().optional(),
  productSellingPrice: z.float32(),
});

export const variantScema = z.object({
  variantName: z.string().min(1, { message: "variant name is required" }),
  stock: z.int(),
  sellingPrice: z.float32(),
  costPrice: z.float32().optional(),
});

export const saleSchema = z.object({
  shopId: z.string(),
  productId: z.string(),
  variantId: z.string().optional(),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  totalPrice: z.float64(),
  totalCost: z.float64(),
  profit: z.float64(),
  resi: z.string(),
  saleDate: z.date(),
});
