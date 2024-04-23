import { BlacklistedKeyword } from "../../Types/blacklistTypes";
import pool from "../index";

export async function sqlGetKeywords(userId: number) {
  try {
    const [result, meta] = await pool.query(
      "SELECT * FROM blacklist WHERE userId = ?",
      [userId]
    );
    if (!result) throw new Error("Problem with getting blacklisted keyword");

    return result as BlacklistedKeyword[];
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

    return (result as {}[])[0] as BlacklistedKeyword;
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
    if (!resKeyword)
      throw new Error("Problem with getting blacklisted keyword");

    return resKeyword;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlRemoveFromBlacklist(keyword: string) {
  try {
    const keywordRes = await sqlGetKeyword(keyword);
    if (!keywordRes)
      throw new Error("Problem with getting blacklisted keyword");

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
