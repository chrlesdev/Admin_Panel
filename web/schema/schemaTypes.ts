import z from "zod";

export const user = z.object({
  name: z.string().min(1, { message: "username is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  phoneNumber: z.string().regex(/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/, {
    message: "Invalid phone number format",
  }),
});

export const variantSchema = z.object({
  variantName: z.string().min(1, { message: "Variant Name is required" }),
  variantStock: z.int().default(0),
  variantCostPrice: z.float32().default(0),
  productSellingPrice: z.float32().default(0),
});

export const productSchema = z.object({
  productName: z.string().min(1, { message: "Product Name is required" }),
  productStock: z.int(),
  productCostPrice: z.float32().default(0),
  productSellingPrice: z.float32(),
  hasVariants: z.array(variantSchema).optional(),
});
