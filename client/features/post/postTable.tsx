import React from "react";
import Table from "../../components/shared/table";
import Link from "next/link";
import { Post } from "@/utils/types/postTypes";
import Button from "../../components/shared/button";
import { Checkbox } from "../../components/ui/checkbox";

function checkBox(value: string | boolean | number, rowData: Post) {
  const boolVal = value === 1;
  return (
    <div className="flex justify-center">
      <Checkbox
        id={rowData.link}
        defaultChecked={boolVal}
        className="w-6 h-6"
      />
    </div>
  );
}

function button(value: string) {
  return (
    <Button>
      <Link href={value}>Start applying</Link>
    </Button>
  );
}

function onHeadClick() {
  // console.log("Clicked!");
}

const PostTable = ({ data }: { data: Post[] }) => {
  const header = [
    { label: "applied", value: "applied", func: checkBox },
    { label: "blacklisted", value: "blacklisted", func: checkBox },
    { label: "link", value: "link", func: button },
    { label: "title", value: "title" },
    { label: "location", value: "location" },
    { label: "company Name", value: "companyName" },
    { label: "website Created At DateTime", value: "websiteCreatedAtDateTime" },
    { label: "website Created At String", value: "websiteCreatedAtString" },
    { label: "age In Days", value: "ageInDays" },
    { label: "keywords", value: "keywords" },
  ];
  return (
    <div className="w-full h-full">
      <Table head={header} body={data} onClickHead={onHeadClick} />
    </div>
  );
};

export default PostTable;
