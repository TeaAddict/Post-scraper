"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MainPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/post");
  }, [router]);

  return <main></main>;
};

export default MainPage;
