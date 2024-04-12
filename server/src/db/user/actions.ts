import { formatInputForUpdate } from "../../helper/updateHelper.js";
import pool from "../index.js";

export type User = {
  id: number;
  username: string;
  password: string | undefined;
  salt: string | undefined;
  sessionId: string | undefined;
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

export async function sqlGetUser(id: string) {
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
  id: string,
  data: {
    username?: string;
    password?: string;
    sessionId?: string;
  }
) {
  try {
    const { keyValue, preparedArr } = formatInputForUpdate(id, data);

    const [result, meta] = await pool.query(
      `UPDATE user SET ${keyValue} WHERE id = ?`,
      preparedArr
    );
    const { affectedRows } = result as { affectedRows: number };
    if (affectedRows) return sqlGetUser(id);
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
    const user = await sqlGetUser(insert_id.toString());
    delete user?.password;
    delete user?.salt;
    delete user?.sessionId;
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlDeleteUser(id: string) {
  try {
    const user = await sqlGetUser(id);
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

export async function sqlGetUserBySessionId(sessionId: string) {
  try {
    const [result, meta] = await pool.query(
      "SELECT * FROM user WHERE sessionId = ?",
      sessionId
    );

    return (result as {}[])[0];
  } catch (error) {
    console.log(error);
  }
}
