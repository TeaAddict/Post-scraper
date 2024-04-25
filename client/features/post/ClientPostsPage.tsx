"use client";
import React, { useState } from "react";
import { Post } from "@/utils/types/postTypes";
import PostTable from "./PostTable";
import PostSearchBar from "./PostSearchBar";
import FilterOptions from "@/components/FilterOptions";
import BlacklistedWordTable from "@/components/BlacklistedWordTable";
import LogoutButton from "@/components/LogoutButton";
import { usePosts } from "@/hooks/usePosts";

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
    <div className="p-20 rounded-sm bg-card w-screen h-screen flex flex-col gap-4">
      {/* <div className="flex justify-end">
        <LogoutButton />
      </div>

      <div className="flex flex-row  gap-4">
        <div className="flex flex-col gap-4 ">
          <PostSearchBar value={searchVal} onChange={onChange} />
          <FilterOptions />
        </div>
      </div>

      <div className="flex max-h-full">
        <div className="  overflow-auto">
          <PostTable data={cleanData} />
        </div>
      </div> */}
      <div className="flex h-full w-full">
        <div className="h-full w-full overflow-auto">
          <PostTable data={cleanData} />
        </div>
        <BlacklistedWordTable />
      </div>
    </div>
  );
};

export default ClientPostsPage;
