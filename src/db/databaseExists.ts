import mysql from "mysql2/promise";

export async function databaseExists() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
    });
    connection.end();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
