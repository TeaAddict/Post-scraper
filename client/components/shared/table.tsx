"use client";

import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@radix-ui/react-scroll-area";
import {
  Dispatch,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";

/**
 * Represents an order table with dynamic sorting functionality.
 * @param {object} props - The props object.
 * @param {string[]} props.head - The headers of the table.
 * @param {object[]} props.body - The body of the table.
 * @param {Function} [props.onClickHead] - Function to handle click events on table headers.
 * @param {Function} [props.onClickBody] - Function to handle click events on table body cells.
 * @param {string} [props.initSort] - Initial sorting configuration. Should be in the format "data-asc".
 */

type Body = { [key: string]: any }[];

type Props = {
  head: { label: string; value: string; bodyFunc?: Function }[];
  body: { [key: string]: any }[];
  onClickHead?: Function;
  onClickBody?: MouseEventHandler<HTMLTableRowElement>;
  initSort?: [{ name: string; value: string }];
};

function ascDesc(
  headName: string,
  stateVal: string,
  setVal: Dispatch<SetStateAction<string>>
) {
  if (stateVal === headName.concat("-desc")) {
    setVal(headName.concat("-asc"));
  } else {
    setVal(headName.concat("-desc"));
  }
}

function sort(data: Body, columnName: string, direction: string) {
  return data.sort((a, b) => {
    switch (typeof data[0][columnName]) {
      case "string":
        if (direction === "desc") {
          return a[columnName].localeCompare(b[columnName]);
        } else {
          return b[columnName].localeCompare(a[columnName]);
        }

      case "number":
        if (direction === "desc") {
          return a[columnName] - b[columnName];
        } else {
          return b[columnName] - a[columnName];
        }
    }
  });
}

const Table = ({ head, body, onClickHead, onClickBody, initSort }: Props) => {
  const [sortVal, setSortVal] = useState(`${head[0].value}-desc`);

  const sortedData = sort(body, sortVal.split("-")[0], sortVal.split("-")[1]);

  function handleHead(head: string) {
    setSortVal(head);
    onClickHead?.(head);
    ascDesc(head, sortVal, setSortVal);
    // sort(body, head, sortVal.split("-")[1]);
  }

  return (
    <ScrollArea className="pb-5 w-full h-full overflow-auto" type="always">
      <ScrollAreaViewport className="w-full h-full">
        <table className="text-left text-base">
          <thead className="uppercase">
            <tr className="border-b-4 border-current">
              {head.map((el) => (
                <th
                  className={`px-6 py-3 hover:bg-white/10 transition-all duration-300 cursor-pointer`}
                  onClick={() => handleHead(el.value)}
                  key={el.value}
                >
                  {el.value === "empty" ? "" : el.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sortedData.map((row, index) => (
              <tr
                key={index}
                className={`border-t border-current`}
                onClick={onClickBody}
              >
                {head.map((el, index) => (
                  <td className="px-6 py-4" key={index}>
                    {el.bodyFunc
                      ? el.bodyFunc(row[el.value], row)
                      : row[el.value]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb className="border-2 rounded-md" />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb className="border-2 rounded-md" />
      </ScrollAreaScrollbar>
    </ScrollArea>
  );
};

export default Table;
