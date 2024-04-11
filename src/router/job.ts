import express from "express";
import { createJob, getJob, getJobs, updateJob } from "../controller/job.js";

export default (router: express.Router) => {
  router.get("/job", getJobs);
  router.get("/job/:id", getJob);
  router.post("/job/:id", createJob);
  router.put("/job/:id", updateJob);
};
