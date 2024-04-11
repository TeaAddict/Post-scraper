import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controller/user.js";
import { validateCookie } from "../middleware/validateCookie.js";

export default (router: express.Router) => {
  // router.get("/user", validateCookie, getUsers);
  router.get("/user/:id", validateCookie, getUser);
  router.put("/user/:id", validateCookie, updateUser);
  router.delete("/user/:id", validateCookie, deleteUser);
};
