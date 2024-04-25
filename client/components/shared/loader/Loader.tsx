import "./loader.css";
import React from "react";

const Loader = ({ size }: { size?: number }) => {
  return <div className={`loader ${size ? `w-${size}` : "w-full"}`} />;
};

export default Loader;
