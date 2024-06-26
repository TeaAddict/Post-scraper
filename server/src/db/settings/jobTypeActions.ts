import { formatInputForUpdate } from "../../helper/updateHelper";
import { FullJobType, JobType } from "../../Types/settingsTypes";
import pool from "../index";
import {
  sqlGetSettingsBySettingsId,
  sqlGetSettingsByUserId,
} from "./settingsActions";

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
    const jobTypeSettings = (result as {}[])[0] as FullJobType;
    return jobTypeSettings;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlGetJobTypeByUserId(userId: number) {
  try {
    const settings = await sqlGetSettingsByUserId(userId);
    if (!settings) return;

    const jobType = await sqlGetJobTypeBySettingsId(settings.id);
    if (!jobType) return;

    return jobType;
  } catch (error) {
    console.log(error);
  }
}

export async function sqlUpdateJobTypeSettings(userId: number, data: JobType) {
  try {
    const { keyValue, preparedArr } = formatInputForUpdate(data);

    const jobTypeSettings = await sqlGetJobTypeByUserId(userId);
    if (!jobTypeSettings) return;

    const [result, meta] = await pool.query(
      `UPDATE job_type SET ${keyValue} WHERE id = ${jobTypeSettings.id}`,
      preparedArr
    );

    const jobTypeSettingsResult = await sqlGetJobTypeByUserId(userId);
    if (!jobTypeSettingsResult) return;

    return jobTypeSettingsResult;
  } catch (error) {
    console.log(error);
  }
}
