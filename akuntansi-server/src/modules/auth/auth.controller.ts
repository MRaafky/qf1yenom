import type { Request, Response } from "express";
import { JWT_SECRET } from "../../config/env.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { RegisterSchema, LoginSchema } from "./auth.schema.js";
import { prisma } from "../../config/prisma.js";

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData: RegisterSchema = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await prisma.user.create({
      data: {
        nama: validatedData.nama,
        email: validatedData.email,
        password_hash: hashedPassword,
        role_id: validatedData.role_id,
      },
    });

    res.status(201).json({
      message: "User berhasil dibuat",
      user,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Terjadi kesalahan" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validated: LoginSchema = req.body;

    const user = await prisma.user.findUnique({
      where: { email: validated.email },
      include: { role: true },
    });

    if (!user) {
      return res.status(400).json({ message: "Email tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(
      validated.password,
      user.password_hash,
    );

    if (!isMatch) {
      return res.status(400).json({ message: "Password salah" });
    }

    const payload = {
      userId: user.user_id,
      role: user.role_id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Login berhasil",
      token,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Terjadi kesalahan" });
    }
  }
};
