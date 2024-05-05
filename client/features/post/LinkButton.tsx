import Button from "@/components/shared/Button";
import Link from "next/link";
import React from "react";

const LinkButton = (value: string) => {
  return (
    <Button>
      <Link href={value}>Start applying</Link>
    </Button>
  );
};

export default LinkButton;
