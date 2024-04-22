import express from "express";
import { getSettings, updateSettings } from "../controller/settings";
import { validateCookie } from "../middleware/validateCookie";

export default (router: express.Router) => {
  router.get("/settings", validateCookie, getSettings);
  router.post("/settings", validateCookie, updateSettings);
};
