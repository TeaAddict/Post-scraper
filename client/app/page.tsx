import React from "react";
import { TEST_DATA } from "../constants";
import ClientPostsPage from "@/features/post/ClientPostsPage";

const MainPage = () => {
  return (
    // <main className="w-full h-full">
    <main>
      <ClientPostsPage data={TEST_DATA} />
    </main>
  );
};

export default MainPage;
