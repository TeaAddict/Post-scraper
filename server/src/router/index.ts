import express from "express";
import user from "./user.js";
import post from "./post.js";
import authentication from "./authentication.js";
import scrape from "./scrape.js";
import { blacklist } from "./blacklist.js";
import settings from "./settings.js";

const router = express.Router();

export default () => {
  authentication(router);
  user(router);
  post(router);
  scrape(router);
  blacklist(router);
  settings(router);

  return router;
};
