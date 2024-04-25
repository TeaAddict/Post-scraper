import React from "react";
import Button from "./shared/Button";
import { deleteCookie } from "@/utils/helpers";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  function onClick() {
    deleteCookie("USER-AUTH", "/", process.env.CLIENT!);
    deleteCookie("id", "/", process.env.CLIENT!);
    router.replace("/login");
  }

  return <Button onClick={onClick}>Logout</Button>;
};

export default LogoutButton;
