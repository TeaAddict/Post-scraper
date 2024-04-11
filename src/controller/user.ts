import express from "express";
import {
  sqlCreateUser,
  sqlDeleteUser,
  sqlGetUser,
  sqlGetUsers,
  sqlUpdateUser,
} from "../db/user/actions.js";

export async function getUsers(req: express.Request, res: express.Response) {
  try {
    const users = await sqlGetUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with getting users" });
  }
}

export async function getUser(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;
    const user = await sqlGetUser(id);
    if (!user) return res.status(400).json("User does not exist");
    return res.status(200).json(user);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: "Problem with getting user" });
  }
}

export async function createUser(req: express.Request, res: express.Response) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "All fields are required" });

    const user = await sqlCreateUser(username, password);
    if (!user) throw new Error();

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with creating user" });
  }
}

export async function updateUser(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    const exists = await sqlGetUser(id);
    if (!exists)
      return res.status(400).json({ message: "User does not exist" });

    const result = await sqlUpdateUser(id, username, password);
    if (!result) throw new Error("Problem updating user in db");

    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with updating user" });
  }
}

export async function deleteUser(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;

    const user = await sqlGetUser(id);
    if (!user) return res.status(400).json({ error: "User does not exist" });

    const result = await sqlDeleteUser(id);
    if (!result) throw new Error("Problem with deleting user from db");
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Problem with deleting user" });
  }
}
