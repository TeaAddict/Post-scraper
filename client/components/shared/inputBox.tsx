import React from "react";

const InputBox = ({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <input
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value}
      className={`border-2 border-foreground rounded-md p-1 text-foreground bg-inherit  focus:border-primary focus:outline-none`}
    />
  );
};

export default InputBox;
