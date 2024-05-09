import React from "react";
import Table from "@/components/shared/Table";
import Button from "../../components/shared/Button";
import TableCheckBox from "./TableCheckbox";
import { Post } from "@/utils/types/postTypes";
import { IoMdClose } from "react-icons/io";
import { useDeletePost } from "@/hooks/usePosts";
import LinkButton from "./LinkButton";

const PostTable = ({ data }: { data: Post[] }) => {
  const deleteMutation = useDeletePost();

  function onDelete(id: number) {
    deleteMutation.mutate(id);
  }

  const header = [
    { label: "applied", value: "applied", bodyFunc: TableCheckBox },
    { label: "blacklisted", value: "blacklisted", bodyFunc: TableCheckBox },
    { label: "link", value: "link", bodyFunc: LinkButton },
    { label: "title", value: "title" },
    { label: "location", value: "location" },
    { label: "company Name", value: "companyName" },
    { label: "website Created At Datetime", value: "websiteCreatedAtDatetime" },
    { label: "website Created At String", value: "websiteCreatedAtString" },
    { label: "age In Days", value: "ageInDays" },
    { label: "keywords", value: "keywords" },
    {
      label: "delete",
      value: "id",
      bodyFunc: ({
        cellVal,
        cellCol,
        rowData,
      }: {
        cellVal: number;
        cellCol: string;
        rowData: Post;
      }) => {
        return (
          <div className="flex justify-center">
            <Button onClick={() => onDelete(cellVal)} variation="square">
              <IoMdClose size={20} />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table head={header} body={data} initSort="websiteCreatedAtDatetime" />
    </div>
  );
};

export default PostTable;
