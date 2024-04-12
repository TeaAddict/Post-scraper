import express from "express";
import { sqlGetUserBySessionId } from "../db/user/actions.js";

export async function validateCookie(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { cookies } = req;
    if (!cookies["USER-AUTH"]) return res.status(403).json("Unauthorized");

    const user = await sqlGetUserBySessionId(cookies["USER-AUTH"]);
    if (!user) return res.status(403).json("Unauthorized");
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json("Problem with validation");
  }
}
