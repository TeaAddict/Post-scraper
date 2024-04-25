import React from "react";
import Table from "@/components/shared/Table";
import Link from "next/link";
import { Post } from "@/utils/types/postTypes";
import Button from "../../components/shared/Button";
import TableCheckBox from "./TableCheckbox";

function button(value: string) {
  return (
    <Button>
      <Link href={value}>Start applying</Link>
    </Button>
  );
}

const PostTable = ({ data }: { data: Post[] }) => {
  const header = [
    { label: "applied", value: "applied", bodyFunc: TableCheckBox },
    { label: "blacklisted", value: "blacklisted", bodyFunc: TableCheckBox },
    { label: "link", value: "link", bodyFunc: button },
    { label: "title", value: "title" },
    { label: "location", value: "location" },
    { label: "company Name", value: "companyName" },
    { label: "website Created At DateTime", value: "websiteCreatedAtDateTime" },
    { label: "website Created At String", value: "websiteCreatedAtString" },
    { label: "age In Days", value: "ageInDays" },
    { label: "keywords", value: "keywords" },
  ];

  return (
    <div>
      <Table head={header} body={data} initSort="websiteCreatedAtDateTime" />
    </div>
  );
};

export default PostTable;
