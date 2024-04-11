import pool from "../index.js";

export async function sqlGetJobs() {
  try {
    const [result, meta] = await pool.query("SELECT * FROM job");
    console.log(result);
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
  job_website: string,
  website_created_at: string,
  promoted: boolean,
  easy_apply: boolean,
  applied: boolean,
  location: string
) {
  try {
    const [result, meta] = await pool.query(
      "INSERT INTO job (title, link, age, job_website, website_created_at, promoted, easy_apply, applied, location, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        link,
        age,
        job_website,
        website_created_at,
        promoted,
        easy_apply,
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
  job_website: string,
  website_created_at: string,
  promoted: boolean,
  easy_apply: boolean,
  applied: boolean,
  location: string
) {
  try {
    const data = {
      title,
      link,
      age,
      job_website,
      website_created_at,
      promoted,
      easy_apply,
      applied,
      location,
    };

    Object.keys(data).forEach((key) => {
      if (data[key as keyof typeof data] === undefined) {
        delete data[key as keyof typeof data];
      }
    });

    console.log(data);
    const keyValue = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");

    const preparedArr = [...Object.keys(data), id];

    await pool.query(`UPDATE job SET ${keyValue} WHERE id = ?`, preparedArr);
    const job = await sqlGetJob(id);
    return job;
  } catch (error) {
    console.log(error);
  }
}
