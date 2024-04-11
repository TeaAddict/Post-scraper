import express from "express";
import user from "./user.js";
import job from "./job.js";
import authentication from "./authentication.js";

const router = express.Router();

export default () => {
  authentication(router);
  user(router);
  job(router);

  return router;
};
