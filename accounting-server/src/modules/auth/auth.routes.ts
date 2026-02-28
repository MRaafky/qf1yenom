import express, { Router } from "express";
import { loginController, logout, refreshTokenController } from "./auth.controllers.js";

const authRouter: Router = express.Router();

authRouter.post("/login", loginController);
authRouter.post("/refresh-token", refreshTokenController);
authRouter.post("/logout", logout);

export default authRouter;