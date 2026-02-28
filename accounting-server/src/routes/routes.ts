import express, { Router } from "express";
import usersRouter from "../modules/users/users.routes.js";
import accountRouter from "../modules/accounts/accounts.routes.js";
import authRouter from "../modules/auth/auth.routes.js";

const router: Router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/accounts", accountRouter);

export default router;
