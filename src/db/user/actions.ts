import pool from "../index.js";

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
    if (Array.isArray(result)) return result[0];
  } catch (error) {
    console.log(error);
  }
}

export async function sqlUpdateUser(
  id: string,
  username: string,
  password: string
) {
  try {
    const [result, meta] = await pool.query(
      "UPDATE user SET username = ? password = ? WHERE id = ?",
      [username, password, id]
    );
    const { affectedRows } = result as { affectedRows: number };
    if (affectedRows) return sqlGetUser(id);
  } catch (error) {
    console.log(error);
  }
}

export async function sqlCreateUser(username: string, password: string) {
  try {
    const [result, meta] = await pool.query(
      "INSERT INTO user (username, password) VALUES (?, ?)",
      [username, password]
    );
    const insert_id = (result as { insertId: number }).insertId;
    const user = sqlGetUser(insert_id.toString());
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
