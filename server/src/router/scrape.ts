import express from "express";
import { getPosts } from "../controller/scrape.js";
import { validateCookie } from "../middleware/validateCookie.js";
import {
  sqlCreateSettings,
  sqlGetSettingsByUserId,
} from "../db/settings/settingsActions.js";
import { sqlGetExperienceLevelBySettingsId } from "../db/settings/experienceLevelActions.js";

async function testRoute(req: express.Request, res: express.Response) {
  try {
    const { user_id } = req.body;

    const resSett = await sqlGetSettingsByUserId(user_id);
    console.log(resSett);
    const expSett = await sqlGetExperienceLevelBySettingsId(1);
    console.log("Exp settings:", expSett);

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
}

export default (router: express.Router) => {
  router.post("/scrape", validateCookie, getPosts);
  router.post("/test", testRoute);
};
