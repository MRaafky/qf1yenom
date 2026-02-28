import type { AppJwtPayload } from "./jwt.js";

declare global {
  namespace Express {
    interface Request {
      user?: AppJwtPayload;
    }
  }
}

export {};