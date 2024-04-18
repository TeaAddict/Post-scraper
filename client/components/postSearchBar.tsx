import React from "react";
import SearchBox from "./shared/searchBox";
import Button from "./shared/button";

const PostSearchBar = () => {
  return (
    <div className="flex gap-4">
      <SearchBox />
      <Button variation="primary">Get data</Button>
    </div>
  );
};

export default PostSearchBar;
