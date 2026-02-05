import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type {
  RegisterSchema,
  LoginSchema,
} from "./auth.schema.ts";


