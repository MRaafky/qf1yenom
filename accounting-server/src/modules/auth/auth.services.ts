import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma.js";
import type { inputLoginSchema } from "./auth.schema.js";
import { sanitizeUser } from "../../types/auth.type.js";
import { generateToken, generateRefreshToken } from "../../config/helper.js";

export const loginService = async (data: inputLoginSchema) => {
  const { email, password } = data;
  const user = await prisma.users.findUnique({
    where: { email },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new Error("Email tidak ditemukan");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password salah");
  }

  const permissions = user.role.permissions.map((p) => p.permission.name);

  const role = user.role.name;

  const payload = {
    userId: user.id.toString(),
    email: user.email,
    role: role,
    permissions: permissions,
  };

  const token = generateToken(payload);
  const refreshToken = generateRefreshToken();
  const expiredAt = new Date();
  expiredAt.setDate(expiredAt.getDate() + 7);

  await prisma.refresh_tokens.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: expiredAt,
    },
  });

  return {
    message: "Login berhasil",
    data: {
      user: sanitizeUser(user),
      token,
      refreshToken,
    },
  };
};

export const logoutService = async (refreshToken: string) => {
  await prisma.refresh_tokens.delete({
    where: { token: refreshToken },
  });

  return {
    message: "Logout berhasil",
  };
};

export const refreshTokenService = async (refreshToken: string) => {
  const storedToken = await prisma.refresh_tokens.findUnique({
    where: { token: refreshToken },
    include: {
      user: {
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!storedToken) {
    throw new Error("Refresh token tidak valid");
  }

  if (storedToken.expiresAt < new Date()) {
    await prisma.refresh_tokens.delete({ where: { id: storedToken.id } });
    throw new Error("Refresh token sudah expired");
  }

  const user = storedToken.user;
  const permissions = user.role.permissions.map((p) => p.permission.name);
  const role = user.role.name;

  const payload = {
    userId: user.id,
    email: user.email,
    role: role,
    permissions: permissions,
  };

  const newToken = generateToken(payload);
  const newRefreshToken = generateRefreshToken();
  const expiredAt = new Date();
  expiredAt.setDate(expiredAt.getDate() + 7);

  await prisma.$transaction([
    prisma.refresh_tokens.delete({ where: { id: storedToken.id } }),
    prisma.refresh_tokens.create({
      data: {
        userId: user.id,
        token: newRefreshToken,
        expiresAt: expiredAt,
      },
    }),
  ]);

  return {
    messsage: "Token berhasil diperbarui",
    data: {
      accessToken: newToken,
      refreshToken: newRefreshToken,
    },
  };
};
