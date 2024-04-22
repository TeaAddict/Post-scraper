"use client";
import React, { useState } from "react";
import { Post } from "@/utils/types/postTypes";
import PostTable from "./postTable";
import PostSearchBar from "./postSearchBar";
import FilterOptions from "../../components/filterOptions";
import BlacklistedWordTable from "../../components/blacklistedWordTable";
import LogoutButton from "@/components/logoutButton";

const ClientPostsPage = ({ data }: { data: Post[] }) => {
  const [searchVal, setSearchVal] = useState("");

  const filteredDataByKeyword = data.filter((post) => {
    if (!searchVal || post.keywords.includes(searchVal)) return post;
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchVal(e.currentTarget.value);
  }

  return (
    <div className="p-14 rounded-sm bg-card w-screen h-screen flex flex-col gap-4">
      <div className="flex justify-end">
        <LogoutButton />
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 ">
          <PostSearchBar value={searchVal} onChange={onChange} />
          <FilterOptions />
          <div className="w-full h-full">
            <PostTable data={filteredDataByKeyword} />
          </div>
        </div>
        <BlacklistedWordTable />
      </div>
    </div>
  );
};

export default ClientPostsPage;
