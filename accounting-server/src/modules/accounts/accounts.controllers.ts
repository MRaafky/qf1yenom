import type { Request, Response } from 'express';
import {prisma} from "../../../lib/prisma.js";
import { createAccountsSchema } from './accounts.schema.js';
import { createAccountService } from './accounts.services.js';

export const getAccounts = async (req: Request, res: Response) => {
  const accounts = await prisma.accounts.findMany();
  return res.status(200).json({ data: accounts });
}

export const getAccountById = async (req: Request, res: Response) => {

}

export const createAccount = async (req: Request, res: Response) => {
  try {
    const validatedInput = createAccountsSchema.parse({ body: req.body as unknown });
    const createAccount = await createAccountService(validatedInput.body);

    return res.status(201).json({
      message: "Account created successfully",
      data: createAccount
    })
  } catch (error: any) {
    return res.status(400).json({
      error: error.message
    })
  }
}

export const updateAccount = async (req: Request, res: Response) => {

}

export const deleteAccount = async (req: Request, res: Response) => {

}
