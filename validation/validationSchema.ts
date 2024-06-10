import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: "User name is required",
    }),

    password: z
      .string({ required_error: "Password is required" })
      .trim()
      .min(8, { message: "password must have at least 8 characters" }),
  }),
});
