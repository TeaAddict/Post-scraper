import express from "express";
import { getPosts } from "../controller/scrape.js";

export default (router: express.Router) => {
  router.get("/scrape", getPosts);
};
