import { TEST_DATA } from "@/constants";
import ClientPostsPage from "@/features/post/ClientPostsPage";
import React from "react";

const PostPage = () => {
  return (
    <div>
      <ClientPostsPage data={TEST_DATA} />
    </div>
  );
};

export default PostPage;
