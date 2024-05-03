"use client";
import React, { useState } from "react";
import { FullPost, Post } from "@/utils/types/postTypes";
import PostTable from "./PostTable";
import PostSearchBar from "./PostSearchBar";
import FilterOptions from "@/components/FilterOptions";
import BlacklistedWordTable from "@/components/BlacklistedWordTable";
import LogoutButton from "@/components/LogoutButton";
import { usePosts } from "@/hooks/usePosts";
import Settings from "../settings/Settings";
import { objectSnakeToCamel } from "@/utils/helpers";

const ClientPostsPage = () => {
  const [searchVal, setSearchVal] = useState("");
  const query = usePosts();
  const data = (query.data as FullPost[]) ?? [];

  const camelCasedData = data.map(
    (val: FullPost) => objectSnakeToCamel(val) as FullPost
  );

  const filteredDataByKeyword = camelCasedData.filter((post) => {
    if (!searchVal || post.keywords.includes(searchVal)) return post;
  });

  const cleanData = filteredDataByKeyword.map((val) => {
    return {
      ...val,
      websiteCreatedAtDatetime: new Date(val.websiteCreatedAtDatetime),
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
