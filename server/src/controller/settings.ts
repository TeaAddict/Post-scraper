import express from "express";
import {
  sqlGetSettingsByUserId,
  sqlUpdateSettings,
} from "../db/settings/settingsActions";
import {
  sqlGetPostAgeByUserId,
  sqlUpdatePostAgeSettings,
} from "../db/settings/postAgeActions";
import {
  sqlGetJobTypeByUserId,
  sqlUpdateJobTypeSettings,
} from "../db/settings/jobTypeActions";
import {
  sqlGetExperienceLevelByUserId,
  sqlUpdateExperienceLevelSettings,
} from "../db/settings/experienceLevelActions";
import {
  sqlGetRemoteByUserId,
  sqlUpdateRemoteSettings,
} from "../db/settings/remoteActions";
import { ExperienceLevel, JobType, Remote } from "../Types/settingsTypes";

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

export async function updatePostAgeSettings(
  req: express.Request,
  res: express.Response
) {
  try {
    const { userId } = res.locals;

    if (!req.body)
      return res.status(400).json({ error: "Missing request body" });

    const settings = await sqlUpdatePostAgeSettings(userId, req.body);
    if (!settings)
      return res
        .status(400)
        .json({ error: "Problem updating post age settings" });

    return res.status(201).json(settings);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Problem updating post age settings" });
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

export async function updateJobTypeSettings(
  req: express.Request,
  res: express.Response
) {
  try {
    const { userId } = res.locals;
    const body = req.body as JobType;
    if (!body)
      return res.status(400).json({ error: "Request body is missing" });

    if (!userId) return res.status(400).json({ error: "User id is missing" });

    const settings = await sqlUpdateJobTypeSettings(userId, body);
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

export async function updateExperienceLevelSettings(
  req: express.Request,
  res: express.Response
) {
  try {
    const { userId } = res.locals;
    const body = req.body as ExperienceLevel;

    if (!body)
      return res.status(400).json({ error: "Request body is missing" });

    if (!userId) return res.status(400).json({ error: "User id is missing" });

    const settings = await sqlUpdateExperienceLevelSettings(userId, body);
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

export async function updateRemoteSettings(
  req: express.Request,
  res: express.Response
) {
  try {
    const { userId } = res.locals;
    const body = req.body as Remote;
    if (!body)
      return res.status(400).json({ error: "Request body is missing" });

    if (!userId) return res.status(400).json({ error: "User id is missing" });

    const settings = await sqlUpdateRemoteSettings(userId, body);
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
