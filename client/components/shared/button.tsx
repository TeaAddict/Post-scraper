import React, { ReactNode } from "react";

const Button = ({
  children,
  variation = "primaryHollow",
  onClick,
  type,
  disabled,
}: {
  children: ReactNode;
  variation?: "primary" | "secondary" | "primaryHollow";
  onClick?: Function;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
}) => {
  const variations = {
    primary:
      "text-foreground border-primary bg-primary hover:bg-primary/80 shadow-xl",
    primaryHollow: "text-foreground border-primary hover:bg-primary/80",
    secondary: "border-foreground hover:bg-foreground/20",
  };

  return (
    <button
      className={`border-2 ${variations[variation]} transition-all duration-300 rounded-md px-1 py-1`}
      onClick={(e) => onClick?.()}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
