import express, { Router } from "express";
import {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
} from "./users.controllers.js";
import { autenticate } from "../../midlewares/auth.middleware.js";

const usersRouter: Router = express.Router();

usersRouter.get("/getUsers", autenticate, getUsers);
usersRouter.get("/getUsers/:id", autenticate, getUsersById);
usersRouter.post("/createUser", autenticate, createUser);
usersRouter.put("/updateUser/:id", autenticate, updateUser);
usersRouter.delete("/deleteUser/:id", autenticate, deleteUser);

export default usersRouter;