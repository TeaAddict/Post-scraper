import express from "express";
import {
  sqlGetSettingsByUserId,
  sqlUpdateSettings,
} from "../db/settings/settingsActions";
import { sqlGetPostAgeByUserId } from "../db/settings/postAgeActions";
import { sqlGetJobTypeByUserId } from "../db/settings/jobTypeActions";
import { sqlGetExperienceLevelByUserId } from "../db/settings/experienceLevelActions";
import { sqlGetRemoteByUserId } from "../db/settings/remoteActions";

export async function getSettings(req: express.Request, res: express.Response) {
  try {
    const { id } = req.cookies;
    if (!id) return res.status(400).json({ error: "User id is missing" });

    const settings = await sqlGetSettingsByUserId(id);
    if (!settings)
      return res.status(400).json({ error: "Problem with getting settings" });
    return res.status(200).json(settings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with getting settings" });
  }
}

export async function updateSettings(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id } = req.cookies;
    if (!id) return res.status(400).json({ error: "User id is missing" });

    const settings = await sqlUpdateSettings(id, req.body);
    if (!settings)
      return res.status(400).json({ error: "Problem with updating settings" });

    return res.status(200).json(settings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with updating settings" });
  }
}

export async function getPostAgeSettings(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id } = req.cookies;
    if (!id) return res.status(400).json({ error: "User id is missing" });

    const settings = await sqlGetPostAgeByUserId(id);
    if (!settings)
      return res
        .status(400)
        .json({ error: "Problem with getting age settings" });
    return res.status(200).json(settings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with getting age settings" });
  }
}

export async function getJobTypeSettings(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id } = req.cookies;
    if (!id) return res.status(400).json({ error: "User id is missing" });

    const settings = await sqlGetJobTypeByUserId(id);
    if (!settings)
      return res
        .status(400)
        .json({ error: "Problem with getting job type settings" });
    return res.status(200).json(settings);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Problem with getting job type settings" });
  }
}

export async function getExperienceLevelSettings(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id } = req.cookies;
    if (!id) return res.status(400).json({ error: "User id is missing" });

    const settings = await sqlGetExperienceLevelByUserId(id);
    if (!settings)
      return res
        .status(400)
        .json({ error: "Problem with getting experience level settings" });
    return res.status(200).json(settings);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Problem with getting experience level settings" });
  }
}

export async function getRemoteSettings(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id } = req.cookies;
    if (!id) return res.status(400).json({ error: "User id is missing" });

    const settings = await sqlGetRemoteByUserId(id);
    if (!settings)
      return res
        .status(400)
        .json({ error: "Problem with getting remote settings" });
    return res.status(200).json(settings);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Problem with getting remote settings" });
  }
}
