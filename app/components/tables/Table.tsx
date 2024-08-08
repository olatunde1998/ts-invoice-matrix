"use client";
import React, { FC, useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
// import { ChevronLeft, ChevronRight } from "lucide-react";

interface TableProps {
  data: any;
  columns: any;
  tableClass: string;
}

export const Table = ({
  data,
  columns = [],
  tableClass,
}: // rowHoveringBgColor,
// handlePreviousPage,
// handleNextPage,
// currentPage,
// pageSize,
// totalItems,
// endCursor,
TableProps) => {
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableColumnResizing: true,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    //
    debugTable: true,
  });

  // const entriesPerPage = pageSize;
  // const totalEntries = totalItems || 0;
  // const startSerial = (currentPage - 1) * entriesPerPage + 1;
  // const endSerial = currentPage * entriesPerPage;
  // const paginationText = `${startSerial} - ${endSerial} of ${totalEntries}`;

  return (
    <>
      <div className="text-foreground w-full overflow-x-auto block rounded-md min-h-[30.3rem] dark:bg-background border-[1px] border-accent-primary">
        {/* Render table if table has data  */}
        <table className={"w-full h-full rounded-t-2xl " + " " + tableClass}>
          <thead className="text-xs">
            {/* Mapping through the table headers */}
            {table?.getHeaderGroups()?.map((headerGroup, i) => (
              <tr key={i}>
                {headerGroup.headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="bg-[#FB8136] bg-[#FB8136]/40 font-normal whitespace-nowrap text-foreground py-5 px-5 text-left capitalize text-sm"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {/* Mapping throught the table body */}
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={index}
                className={`hover:bg-accent  cursor-pointer  border border-accent text-[14px] font-normal whitespace-nowrap ${
                  (index + 1) % 2 === 0 ? "bg-accent dark:bg-background" : ""
                }`}
              >
                {row.getVisibleCells().map((cell, key) => (
                  <td
                    key={key}
                    className="py-3 px-5 relative group hover:opacity-100"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination only when table has content*/}
      {/* <div className="bg-[#fbf2ff] flex items-center gap-x-8 justify-end px-4 py-3  rounded-b-[0.5rem] mb-6">
        <span className="flex items-center gap-1  text-small">
          {paginationText}
        </span>
        <div className="space-x-5">
          <button
            className={`${
              currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
            } p-1`}
            onClick={handlePreviousPage}
          >
            <ChevronLeft color={currentPage === 1 ? "#213f7d66" : "#213F7D"} />
          </button>
          <button
            className={`${
              endCursor === null ? "cursor-not-allowed" : "cursor-pointer"
            } p-1`}
            onClick={handleNextPage}
          >
            <ChevronRight
              color={endCursor === null ? "#213f7d66" : "#213F7D"}
            />
          </button>
        </div>
      </div> */}
    </>
  );
};
