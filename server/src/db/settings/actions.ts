import { formatInputForUpdate } from "../../helper/updateHelper";
import { Settings } from "../../Types/settingsTypes";
import pool from "../index";

export async function sqlGetSettingsByUserId(userId: number) {
  try {
    const [result, meta] = await pool.query(
      "SELECT * FROM settings WHERE userId = ?",
      [userId]
    );
    return (result as {}[])[0] as Settings;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlCreateSettings(userId: number) {
  try {
    const [result, meta] = await pool.query(
      "INSERT INTO settings (userId) VALUES (?)",
      userId
    );

    if (!result) return false;

    const settings = await sqlGetSettingsByUserId(userId);
    return settings;
  } catch (error) {
    console.log(error);
  }
}

// appliedFilter: boolean;
// blacklistedFilter: boolean;
// userId: number;

export async function sqlUpdateSettings(userId: number, data: Settings) {
  try {
    const { keyValue, preparedArr } = formatInputForUpdate(data);
    const values = [...preparedArr, userId];
    const query = `UPDATE settings SET ${keyValue} WHERE userId = ?`;
    const [result, meta] = await pool.query(query, values);
    const settings = await sqlGetSettingsByUserId(userId);
    return settings;
  } catch (error) {
    console.log(error);
  }
}
