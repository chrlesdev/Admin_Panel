import { z } from "zod";

export const authUser = z.object({
  name: z.string().min(1, { message: "username is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{9,14}$/, {
    message: "Invalid phone number format",
  }),
});
