import React, { MouseEvent, ReactNode } from "react";

const Button = ({
  children,
  variation = "primaryHollow",
  onClick,
}: {
  children: ReactNode;
  variation?: "primary" | "secondary" | "primaryHollow";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const variations = {
    primary: "text-foreground border-primary bg-primary hover:bg-primary/80",
    primaryHollow: "text-foreground border-primary hover:bg-primary/80",
    secondary: "border-foreground hover:bg-foreground/20",
  };

  return (
    <div>
      <button
        className={`border-2 ${variations[variation]} transition-all duration-300 rounded-md p-1`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
