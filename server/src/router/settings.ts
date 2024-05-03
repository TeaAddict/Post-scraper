import express from "express";
import {
  getExperienceLevelSettings,
  getJobTypeSettings,
  getPostAgeSettings,
  getRemoteSettings,
  getSettings,
  updateExperienceLevelSettings,
  updateJobTypeSettings,
  updatePostAgeSettings,
  updateRemoteSettings,
  updateSettings,
} from "../controller/settings";
import { validateCookie } from "../middleware/validateCookie";

export default (router: express.Router) => {
  router.get("/settings", validateCookie, getSettings);
  router.post("/settings", validateCookie, updateSettings);
  router.get("/settings/postAge", validateCookie, getPostAgeSettings);
  router.post("/settings/postAge", validateCookie, updatePostAgeSettings);
  router.get("/settings/jobType", validateCookie, getJobTypeSettings);
  router.post("/settings/jobType", validateCookie, updateJobTypeSettings);
  router.get(
    "/settings/experienceLevel",
    validateCookie,
    getExperienceLevelSettings
  );
  router.post(
    "/settings/experienceLevel",
    validateCookie,
    updateExperienceLevelSettings
  );
  router.get("/settings/remote", validateCookie, getRemoteSettings);
  router.post("/settings/remote", validateCookie, updateRemoteSettings);
};
