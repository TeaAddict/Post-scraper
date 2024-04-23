import express from "express";
import { getPosts } from "../controller/scrape.js";
import { validateCookie } from "../middleware/validateCookie.js";

export default (router: express.Router) => {
  router.post("/scrape", validateCookie, getPosts);
};
