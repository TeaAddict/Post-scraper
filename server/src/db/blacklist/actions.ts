import pool from "../index";

export async function sqlGetKeywords(userId: number) {
  try {
    const [result, meta] = await pool.query(
      "SELECT * FROM blacklist WHERE userId = ?",
      [userId]
    );
    return result as [];
  } catch (error) {
    console.log(error);
  }
}

export async function sqlGetKeyword(keyword: string) {
  try {
    const [result, meta] = await pool.query(
      "SELECT * FROM blacklist WHERE keyword = ?",
      [keyword]
    );

    return (result as {}[])[0];
  } catch (error) {
    console.log(error);
  }
}

export async function sqlAddToBlacklist(keyword: string, userId: number) {
  try {
    const [result, meta] = await pool.query(
      "INSERT INTO blacklist (keyword, userId) VALUES (?, ?)",
      [keyword, userId]
    );
    if ((result as { insertId: number })["insertId"] === 0) return false;

    const resKeyword = await sqlGetKeyword(keyword);
    return resKeyword;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlRemoveFromBlacklist(keyword: string) {
  try {
    const keywordRes = await sqlGetKeyword(keyword);
    const [result, meta] = await pool.query(
      "DELETE FROM blacklist WHERE keyword = ?",
      [keyword]
    );

    if ((result as { affectedRows: number })["affectedRows"] === 0)
      return false;

    return keywordRes;
  } catch (error) {
    console.log(error);
  }
}
