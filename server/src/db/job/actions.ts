import { formatInputForUpdate } from "../../helper/updateHelper.js";
import { DbPost, Post } from "../../Types/postTypes.js";
import pool from "../index.js";

export async function sqlGetJobs() {
  try {
    const [result, meta] = await pool.query("SELECT * FROM job");
    return result as unknown as DbPost[];
  } catch (error) {
    console.log(error);
  }
}

export async function sqlGetJob(id: string) {
  try {
    const [result, meta] = await pool.query("SELECT * FROM job WHERE id = ?", [
      id,
    ]);
    return (result as {}[])[0];
  } catch (error) {
    console.log(error);
  }
}

export async function sqlCreateJob(id: string, post: Post) {
  try {
    const propertyCount = Object.keys(post).length;
    const preparedPlaceholder = Array(propertyCount + 1)
      .fill("?")
      .join(", ");
    const columns = [...Object.keys(post), "userId"];
    const queryString = `INSERT INTO job (${columns}) VALUES (${preparedPlaceholder})`;
    const preparedValues = [...Object.values(post), id];
    const [result, meta] = await pool.query(queryString, preparedValues);
    const insertId = (result as { insertId: number }).insertId;
    const job = await sqlGetJob(insertId.toString());
    return job;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlUpdateJob(id: string, post: Post) {
  try {
    const { keyValue, preparedArr } = formatInputForUpdate(id, post);
    await pool.query(`UPDATE job SET ${keyValue} WHERE id = ?`, preparedArr);
    const job = await sqlGetJob(id);
    return job;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlDeleteJob(id: string) {
  try {
    const job = await sqlGetJob(id);
    await pool.query("DELETE FROM job WHERE id = ?", [id]);
    return job;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlGetJobByLink(link: string) {
  try {
    const [result, meta] = await pool.query(
      "SELECT * FROM job WHERE link = ?",
      [link]
    );
    return (result as {}[])[0];
  } catch (error) {
    console.log(error);
  }
}
