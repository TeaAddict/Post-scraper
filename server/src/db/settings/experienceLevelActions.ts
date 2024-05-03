import { formatInputForUpdate } from "../../helper/updateHelper";
import {
  ExperienceLevel,
  UpdateExperienceLevel,
} from "../../Types/settingsTypes";
import pool from "../index";
import {
  sqlGetSettingsBySettingsId,
  sqlGetSettingsByUserId,
} from "./settingsActions";

export async function sqlCreateExperienceLevelSettings(settingsId: number) {
  try {
    const [result, meta] = await pool.query(
      "INSERT INTO experience_level (settings_id) VALUES (?)",
      settingsId
    );
    if (!result || (result as { insertId: number }).insertId === 0) {
      console.log("Problem creating experienceLevel settings");
      return false;
    }

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
    const experienceLevelSettings = (result as {}[])[0] as ExperienceLevel;
    return experienceLevelSettings;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlGetExperienceLevelByUserId(userId: number) {
  try {
    const settings = await sqlGetSettingsByUserId(userId);
    if (!settings) return;

    const experienceLevel = await sqlGetExperienceLevelBySettingsId(
      settings.id
    );
    if (!experienceLevel) return;

    return experienceLevel;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlUpdateExperienceLevelSettings(
  userId: number,
  data: UpdateExperienceLevel
) {
  try {
    const { keyValue, preparedArr } = formatInputForUpdate(data);

    const experienceLevel = await sqlGetExperienceLevelByUserId(userId);
    if (!experienceLevel) return;

    const [result, meta] = await pool.query(
      `UPDATE experience_level SET ${keyValue} WHERE id = ${experienceLevel.id}`,
      preparedArr
    );

    const remoteSettingsResult = await sqlGetExperienceLevelByUserId(userId);
    if (!remoteSettingsResult) return;

    return remoteSettingsResult;
  } catch (error) {
    console.log(error);
  }
}
