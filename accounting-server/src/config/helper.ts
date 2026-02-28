import crypto from "crypto";
import type { appJwtPayload } from "../types/jwt.js";
import jwt from "jsonwebtoken";

export const generateToken = (
  payload: Omit<appJwtPayload, "iat" | "exp">,
): string => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign(payload, secret!, { expiresIn: "15m" });
};

export const generateRefreshToken = () => {
  return crypto.randomBytes(40).toString("hex");
};

export const verifyToken = (token: string): appJwtPayload | null => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    if (
      typeof payload === "object" &&
      "userId" in payload &&
      "email" in payload &&
      "role" in payload &&
      "permissions" in payload
    ) {
      return payload as appJwtPayload;
    }

    return null;
  } catch (error) {
    return null;
  }
};
