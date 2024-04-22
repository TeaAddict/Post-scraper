import { useQuery } from "@tanstack/react-query";
import React from "react";

const usePosts = () => {
  const query = useQuery({ queryKey: ["posts"], queryFn: getPosts });
};

export default usePosts;
