import pool from "../index";
import { sqlGetSettingsBySettingsId } from "./settingsActions";

export async function sqlCreateSettingsExperienceLevel(settingsId: number) {
  try {
    const [result, meta] = await pool.query(
      "INSERT INTO experience_level (settings_id) VALUES (?)",
      settingsId
    );
    if (!result) return false;

    const settings = await sqlGetSettingsBySettingsId(settingsId);
    if (!settings) return false;

    return settings;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlGetExperienceLevelBySettingsId(settingsId: number) {
  try {
    const [result, meta] = await pool.query(
      "SELECT * FROM experience_level WHERE settings_id = ?",
      settingsId
    );
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
