"use client";
import React, { useState } from "react";
import { Post } from "@/utils/types/postTypes";
import PostTable from "./PostTable";
import PostSearchBar from "./PostSearchBar";
import FilterOptions from "@/components/FilterOptions";
import BlacklistedWordTable from "@/components/BlacklistedWordTable";
import LogoutButton from "@/components/LogoutButton";
import { usePosts } from "@/hooks/usePosts";
import Settings from "../settings/Settings";

const ClientPostsPage = () => {
  const [searchVal, setSearchVal] = useState("");
  const query = usePosts();
  const data = (query.data as Post[]) ?? [];

  const filteredDataByKeyword = data.filter((post) => {
    if (!searchVal || post.keywords.includes(searchVal)) return post;
  });

  const cleanData = filteredDataByKeyword.map((val) => {
    return {
      ...val,
      websiteCreatedAtDateTime: new Date(val.websiteCreatedAtDateTime),
      ageInDays: Number(val.ageInDays),
    };
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchVal(e.currentTarget.value);
  }

  return (
    <div className="p-20 rounded-sm bg-card  flex flex-col gap-4">
      <Settings />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <PostSearchBar value={searchVal} onChange={onChange} />
            <FilterOptions />
          </div>
          <div className="flex items-center">
            <LogoutButton />
          </div>
        </div>

        <div className="flex h-[70vh] w-full">
          <div className="h-full w-full overflow-auto">
            <PostTable data={cleanData} />
          </div>
          <BlacklistedWordTable />
        </div>
      </div>
    </div>
  );
};

export default ClientPostsPage;
