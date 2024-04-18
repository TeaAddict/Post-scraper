"use client";
import React from "react";
import { Post } from "@/utils/types/postTypes";
import PostTable from "./postTable";
import PostSearchBar from "./postSearchBar";
import FilterOptions from "./filterOptions";
import BlacklistedWordTable from "./blacklistedWordTable";

const ClientPage = ({ data }: { data: Post[] }) => {
  return (
    <div className="p-14 flex flex-row gap-4 rounded-sm bg-card">
      <div className="flex flex-col gap-4">
        <PostSearchBar />
        <FilterOptions />
        <PostTable data={data} />
      </div>
      <BlacklistedWordTable />
    </div>
  );
};

export default ClientPage;
