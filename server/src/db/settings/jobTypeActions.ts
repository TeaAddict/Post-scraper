import pool from "../index";
import { sqlGetSettingsBySettingsId } from "./settingsActions";

export async function sqlCreateJobTypeSettings(settingsId: number) {
  try {
    const [result, meta] = await pool.query(
      "INSERT INTO job_type (settings_id) VALUES (?)",
      settingsId
    );
    if (!result || (result as { insertId: number }).insertId === 0) {
      console.log("Problem creating jobType settings");
      return false;
    }

    const settings = await sqlGetSettingsBySettingsId(settingsId);
    if (!settings) return false;

    return settings;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlGetJobTypeBySettingsId(settingsId: number) {
  try {
    const [result, meta] = await pool.query(
      "SELECT * FROM job_type WHERE settings_id = ?",
      settingsId
    );
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
