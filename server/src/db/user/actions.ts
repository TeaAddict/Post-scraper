import { formatInputForUpdate } from "../../helper/updateHelper.js";
import pool from "../index.js";
import { UserT } from "../../Types/userTypes";

export type User = {
  id: number;
  username: string;
  password: string | undefined;
  salt: string | undefined;
  sessionToken: string | undefined;
  created_at: string;
  updated_at: string;
};

export async function sqlGetUsers() {
  try {
    const [result, meta] = await pool.query("SELECT * FROM user");

    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlGetUserById(id: number) {
  try {
    const [result, meta] = await pool.query("SELECT * FROM user WHERE id = ?", [
      id,
    ]);

    const user = (result as {}[])[0] as User;
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlUpdateUser(
  id: number,
  data: {
    username?: string;
    password?: string;
    sessionToken?: string;
  }
) {
  try {
    const { keyValue, preparedArr } = formatInputForUpdate(data);
    const arrWithId = [...preparedArr, id];

    const [result, meta] = await pool.query(
      `UPDATE user SET ${keyValue} WHERE id = ?`,
      arrWithId
    );
    const { affectedRows } = result as { affectedRows: number };
    if (affectedRows) return sqlGetUserById(id);
  } catch (error) {
    console.log(error);
  }
}

export async function sqlCreateUser(
  username: string,
  password: string,
  salt: string
) {
  try {
    const [result, meta] = await pool.query(
      "INSERT INTO user (username, password, salt) VALUES (?, ?, ?)",
      [username, password, salt]
    );
    const insert_id = (result as { insertId: number }).insertId;
    const user = await sqlGetUserById(insert_id);
    delete user?.password;
    delete user?.salt;
    delete user?.sessionToken;
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlDeleteUser(id: number) {
  try {
    const user = await sqlGetUserById(id);
    const [result, meta] = await pool.query("DELETE FROM user WHERE id = ?", [
      id,
    ]);
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlGetUserByUsername(username: string) {
  try {
    const [result, meta] = await pool.query(
      "SELECT * FROM user WHERE username = ?",
      [username]
    );
    return (result as {}[])[0] as User;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlGetUserBySessionToken(sessionToken: string) {
  try {
    const [result, meta] = await pool.query(
      "SELECT * FROM user WHERE session_token = ?",
      sessionToken
    );
    const cleanRes = (result as {}[])[0] as UserT;
    return cleanRes;
  } catch (error) {
    console.log(error);
  }
}
