import Select from "@/components/shared/Select";
import { experienceLevel, jobType, age, remote } from "@/constants";
import {
  useExperienceLevel,
  useJobType,
  usePostAge,
  useRadioMutation,
  useRemote,
  useSettings,
} from "@/hooks/useSettings";
import { ExperienceLevel, JobType, Remote } from "@/utils/types/settingsTypes";
import React from "react";
import {
  useCheckboxMutation,
  useSettingsMutation,
} from "../../hooks/useSettings";
import InputBox from "@/components/shared/InputBox";

const Settings = () => {
  const postAgeSettings = usePostAge();
  const radioMutation = useRadioMutation();
  const jobTypeSettings = useJobType();
  const checkboxMutation = useCheckboxMutation();
  const experienceLevelSettings = useExperienceLevel();
  const remoteSettings = useRemote();
  const { data: settingsData } = useSettings();
  const settingsMutation = useSettingsMutation();
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

  function handleRadioSave(
    name: string,
    data: {
      value: "any" | "pastMonth" | "pastWeek" | "past24Hours";
      label: string;
      active: boolean;
    }[]
  ) {
    const ageVal = data.find((val) => val.active === true)!.value;
    radioMutation.mutate({ name, age: ageVal });
  }

  function handleCheckboxSave(
    name: string,
    data: { value: string; label: string; active: boolean }[]
  ) {
    const updateData: { [key: string]: boolean } = {};
    data.forEach((val) => (updateData[val.value] = val.active));
    checkboxMutation.mutate({ name, updateData });
  }

  function handlePostCountChange(e: React.FormEvent<HTMLInputElement>) {
    if (settingsData)
      settingsMutation.mutate({
        appliedFilter: settingsData.appliedFilter,
        blacklistedFilter: settingsData.blacklistedFilter,
        getPostCount: Number(e.currentTarget.value),
      });
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex gap-5">
      <Select
        options={age}
        label="Age"
        name="postAge"
        type="radio"
        onSave={handleRadioSave}
        defaultActive={postAgeActive}
      />

      <Select
        options={jobType}
        label="Job type"
        name="jobType"
        type="checkbox"
        onSave={handleCheckboxSave}
        defaultActive={jobTypeActive}
      />

      <Select
        options={experienceLevel}
        label="Experience level"
        name="experienceLevel"
        type="checkbox"
        width={"10rem"}
        onSave={handleCheckboxSave}
        defaultActive={experienceLevelActive}
      />

      <Select
        options={remote}
        label="Remote"
        name="remote"
        type="checkbox"
        onSave={handleCheckboxSave}
        defaultActive={remoteActive}
      />

      <div className="flex items-center w-32 gap-2">
        <p>get posts:</p>
        <InputBox
          type="number"
          defaultValue={settingsData?.getPostCount}
          onChange={handlePostCountChange}
        />
      </div>
    </div>
  );
};

export default Settings;
