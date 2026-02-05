import * as z from "zod";

export const registerSchema = z.object({
  body: z.object({
    nama: z.string().min(3, "Nama harus diisi"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    role_id: z.number().int(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Email tidak valid"),
    password: z.string(),
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>["body"];
export type LoginSchema = z.infer<typeof loginSchema>["body"];
