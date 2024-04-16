"use client";
import React from "react";
import Table from "./table";
import { TEST_DATA } from "@/constants";

// title: "Front-End Developer (Web team)",
//     link: "https://lt.linkedin.com/jobs/view/front-end-developer-web-team-at-surfshark-3815235850?position=1&pageNum=0&refId=l7JyYMClDRqUAH3WwTM4oQ%3D%3D&trackingId=N36ZfAonSTFHm4mkSE4sHw%3D%3D&trk=public_jobs_jserp-result_search-card",
//     location: "Vilnius, Vilniaus, Lithuania",
//     companyName: "Surfshark",
//     websiteCreatedAtDateTime: "2024-02-01",
//     websiteCreatedAtString: "2 months ago",
//     ageInDays: 75,

const ClientPage = () => {
  const header = [
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
        <Table head={header} body={TEST_DATA} onClickHead={onHeadClick} />
      </div>
    </div>
  );
};

export default ClientPage;
