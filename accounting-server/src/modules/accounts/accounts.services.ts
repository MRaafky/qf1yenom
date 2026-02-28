import { prisma } from "../../../lib/prisma.js";
import type { CreateAccountsInput } from "./accounts.schema.js";

export const createAccountService = async (data: CreateAccountsInput) => {
  const { kode_akun, nama_akun, kategori_akun, saldo_normal, status } = data;

  const existingAccount = await prisma.accounts.findUnique({
    where: { kode_akun },
  });

  if (existingAccount) {
    throw new Error("kode akun sudah ada");
  }

  const createAccount = await prisma.accounts.create({
    data: {
      kode_akun,
      nama_akun,
      kategori_akun,
      saldo_normal,
      status,
    }
  });
  return createAccount;
};
