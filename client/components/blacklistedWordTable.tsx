import React, { useState } from "react";
import Table from "./shared/table";
import InputBox from "./shared/inputBox";
import Button from "./shared/button";
import { getBlacklist } from "@/features/blacklist/getBlacklist";

const head = [
  {
    label: "Nr",
    value: "nr",
  },
  {
    label: "keyword",
    value: "keyword",
  },
  {
    label: "empty",
    value: "empty",
    func: () => {
      return <Button>X</Button>;
    },
  },
];

const body = [
  {
    nr: 1,
    keyword: "Senior",
    remove: "X",
  },
];

const BlacklistedWordTable = () => {
  const res = getBlacklist();
  const [inputVal, setInputVal] = useState("");

  function onClick() {
    console.log("click", inputVal);

    setInputVal("");
  }

  return (
    <div className="flex flex-col flex-shrink p-2 border-2 gap-3">
      <p>Blacklisted keywords</p>
      <div className="flex gap-1">
        <InputBox value={inputVal} setValue={setInputVal} />
        <Button variation="primary" onClick={onClick}>
          Add
        </Button>
      </div>
      <Table head={head} body={body} />
    </div>
  );
};

export default BlacklistedWordTable;
