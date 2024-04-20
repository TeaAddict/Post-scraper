import React, { forwardRef } from "react";

type InputProps = React.HTMLProps<HTMLInputElement>;

export const InputBox = forwardRef<HTMLInputElement, InputProps>(
  function FancyButton(props, ref) {
    return (
      <input
        ref={ref}
        {...props}
        className={`border-2 w-full border-foreground rounded-md p-1 text-foreground bg-inherit  focus:border-primary focus:outline-none`}
      />
    );
  }
);

export default InputBox;
