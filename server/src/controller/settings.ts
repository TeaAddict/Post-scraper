import express from "express";
import { sqlGetSettings, sqlUpdateSettings } from "../db/settings/actions";

export async function getSettings(req: express.Request, res: express.Response) {
  try {
    const { id } = req.cookies;
    if (!id) return res.status(400).json({ error: "User id is missing" });

    const settings = await sqlGetSettings(id);
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
