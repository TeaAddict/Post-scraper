import express from "express";
import user from "./user.js";
import job from "./job.js";
import authentication from "./authentication.js";
import scrape from "./scrape.js";
import { blacklist } from "./blacklist.js";

const router = express.Router();

export default () => {
  authentication(router);
  user(router);
  job(router);
  scrape(router);
  blacklist(router);

  return router;
};
