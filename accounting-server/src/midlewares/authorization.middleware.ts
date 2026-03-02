import type { Response, Request, NextFunction } from "express";

export const authorizeRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res
                    .status(401)
                    .json({ message: "Akses ditolak. Token tidak valid atau tidak ada." });
            }

            if (!allowedRoles.includes(req.user.role)) {
                return res
                    .status(403)
                    .json({ message: "Akses ditolak. Role Anda tidak memiliki izin." });
            }

            next();
        } catch (error) {
            return res.status(500).json({ message: "Terjadi kesalahan pada server" });
        }
    };
};

export const authorizePermission = (requiredPermission: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res
                    .status(401)
                    .json({ message: "Akses ditolak. Token tidak valid atau tidak ada." });
            }

            if (!req.user.permissions.includes(requiredPermission)) {
                return res.status(403).json({
                    message: "Akses ditolak. Anda tidak memiliki izin untuk tindakan ini.",
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({ message: "Terjadi kesalahan pada server" });
        }
    };
};
