import * as z from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password harus minimal 6 karakter"),
  }),
});

export type inputLoginSchema = z.infer<typeof loginSchema>["body"];
