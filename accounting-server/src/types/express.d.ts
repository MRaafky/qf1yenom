import type { appJwtPayload } from "./jwt.js";

declare global {
  namespace Express {
    interface Request {
      user?: appJwtPayload;
    }
  }
}

export {};