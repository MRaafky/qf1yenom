import type { Request, Response } from "express";
import { createUsersSchema, userIdParamsSchema } from "./users.schema.js";
import { createUsersService, deleteUserService, getAllUsersService } from "./users.services.js";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    return res.status(200).json({ 
      length: users.length,
      data: users
     });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export const getUsersById = async (req: Request, res: Response) => {

}

export const createUser = async (req: Request, res: Response) => {
  try {
    // validasi input 
    const validatedInput = createUsersSchema.parse({ body: req.body as unknown});
    const createUser = await createUsersService(validatedInput.body);

    return res.status(201).json({ 
      message: "User created successfully",
      data: createUser});
  } catch (error: any) {
    if (error.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(409).json({ error: "Email already exists" });
    }
    return res.status(500).json({ error: error.message });
  }
}

export const updateUser = async (req: Request, res: Response) => {
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const validatedInput = userIdParamsSchema.parse({ body: req.params as unknown });
    const result = await deleteUserService(validatedInput.body.id);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    if (error instanceof Error && error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ error: "User not found" });
    }
  }
}