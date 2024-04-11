import { formatInputForUpdate } from "../../helper/updateHelper.js";
import pool from "../index.js";

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

export async function sqlCreateJob(
  id: string,
  title: string,
  link: string,
  age: number,
  jobWebsite: string,
  websiteCreatedAt: string,
  promoted: boolean,
  easyApply: boolean,
  applied: boolean,
  location: string
) {
  try {
    const [result, meta] = await pool.query(
      "INSERT INTO job (title, link, age, jobWebsite, websiteCreatedAt, promoted, easyApply, applied, location, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        link,
        age,
        jobWebsite,
        websiteCreatedAt,
        promoted,
        easyApply,
        applied,
        location,
        id,
      ]
    );
    const insertId = (result as { insertId: number }).insertId;
    const job = await sqlGetJob(insertId.toString());
    return job;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlUpdateJob(
  id: string,
  title: string,
  link: string,
  age: number,
  jobWebsite: string,
  websiteCreatedAt: string,
  promoted: boolean,
  easyApply: boolean,
  applied: boolean,
  location: string
) {
  try {
    const data = {
      title,
      link,
      age,
      jobWebsite,
      websiteCreatedAt,
      promoted,
      easyApply,
      applied,
      location,
    };

    const { keyValue, preparedArr } = formatInputForUpdate(id, data);

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
