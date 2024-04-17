import ClientPage from "@/components/clientPage";
import React from "react";
import { TEST_DATA } from "../constants";

const MainPage = () => {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <ClientPage data={TEST_DATA} />
    </main>
  );
};

export default MainPage;
