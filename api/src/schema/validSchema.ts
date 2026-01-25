import e from "express";
import { platform } from "node:os";
import { email, z } from "zod";

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
