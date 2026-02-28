import z from "zod";

export const createAccountsSchema = z.object({
  body: z.object({
    kode_akun: z.string().min(1, "kode akun harus diisi "),
    nama_akun: z.string().min(1, "nama akun harus diisi"),
    kategori_akun: z.enum(["Aset", "Liabilitas", "Ekuitas", "Income", "Cost"]),
    saldo_normal: z.enum(["debet", "kredit"]),
    status: z.enum(["aktif", "nonaktif"]).default("aktif"),
  }),
});

export type CreateAccountsInput = z.infer<typeof createAccountsSchema>["body"];
