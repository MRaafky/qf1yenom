import express, { Router } from "express";
import {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
} from "./users.controllers.js";
import { autenticate } from "../../midlewares/auth.middleware.js";
import { verivyToken } from "../../midlewares/auth.js";

const usersRouter: Router = express.Router();

usersRouter.get("/getUsers", verivyToken, getUsers);
usersRouter.get("/getUsers/:id", verivyToken, getUsersById);
usersRouter.post("/createUser", verivyToken, createUser);
usersRouter.put("/updateUser/:id", verivyToken, updateUser);
usersRouter.delete("/deleteUser/:id", verivyToken, deleteUser);

export default usersRouter;