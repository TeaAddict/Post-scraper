import Button from "@/components/shared/Button";
import Link from "next/link";
import React from "react";

const LinkButton = (data: { cellCol: string; cellVal: string }) => {
  return (
    <Button>
      <Link href={data.cellVal} target="_blank">
        Start applying
      </Link>
    </Button>
  );
};

export default LinkButton;
