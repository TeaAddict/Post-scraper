import React from "react";
import { CheckboxWLabel } from "./shared/checkboxWLabel";

const FilterOptions = () => {
  return (
    <div className="flex gap-4">
      <CheckboxWLabel id="appliedCheckbox">Filter applied</CheckboxWLabel>
      <CheckboxWLabel id="blacklistedCheckbox">
        Filter blacklisted
      </CheckboxWLabel>
    </div>
  );
};

export default FilterOptions;
