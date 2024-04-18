import { getBlacklist } from "@/features/blacklist/getBlacklist";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const useBlacklist = () => {
  const query = useQuery({ queryKey: ["blacklist"], queryFn: getBlacklist });

  return query;
};

export default useBlacklist;
