import { formatInputForUpdate } from "../../helper/updateHelper";
import { FullSettings, Settings } from "../../Types/settingsTypes";
import pool from "../index";
import {
  sqlCreateExperienceLevelSettings,
  sqlGetExperienceLevelByUserId,
} from "./experienceLevelActions";
import {
  sqlCreateJobTypeSettings,
  sqlGetJobTypeByUserId,
} from "./jobTypeActions";
import {
  sqlCreatePostAgeSettings,
  sqlGetPostAgeByUserId,
} from "./postAgeActions";
import { sqlCreateRemoteSettings, sqlGetRemoteByUserId } from "./remoteActions";
import { experienceLevel } from "../../../../client/constants";

export async function sqlGetSettingsByUserId(userId: number) {
  try {
    const [result, meta] = await pool.query(
      "SELECT * FROM settings WHERE user_id = ?",
      [userId]
    );
    return (result as {}[])[0] as FullSettings;
  } catch (error) {
    console.log(error);
  }
}
export async function sqlGetSettingsBySettingsId(settingsId: number) {
  try {
    const [result, meta] = await pool.query(
      "SELECT * FROM settings WHERE id = ?",
      [settingsId]
    );
    return (result as {}[])[0] as FullSettings;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlCreateSettings(userId: number) {
  try {
    const [result, meta] = await pool.query(
      "INSERT INTO settings (user_id) VALUES (?)",
      userId
    );
    if (!result) return false;

    const settings = await sqlGetSettingsByUserId(userId);
    if (!settings) return false;

    await sqlCreatePostAgeSettings(settings.id);
    await sqlCreateExperienceLevelSettings(settings.id);
    await sqlCreateJobTypeSettings(settings.id);
    await sqlCreateRemoteSettings(settings.id);

    return settings;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlUpdateSettings(userId: number, data: Settings) {
  try {
    const { keyValue, preparedArr } = formatInputForUpdate(data);
    const values = [...preparedArr, userId];
    const query = `UPDATE settings SET ${keyValue} WHERE user_id = ?`;
    const [result, meta] = await pool.query(query, values);
    const settings = await sqlGetSettingsByUserId(userId);
    return settings;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlGetAllLinkedinSettings(userId: number) {
  try {
    const postAge = await sqlGetPostAgeByUserId(userId);
    if (!postAge) throw new Error("Age settings missing");

    const jobType = await sqlGetJobTypeByUserId(userId);
    if (!jobType) throw new Error("Job type settings missing");

    const experienceLevel = await sqlGetExperienceLevelByUserId(userId);
    if (!experienceLevel) throw new Error("Experience level settings missing");

    const remote = await sqlGetRemoteByUserId(userId);
    if (!remote) throw new Error("Remote settings missing");

    return { postAge, jobType, experienceLevel, remote };
  } catch (error) {
    console.log(error);
  }
}
