"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";

export function CheckboxWLabel({
  children,
  id,
  defaultChecked,
  onClick,
}: {
  children?: ReactNode;
  id: string;
  defaultChecked: boolean;
  onClick?: Function;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleClick() {
    const newChecked = !checked;
    onClick?.(id, newChecked);
    setChecked(newChecked);
    const params = new URLSearchParams(searchParams);
    params.set(id, String(newChecked));
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} defaultChecked={defaultChecked} onClick={handleClick} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        {children}
      </label>
    </div>
  );
}
