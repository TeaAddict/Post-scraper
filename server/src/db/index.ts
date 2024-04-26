import mysql2 from "mysql2/promise";
import { databaseExists } from "./databaseExists.js";
import { createDb } from "./createDb.js";
import { getMissingTables } from "./getMissingTables.js";
import { createTables } from "./createTables.js";
import { TABLE_LIST } from "../contants.js";
import { camelCaseToSnakeCase } from "../helper/helpers.js";

async function createPool() {
  try {
    const database = await databaseExists();
    if (!database) createDb();

    const snakeCasedTableList = TABLE_LIST.map((table) => ({
      ...table,
      name: camelCaseToSnakeCase(table.name),
    }));
    const missingTables = await getMissingTables(snakeCasedTableList);
    if (missingTables) createTables(missingTables);

    const pool = mysql2.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
    });
    return pool;
  } catch (error) {
    console.log(error);
    throw new Error("Problem creating connection pool");
  }
}
export default await createPool();
