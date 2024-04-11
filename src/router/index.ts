import express from "express";
import user from "./user.js";
import job from "./job.js";

const router = express.Router();

export default () => {
  user(router);
  job(router);

  return router;
};
