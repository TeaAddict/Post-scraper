import mysql from "mysql2/promise";

export async function createDb() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
    });
    const res = await connection.query(
      `CREATE DATABASE ${process.env.MYSQL_DB}`
    );
    console.log(`Created database: ${process.env.MYSQL_DB}`);
    connection.end();
    return res;
  } catch (error) {
    console.log(error);
  }
}
