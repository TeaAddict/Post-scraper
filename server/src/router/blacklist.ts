import express from "express";
import { validateCookie } from "../middleware/validateCookie";
import {
  addToBlacklist,
  getKeywords,
  removeFromBlacklist,
} from "../controller/blacklist";

export function blacklist(router: express.Router) {
  router.get("/blacklist", getKeywords);
  router.post("/blacklist", addToBlacklist);
  router.delete("/blacklist", removeFromBlacklist);
}
