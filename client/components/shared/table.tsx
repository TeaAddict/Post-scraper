"use client";

import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@radix-ui/react-scroll-area";
import {
  Dispatch,
  FC,
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
  head: { label: string; value: string; bodyFunc?: FC<any> }[];
  body: { [key: string]: any }[];

  onClickBody?: MouseEventHandler<HTMLTableRowElement>;
  initSort?: string;
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
        if (direction === "asc") {
          return a[columnName].localeCompare(b[columnName]);
        } else {
          return b[columnName].localeCompare(a[columnName]);
        }

      case "number":
        if (direction === "asc") {
          return a[columnName] - b[columnName];
        } else {
          return b[columnName] - a[columnName];
        }

      case "object":
        if (direction === "asc") {
          return a[columnName] - b[columnName];
        } else {
          return b[columnName] - a[columnName];
        }
    }
  });
}

const Table = ({ head, body, onClickBody, initSort }: Props) => {
  const [sortVal, setSortVal] = useState(
    `${initSort}-desc` ?? `${head[0].value}-desc`
  );

  const sortedData = sort(body, sortVal.split("-")[0], sortVal.split("-")[1]);

  function handleHead(head: string) {
    setSortVal(head);
    ascDesc(head, sortVal, setSortVal);
  }

  // Needs w-full h-full on parent containers + overflow-auto,
  // idk why it cant just inherit parent size and overflow...
  // I pray for any soul that has to deal with tables
  return (
    <table className="text-left text-base">
      <thead className="sticky top-0 uppercase">
        <tr className=" border-b-4 border-current">
          {head.map((el) => (
            <th
              className={`bg-card-lighter border-b-4 px-6 py-3 hover:bg-primary transition-all duration-300 cursor-pointer`}
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
            className=" border-t border-current"
            onClick={onClickBody}
          >
            {head.map((el) => (
              <td key={el.label} className=" px-6 py-4">
                {el.bodyFunc ? (
                  <el.bodyFunc
                    cellVal={row[el.value]}
                    cellCol={el.value}
                    rowData={row}
                  />
                ) : typeof row[el.value] === "object" ? (
                  row[el.value].toLocaleDateString()
                ) : (
                  row[el.value]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
