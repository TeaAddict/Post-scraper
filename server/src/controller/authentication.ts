import express from "express";
import {
  sqlCreateUser,
  sqlGetUserByUsername,
  sqlUpdateUser,
} from "../db/user/actions.js";
import { createHash, random } from "../helper/authHelpers.js";

export async function login(req: express.Request, res: express.Response) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Missing required fields" });

    const user = await sqlGetUserByUsername(username);
    if (!user)
      return res.status(404).json({ error: "Wrong username or password" });

    const hashedPass = createHash(password, user.salt!);
    if (hashedPass !== user.password)
      return res.status(403).json({ error: "Wrong username or password" });

    const sessionId = random();
    res.cookie("USER-AUTH", sessionId);
    res.cookie("id", user.id);
    sqlUpdateUser(user.id.toString(), { sessionId });

    return res.status(200).json({ message: "Logged in successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Authentication problem" });
  }
}

export async function register(req: express.Request, res: express.Response) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Missing required fields" });

    if (await sqlGetUserByUsername(username))
      return res.status(400).json({ error: "User already exists" });

    const salt = random();
    const hashedPassword = createHash(password, salt);
    const user = await sqlCreateUser(username, hashedPassword, salt);
    if (!user)
      return res.status(400).json({ error: "Problem with registration" });

    const sessionId = random();
    res.cookie("USER-AUTH", sessionId);
    res.cookie("id", user.id);
    sqlUpdateUser(user.id.toString(), { sessionId });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with registration" });
  }
}
