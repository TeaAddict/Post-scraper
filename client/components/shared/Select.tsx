"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  options: { value: string; label: string }[];
  // active?: string;
  // setActive?: React.Dispatch<React.SetStateAction<string>>;
  defaultActive?: { value: string; label: string }[];
  onSave?: Function;
  name?: string;
  type?: "radio" | "checkbox";
  width?: string;
};

const Select = ({
  options,
  defaultActive,
  onSave,
  type = "radio",
  name,
  width = "7rem",
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(
    defaultActive ?? type === "radio" ? [options[0]] : []
  );
  const ref = useRef<HTMLDivElement>(null);

  function handleRadioChange(e: React.FormEvent<HTMLDivElement>) {
    const target = e.target as HTMLInputElement;
    const selected = options.find((option) => option.value === target.value)!;
    setActive([selected]);
  }
  function handleCheckboxChange(e: React.FormEvent<HTMLDivElement>) {
    const target = e.target as HTMLInputElement;
    const selected = options.find((option) => option.value === target.value)!;
    const alreadyExists = active.some((val) => val.value === selected.value);
    if (alreadyExists) {
      const filteredList = active.filter((val) => val.value !== selected.value);
      setActive(filteredList);
    } else {
      setActive([...active, selected]);
    }
  }

  function handleSave() {
    setIsOpen(!isOpen);
    onSave?.(active);
  }

  useEffect(() => {
    const handleOutSideClick = (event: Event) => {
      if (!ref.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  return (
    <div
      className={`relative border-2 flex justify-center transition-all duration-300 rounded-md px-1 py-1 disabled:bg-background disabled:text-gray-400 disabled:border-gray-400 cursor-pointer ${
        isOpen ? "rounded-b-none hover:bg-green-600" : "hover:bg-primary"
      }`}
      style={{ width }}
      onClick={() => !isOpen && setIsOpen(true)}
      ref={ref}
    >
      <label
        className={`flex justify-center w-full h-full cursor-pointer`}
        onClick={() => isOpen && handleSave()}
      >
        {isOpen ? "Save" : name}
      </label>
      {isOpen && (
        <div className="absolute flex flex-col gap-1 z-10 top-full rounded-b-md bg-foreground border-x-2 border-b-2 w-[103%] text-black">
          {type === "radio" && (
            <div>
              {options.map((val) => (
                <label
                  key={val.value}
                  htmlFor={val.value}
                  className="flex gap-1 hover:bg-primary p-1 last:rounded-b-sm cursor-pointer transition-all duration-300"
                >
                  <input
                    type="radio"
                    name={name}
                    value={val.value}
                    id={val.value}
                    checked={active[0].value === val.value}
                    onChange={(e) => {
                      handleRadioChange(e);
                    }}
                  />
                  {val.label}
                </label>
              ))}
            </div>
          )}
          {type === "checkbox" && (
            <div>
              {options.map((val) => (
                <label
                  key={val.value}
                  className="flex gap-1 hover:bg-primary p-1 last:rounded-b-sm cursor-pointer transition-all duration-300"
                >
                  <input
                    type="checkbox"
                    name={name}
                    value={val.value}
                    checked={active.some(
                      (activeVal) => activeVal.value === val.value
                    )}
                    onChange={(e) => {
                      handleCheckboxChange(e);
                    }}
                  />
                  {val.label}
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
