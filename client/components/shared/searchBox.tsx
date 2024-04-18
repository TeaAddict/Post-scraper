import React from "react";

const SearchBox = () => {
  return (
    <input
      type="search"
      className={`border-2 border-foreground rounded-md p-1 text-foreground bg-inherit focus:outline focus:outline-primary outline-2`}
    />
  );
};

export default SearchBox;
