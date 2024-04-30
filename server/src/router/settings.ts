import express from "express";
import {
  getExperienceLevelSettings,
  getJobTypeSettings,
  getPostAgeSettings,
  getRemoteSettings,
  getSettings,
  updateSettings,
} from "../controller/settings";
import { validateCookie } from "../middleware/validateCookie";

export default (router: express.Router) => {
  router.get("/settings", validateCookie, getSettings);
  router.post("/settings", validateCookie, updateSettings);
  router.get("/settings/postAge", validateCookie, getPostAgeSettings);
  router.get("/settings/jobType", validateCookie, getJobTypeSettings);
  router.get(
    "/settings/experienceLevel",
    validateCookie,
    getExperienceLevelSettings
  );
  router.get("/settings/remote", validateCookie, getRemoteSettings);
};
