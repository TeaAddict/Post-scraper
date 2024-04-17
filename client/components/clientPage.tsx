"use client";
import React from "react";
import Table from "./table";
import { Post } from "@/utils/types/postTypes";

const ClientPage = ({ data }: { data: Post[] }) => {
  const header = [
    { label: "applied", value: "applied" },
    { label: "blacklisted", value: "blacklisted" },
    { label: "title", value: "title" },
    { label: "location", value: "location" },
    { label: "company Name", value: "companyName" },
    { label: "website Created At DateTime", value: "websiteCreatedAtDateTime" },
    { label: "website Created At String", value: "websiteCreatedAtString" },
    { label: "age In Days", value: "ageInDays" },
    { label: "link", value: "link" },
  ];

  function onHeadClick() {
    // console.log("Clicked!");
  }
  return (
    <div>
      <div className="w-[70vw] h-[70vh]">
        <Table head={header} body={data} onClickHead={onHeadClick} />
      </div>
    </div>
  );
};

export default ClientPage;
