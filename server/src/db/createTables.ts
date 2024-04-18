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

    await Promise.all(
      tableNames.map(async (table) => {
        const query = await fs.readFile(
          `src/db/${table}/${table}.sql`,
          "utf-8"
        );
        await connection.query(query);
        console.log(`Created ${table} table`);
      })
    );

    connection.end();
  } catch (error) {
    console.log(error);
  }
}
