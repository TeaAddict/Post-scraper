import React, { useState } from "react";
import Table from "./shared/Table";
import InputBox from "./shared/InputBox";
import Button from "./shared/Button";
import {
  useAddToBlacklist,
  useBlacklist,
  useDeleteFromBlacklist,
} from "@/hooks/useBlacklist";
import { Blacklist } from "@/utils/types/blacklistTypes";
import { IoMdClose } from "react-icons/io";
import { useQueryClient } from "@tanstack/react-query";

const BlacklistedWordTable = () => {
  const queryClient = useQueryClient();
  const query = useBlacklist();
  const addMutation = useAddToBlacklist(queryClient);
  const deleteMutation = useDeleteFromBlacklist(queryClient);

  const keywords = (query.data as Blacklist[])?.map((val, index) => ({
    keyword: val.keyword,
    nr: index + 1,
  }));

  const [inputVal, setInputVal] = useState("");

  function onAdd() {
    addMutation.mutate(inputVal);
    setInputVal("");
  }
  function onDelete(keyword: string) {
    deleteMutation.mutate(keyword);
    setInputVal("");
  }

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
      bodyFunc: ({
        cellVal,
        cellCol,
        rowData,
      }: {
        cellVal: string;
        cellCol: string;
        rowData: Blacklist;
      }) => {
        return (
          <Button onClick={() => onDelete(rowData.keyword)} variation="square">
            <IoMdClose size={20} />
          </Button>
        );
      },
    },
  ];

  function onChange(e: React.FormEvent<HTMLInputElement>) {
    setInputVal(e.currentTarget.value);
  }

  return (
    <div className="flex flex-col p-2 border-2 gap-3">
      <p>Blacklisted keywords</p>
      <div className="flex gap-4">
        <div className="flex-1">
          <InputBox value={inputVal} onChange={onChange} />
        </div>
        <div className="w-20">
          <Button variation="primary" onClick={onAdd}>
            Add
          </Button>
        </div>
      </div>
      {keywords && (
        <div className="h-full overflow-auto">
          <Table head={head} body={keywords} />
        </div>
      )}
    </div>
  );
};

export default BlacklistedWordTable;
