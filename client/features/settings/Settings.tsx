import Select from "@/components/shared/Select";
import { experienceLevel, jobType, age, remote } from "@/constants";
import React from "react";

const Settings = () => {
  function handleSave(data: { value: string; label: string }[]) {
    console.log("Result:", data);
  }

  return (
    <div className="flex gap-5">
      <Select options={age} name="Age" type="radio" onSave={handleSave} />

      <Select
        options={jobType}
        name="Job type"
        type="checkbox"
        onSave={handleSave}
      />

      <Select
        options={experienceLevel}
        name="Experience level"
        type="checkbox"
        width={"10rem"}
        onSave={handleSave}
      />

      <Select
        options={remote}
        name="Remote"
        type="checkbox"
        onSave={handleSave}
      />
    </div>
  );
};

export default Settings;
