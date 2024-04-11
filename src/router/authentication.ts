import express from "express";
import { login, register } from "../controller/authentication.js";

export default (router: express.Router) => {
  router.post("/auth/login", login);
  router.post("/auth/register", register);
};
