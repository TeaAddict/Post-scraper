import express from "express";
import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  updateJob,
} from "../controller/job.js";
import { validateCookie } from "../middleware/validateCookie.js";

export default (router: express.Router) => {
  router.get("/job", validateCookie, getJobs);
  router.get("/job/:id", validateCookie, getJob);
  router.post("/job/:id", validateCookie, createJob);
  router.put("/job/:id", validateCookie, updateJob);
  router.delete("/job/:id", validateCookie, deleteJob);
};
