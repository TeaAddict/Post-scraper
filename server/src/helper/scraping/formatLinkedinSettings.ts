import {
  FullExperienceLevel,
  FullJobType,
  FullPostAge,
  FullRemote,
} from "../../Types/settingsTypes";

export function formatLinkedinSettings(linkedinSettings: {
  age: FullPostAge;
  jobType: FullJobType;
  experienceLevel: FullExperienceLevel;
  remote: FullRemote;
}) {
  const {
    age: fullPostAge,
    jobType: fullJobType,
    experienceLevel: fullExperienceLevel,
    remote: fullRemote,
  } = linkedinSettings;

  const age = { age: fullPostAge.age };
  const jobType = {
    full_time: fullJobType.full_time,
    part_time: fullJobType.part_time,
  };
  const experienceLevel = {
    internship: fullExperienceLevel.internship,
    entry_level: fullExperienceLevel.entry_level,
    mid_senior_level: fullExperienceLevel.mid_senior_level,
    director: fullExperienceLevel.director,
    executive: fullExperienceLevel.executive,
  };
  const remote = {
    on_site: fullRemote.on_site,
    hybrid: fullRemote.hybrid,
    remote: fullRemote.remote,
  };
  return { age, jobType, experienceLevel, remote };
}
