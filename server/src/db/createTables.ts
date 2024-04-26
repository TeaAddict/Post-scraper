import fs from "fs/promises";
import mysql from "mysql2/promise";
import { TableData } from "../Types/generalTypes";

export async function createTables(tableNames: TableData[]) {
  try {
    tableNames.forEach((table) => console.log("Missing table:", table.name));

    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
    });

    await Promise.all(
      tableNames.map(async (table) => {
        const query = await fs.readFile(table.location, "utf-8");
        await connection.query(query);
        console.log(`Created ${table.name} table`);
      })
    );

    connection.end();
  } catch (error) {
    console.log(error);
  }
}
