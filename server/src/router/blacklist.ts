import express from "express";
import { validateCookie } from "../middleware/validateCookie";
import {
  addToBlacklist,
  getKeywords,
  removeFromBlacklist,
} from "../controller/blacklist";

export function blacklist(router: express.Router) {
  router.get("/blacklist", validateCookie, getKeywords);
  router.post("/blacklist", validateCookie, addToBlacklist);
  router.delete("/blacklist", validateCookie, removeFromBlacklist);
}
