import { Remote } from "../../Types/settingsTypes";
import pool from "../index";
import {
  sqlGetSettingsBySettingsId,
  sqlGetSettingsByUserId,
} from "./settingsActions";

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
    const remoteSettings = (result as {}[])[0] as Remote;
    return remoteSettings;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlGetRemoteByUserId(userId: number) {
  try {
    const settings = await sqlGetSettingsByUserId(userId);
    if (!settings) return;

    const remote = await sqlGetRemoteBySettingsId(settings.id);
    if (!remote) return;

    return remote;
  } catch (error) {
    console.log(error);
  }
}
