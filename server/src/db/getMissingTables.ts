import mysql from "mysql2/promise";
import { TableData } from "../Types/generalTypes";

export async function getMissingTables(tableNames: TableData[]) {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
    });

    let nonExistantTables: TableData[] = [];
    const [tables, metaData] = await connection.query(`SHOW TABLES`);
    const existingTables: string[] = (tables as []).map(
      (val) => val[`Tables_in_${process.env.MYSQL_DB}`]
    );
    connection.end();

    tableNames.forEach((name) => {
      if (!existingTables.includes(name.name)) nonExistantTables.push(name);
    });

    if (nonExistantTables.length) {
      return nonExistantTables;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Problem checking missing tables");
  }
}
