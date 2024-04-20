import express from "express";
import { sqlGetUserBySessionToken } from "../db/user/actions.js";

export async function validateCookie(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { cookies } = req;
    if (!cookies["USER-AUTH"]) return res.status(403).json("Unauthorized");

    const user = await sqlGetUserBySessionToken(cookies["USER-AUTH"]);
    if (!user) return res.status(403).json("Unauthorized");
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json("Problem with validation");
  }
}
