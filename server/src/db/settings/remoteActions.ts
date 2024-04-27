import pool from "../index";
import { sqlGetSettingsBySettingsId } from "./settingsActions";

export async function sqlCreateRemoteSettings(settingsId: number) {
  try {
    const [result, meta] = await pool.query(
      "INSERT INTO remote (settings_id) VALUES (?)",
      settingsId
    );

    if (!result || (result as { insertId: number }).insertId === 0) {
      console.log("Problem creating remote settings");
      return false;
    }

    const settings = await sqlGetSettingsBySettingsId(settingsId);
    if (!settings) return false;

    return settings;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlGetRemoteBySettingsId(settingsId: number) {
  try {
    const [result, meta] = await pool.query(
      "SELECT * FROM remote WHERE settings_id = ?",
      settingsId
    );
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
