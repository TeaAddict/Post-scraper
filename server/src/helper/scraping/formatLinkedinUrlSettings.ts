import {
  ExperienceLevel,
  JobType,
  PostAge,
  Remote,
} from "../../Types/settingsTypes";
import { addUrlParams } from "../helpers";

export function formatLinkedinUrlSettings(
  url: string,
  settings: {
    age: PostAge;
    jobType: JobType;
    experienceLevel: ExperienceLevel;
    remote: Remote;
  }
) {
  let websiteUrl = url;
  const concatKeyword = ",";

  const ageKey = "f_TPR";
  const ageValues = {
    any: "",
    pastMonth: "r2592000",
    pastWeek: "r604800",
    past24Hours: "r86400",
  };
  const activeAgeValues = ageValues[settings.age.age as keyof typeof ageValues];
  const ageParams = { key: ageKey, value: activeAgeValues };

  const jobTypeKey = "f_JT";
  const jobTypeValues = {
    full_time: "F",
    part_time: "P",
  };
  const activeJobTypeValues: string[] = [];
  Object.keys(settings.jobType).forEach((key) => {
    if (settings.jobType[key as keyof JobType])
      activeJobTypeValues.push(
        jobTypeValues[key as keyof typeof jobTypeValues]
      );
  });
  const jobTypeParams = {
    key: jobTypeKey,
    value: activeJobTypeValues.join(concatKeyword),
  };

  const experienceLevelKey = "f_E";
  const experienceLevelValues = {
    internship: "1",
    entry_level: "2",
    mid_senior_level: "4",
    director: "5",
  };
  const activeExperienceLevelValues: string[] = [];
  Object.keys(settings.experienceLevel).forEach((key) => {
    if (settings.experienceLevel[key as keyof ExperienceLevel])
      activeExperienceLevelValues.push(
        experienceLevelValues[key as keyof typeof experienceLevelValues]
      );
  });
  const experienceLevelUrlParams = {
    key: experienceLevelKey,
    value: activeExperienceLevelValues.join(concatKeyword),
  };

  const remoteKey = "f_WT";
  const remoteValues = {
    on_site: "1",
    remote: "2",
    hybrid: "3",
  };
  const activeRemoteValues: string[] = [];
  Object.keys(settings.remote).forEach((key) => {
    if (settings.remote[key as keyof Remote])
      activeRemoteValues.push(remoteValues[key as keyof typeof remoteValues]);
  });
  const remoteUrlParams = {
    key: remoteKey,
    value: activeRemoteValues.join(concatKeyword),
  };

  const combinedParams = [
    ageParams,
    jobTypeParams,
    experienceLevelUrlParams,
    remoteUrlParams,
  ];

  combinedParams.forEach((param) => {
    websiteUrl = addUrlParams(websiteUrl, {
      key: param.key,
      value: param.value,
    });
  });

  return websiteUrl;
}
