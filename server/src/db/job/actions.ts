import { formatInputForUpdate } from "../../helper/updateHelper.js";
import pool from "../index.js";

export type Post = {
  title: string;
  link: string;
  ageInDays: number;
  companyName: string;
  location: string;
  applied: boolean;
  easyApply: boolean;
  promoted: boolean;
  websiteCreatedAtDateTime: string;
  websiteCreatedAtString: string;
};

export async function sqlGetJobs() {
  try {
    const [result, meta] = await pool.query("SELECT * FROM job");
    return result;
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
    const queryString = `INSERT INTO job (title, link, ageInDays, companyName, location, applied, easyApply, promoted, websiteCreatedAtDateTime, websiteCreatedAtString, userId) VALUES (${preparedPlaceholder})`;
    const preparedValues = [...Object.values(post), id];
    console.log(queryString);
    console.log(preparedValues);

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
