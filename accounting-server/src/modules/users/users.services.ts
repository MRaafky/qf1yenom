import { prisma } from "../../../lib/prisma.js";
import bcrypt from "bcrypt";
import type { CreateUsersInput, UpdateUsersInput } from "./users.schema.js";

export const createUsersService = async (data: CreateUsersInput) => {
  const { name, email, password, roleId } = data;

  // bandingkan email yang sudah ada
  const existingUser = await prisma.users.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  // hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Simpan ke database
  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
      roleId: BigInt(roleId),
    },
    select: {
      id: true,
      name: true,
      email: true,
      roleId: true,
      role: {
        select: { name: true },
      },
      createdAt: true,
    },
  });
  return user;
};

export const updateUserService = async (userId: bigint, data: UpdateUsersInput) => {
  
}

export const deleteUserService = async (userId: bigint) => {
  const user = await prisma.users.findUnique({
    where: { id: userId }
  });
  if(!user) throw new Error("USER_NOT_FOUND");

  await prisma.users.delete({
    where: { id: userId }
  });
}

export const getAllUsersService = async () => {
  const users = await prisma.users.findMany({
    select: {
      name: true,
      email: true,
      role: {
        select: {
          name: true
        }
      },
      createdAt: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const formattedUsers = users.map((user) => ({
    name: user.name,
    email: user.email,
    role: user.role.name,
    createdAt: user.createdAt,
  }));
  return formattedUsers;
}
