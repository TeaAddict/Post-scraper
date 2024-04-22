import React from "react";
import { CheckboxWLabel } from "./shared/checkboxWLabel";

import { useQueryClient } from "@tanstack/react-query";
import { useSettings, useSettingsMutation } from "@/hooks/useSettings";

const FilterOptions = () => {
  const queryClient = useQueryClient();
  const settingsMutation = useSettingsMutation(queryClient);
  const { data, isLoading } = useSettings();

  const appliedFilter = data?.appliedFilter === 1;
  const blacklistedFilter = data?.blacklistedFilter === 1;

  function onClick(id: string, isChecked: boolean) {
    let settings = { [id]: isChecked };

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
