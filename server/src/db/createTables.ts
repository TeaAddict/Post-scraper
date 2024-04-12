import fs from "fs/promises";
import mysql from "mysql2/promise";

export async function createTables(tableNames: string[]) {
  try {
    console.log("Missing tables:", tableNames);

    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
    });

    for (const name of tableNames) {
      switch (name) {
        case "user":
          const userQuery = await fs.readFile("src/db/user/user.sql", "utf-8");
          await connection.query(userQuery);
          console.log("Created user table");
          break;
        case "job":
          const jobQuery = await fs.readFile("src/db/job/job.sql", "utf-8");
          await connection.query(jobQuery);
          console.log("Created job table");
          break;

        default:
          break;
      }
    }
    connection.end();
  } catch (error) {
    console.log(error);
  }
}
