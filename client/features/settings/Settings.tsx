import Select from "@/components/shared/Select";
import { experienceLevel, jobType, age, remote } from "@/constants";
import {
  useExperienceLevel,
  useJobType,
  usePostAge,
  useRemote,
} from "@/hooks/useSettings";
import { ExperienceLevel, JobType, Remote } from "@/utils/types/settingsTypes";
import React from "react";

const Settings = () => {
  const postAgeSettings = usePostAge();
  const jobTypeSettings = useJobType();
  const experienceLevelSettings = useExperienceLevel();
  const remoteSettings = useRemote();
  const isLoading =
    postAgeSettings.isLoading ||
    jobTypeSettings.isLoading ||
    experienceLevelSettings.isLoading ||
    remoteSettings.isLoading;

  const postAgeActive = [
    age.find((val) => val.value === postAgeSettings.data?.age) ?? age[0],
  ];

  const jobTypeActive = jobType.filter(
    (val) => jobTypeSettings.data?.[val.value as keyof JobType] === 1
  );
  const experienceLevelActive = experienceLevel.filter(
    (val) =>
      experienceLevelSettings.data?.[val.value as keyof ExperienceLevel] === 1
  );
  const remoteActive = remote.filter(
    (val) => remoteSettings.data?.[val.value as keyof Remote] === 1
  );

  function handleSave(data: { value: string; label: string }[]) {
    console.log("Result:", data);
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex gap-5">
      <Select
        options={age}
        name="Age"
        type="radio"
        onSave={handleSave}
        defaultActive={postAgeActive}
      />

      <Select
        options={jobType}
        name="Job type"
        type="checkbox"
        onSave={handleSave}
        defaultActive={jobTypeActive}
      />

      <Select
        options={experienceLevel}
        name="Experience level"
        type="checkbox"
        width={"10rem"}
        onSave={handleSave}
        defaultActive={experienceLevelActive}
      />

      <Select
        options={remote}
        name="Remote"
        type="checkbox"
        onSave={handleSave}
        defaultActive={remoteActive}
      />
    </div>
  );
};

export default Settings;
