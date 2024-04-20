import React, { ChangeEventHandler } from "react";

const SearchBox = ({
  value,
  onChange,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      type="search"
      className={`border-2 border-foreground rounded-md p-1 text-foreground bg-inherit focus:outline focus:outline-primary outline-2`}
    />
  );
};

export default SearchBox;
