import {
  getAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
} from "./accounts.controllers.js";
import { Router } from "express";

const accountRouter: Router = Router();

accountRouter.get("/getAccounts", getAccounts);
accountRouter.get("/getAccountById/:id", getAccountById);
accountRouter.post("/createAccount", createAccount);
accountRouter.put("/updateAccount/:id", updateAccount);
accountRouter.delete("/deleteAccount/:id", deleteAccount);

export default accountRouter;