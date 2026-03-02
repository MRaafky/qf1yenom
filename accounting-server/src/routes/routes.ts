import express, { Router } from "express";
import usersRouter from "../modules/users/users.routes.js";
import accountRouter from "../modules/accounts/accounts.routes.js";
import authRouter from "../modules/auth/auth.routes.js";

// Import middleware untuk pengetesan
import { autenticate } from "../midlewares/auth.middleware.js";
import { authorizeRole } from "../midlewares/authorization.middleware.js";

const router: Router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/accounts", accountRouter);

// Rute tes rahasia, hanya bisa diakses role "Admin"
router.get("/test-admin", autenticate, authorizeRole(["Admin"]), (req, res) => {
    res.status(200).json({ message: "Berhasil! Anda memiliki akses Admin." });
});

export default router;
