import { FullPostAge, PostAge } from "../../Types/settingsTypes";
import pool from "../index";
import {
  sqlGetSettingsBySettingsId,
  sqlGetSettingsByUserId,
} from "./settingsActions";

export async function sqlCreatePostAgeSettings(settingsId: number) {
  try {
    const [result, meta] = await pool.query(
      "INSERT INTO post_age (settings_id) VALUES (?)",
      settingsId
    );
    if (!result || (result as { insertId: number }).insertId === 0) {
      console.log("Problem creating post_age settings");
      return false;
    }

    const settings = await sqlGetSettingsBySettingsId(settingsId);
    if (!settings) return false;

    return settings;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlGetPostAgeBySettingsId(settingsId: number) {
  try {
    const [result, meta] = await pool.query(
      "SELECT * FROM post_age WHERE settings_id = ?",
      settingsId
    );
    const ageSettings = (result as {}[])[0] as FullPostAge;
    return ageSettings;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlGetPostAgeByUserId(userId: number) {
  try {
    const settings = await sqlGetSettingsByUserId(userId);
    if (!settings) return;

    const ageSettings = await sqlGetPostAgeBySettingsId(settings.id);
    if (!ageSettings) return;

    return ageSettings;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlUpdatePostAgeSettings(
  userId: number,
  data: { age: string }
) {
  try {
    const postAgeSettings = await sqlGetPostAgeByUserId(userId);
    if (!postAgeSettings) return;

    const [result, meta] = await pool.query(
      `UPDATE post_age SET age = ? WHERE id = ${postAgeSettings.id}`,
      [data.age]
    );

    const postAgeSettingsResult = await sqlGetPostAgeByUserId(userId);
    if (!postAgeSettingsResult) return;

    return postAgeSettingsResult;
  } catch (error) {
    console.log(error);
  }
}
