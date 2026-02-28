import { type CookieOptions } from "express";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 5 * 60 * 1000,
  path: "/",
};
