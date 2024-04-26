import express from "express";
import { getPosts } from "../controller/scrape.js";
import { validateCookie } from "../middleware/validateCookie.js";
import { sqlCreateSettings } from "../db/settings/settingsActions.js";

async function testRoute(req: express.Request, res: express.Response) {
  try {
    const { user_id } = req.body;

    await sqlCreateSettings(user_id);

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
}

export default (router: express.Router) => {
  router.post("/scrape", validateCookie, getPosts);
  router.post("/test", testRoute);
};
