"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  options: { value: string; label: string }[];
  defaultActive?: { value: string; label: string }[];
  onSave?: Function;
  label: string;
  name: string;
  type: "radio" | "checkbox";
  width?: string;
};

const Select = ({
  options,
  defaultActive,
  onSave,
  type,
  label,
  name,
  width = "7rem",
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const currentState = options.map((val, index) => ({
    ...val,
    active:
      defaultActive?.some((defVal) => defVal.value === val.value) ?? index === 0
        ? true
        : false,
  }));

  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(
    defaultActive
      ? currentState
      : type === "radio"
      ? [{ ...options[0], active: true }]
      : []
  );

  function handleRadioChange(e: React.FormEvent<HTMLDivElement>) {
    const target = e.target as HTMLInputElement;
    const selected = options.map((val) => ({
      ...val,
      active: val.value === target.value,
    }));
    setActive(selected);
  }
  function handleCheckboxChange(e: React.FormEvent<HTMLDivElement>) {
    const target = e.target as HTMLInputElement;

    const isChecked = active.some(
      (val) => val.value === target.value && val.active === true
    );

    const newActive = active.map((val) => ({
      ...val,
      active: val.value === target.value ? !isChecked : val.active,
    }));
    setActive(newActive);
  }

  function handleSave() {
    setIsOpen(!isOpen);
    onSave?.(name, active);
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
        className={`flex justify-center items-center w-full h-full cursor-pointer`}
        onClick={() => isOpen && handleSave()}
      >
        {isOpen ? "Save" : label}
      </label>
      {isOpen && (
        <div className="absolute flex flex-col gap-1 z-10 top-full rounded-b-md bg-foreground border-x-2 border-b-2 w-[103%] text-black">
          {type === "radio" && (
            <div>
              {active.map((val) => (
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
                    checked={val.active}
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
              {active.map((val) => (
                <label
                  key={val.value}
                  className="flex gap-1 hover:bg-primary p-1 last:rounded-b-sm cursor-pointer transition-all duration-300"
                >
                  <input
                    type="checkbox"
                    name={name}
                    value={val.value}
                    checked={val.active}
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
