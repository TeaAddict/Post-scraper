import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controller/user.js";

export default (router: express.Router) => {
  router.get("/user/:id", getUser);
  router.get("/user", getUsers);
  router.put("/user/:id", updateUser);
  router.post("/user", createUser);
  router.delete("/user/:id", deleteUser);
};
