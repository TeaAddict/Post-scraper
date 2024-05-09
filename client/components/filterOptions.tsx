import React from "react";
import { CheckboxWLabel } from "./shared/CheckboxWLabel";
import { useSettings, useSettingsMutation } from "@/hooks/useSettings";
import { Settings } from "@/utils/types/settingsTypes";

const FilterOptions = () => {
  const settingsMutation = useSettingsMutation();
  const { data, isLoading } = useSettings();
  const partialSettings: Settings = {
    appliedFilter: data?.appliedFilter ?? 0,
    blacklistedFilter: data?.blacklistedFilter ?? 0,
    getPostCount: data?.getPostCount ?? 0,
  };

  const appliedFilter = data?.appliedFilter === 1;
  const blacklistedFilter = data?.blacklistedFilter === 1;

  function onClick(id: string, isChecked: boolean) {
    let settings: Settings = { ...partialSettings, [id]: isChecked };
    settingsMutation.mutate(settings);
  }

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="flex gap-4">
      <CheckboxWLabel
        id="appliedFilter"
        onClick={onClick}
        defaultChecked={appliedFilter}
      >
        Filter &apos;applied&apos;
      </CheckboxWLabel>
      <CheckboxWLabel
        id="blacklistedFilter"
        onClick={onClick}
        defaultChecked={blacklistedFilter}
      >
        Filter &apos;blacklisted&apos;
      </CheckboxWLabel>
    </div>
  );
};

export default FilterOptions;
