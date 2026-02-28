import type { Response, Request } from "express";
import {
  loginService,
  refreshTokenService,
  logoutService,
} from "./auth.services.js";
import { loginSchema } from "./auth.schema.js";
import { cookieOptions } from "../../config/cookie.js";

export const loginController = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse({ body: req.body as unknown});
    const result = await loginService(validatedData.body);

    res.cookie("refreshToken", result.data.refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: result.message,
      accessToken: result.data.token,
      user: result.data.user,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    let message = "Logout berhasil";
    if (refreshToken) {
      const result = await logoutService(refreshToken);
      message = result.message;
    }

    res.clearCookie("refreshToken", cookieOptions);
    return res.status(200).json({ message });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const result = await refreshTokenService(refreshToken);

    res.cookie("refreshToken", result.data.refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: result.messsage,
      accessToken: result.data.accessToken,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
  return res.status(500).json({ message: "Internal Server Error" });
};
