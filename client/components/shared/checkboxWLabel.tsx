"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ReactNode } from "react";

export function CheckboxWLabel({
  children,
  id,
  defaultChecked,
}: {
  children?: ReactNode;
  id: string;
  defaultChecked: boolean;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} defaultChecked />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {children}
      </label>
    </div>
  );
}
