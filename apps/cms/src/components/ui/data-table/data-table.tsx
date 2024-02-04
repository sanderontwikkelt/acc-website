import type { ColumnDef, Table as TanstackTable } from "@tanstack/react-table";
import * as React from "react";
import { flexRender } from "@tanstack/react-table";

import { cn } from "@acme/ui";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "./data-table-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import { DataTableAdvancedToolbar } from "./advanced/data-table-advanced-toolbar";
import { DataTableFloatingBar } from "./data-table-floating-bar";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TData, TValue> {
  /**
   * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
   * @type TanstackTable<TData>
   */
  dataTable: TanstackTable<TData>;

  /**
   * The columns of the table
   * @default []
   * @type ColumnDef<TData, TValue>[]
   */
  columns: ColumnDef<TData, TValue>[];

  onClickRow?: (row: TData) => void;

  /**
   * The searchable columns of the table
   * @default []
   * @type {id: keyof TData, title: string}[]
   * @example searchableColumns={[{ id: "title", title: "titles" }]}
   */
  searchableColumns?: DataTableSearchableColumn<TData>[];

  /**
   * The filterable columns of the table. When provided, renders dynamic faceted filters, and the advancedFilter prop is ignored.
   * @default []
   * @type {id: keyof TData, title: string, options: { label: string, value: string, icon?: React.ComponentType<{ className?: string }> }[]
   * @example filterableColumns={[{ id: "status", title: "Status", options: ["todo", "in-progress", "done", "canceled"]}]}
   */
  filterableColumns?: DataTableFilterableColumn<TData>[];

  /**
   * Show notion like filters when enabled
   * @default false
   * @type boolean
   */
  advancedFilter?: boolean;
  hideToolbar?: boolean;

  /**
   * The content to render in the floating bar on row selection, at the bottom of the table. When null, the floating bar is not rendered.
   * The datTable instance is passed as a prop to the floating bar content.
   * @default null
   * @type React.ReactNode | null
   * @example floatingBarContent={OrderImportsTableFloatingBarContent(dataTable)}
   */
  floatingBarContent?: React.ReactNode | null;

  /**
   * The action to delete rows
   * @default undefined
   * @type React.MouseEventHandler<HTMLButtonElement> | undefined
   * @example deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
   */
  deleteRowsAction?: React.MouseEventHandler<HTMLButtonElement>;

  className?: string;
}

export function DataTable<TData, TValue>({
  dataTable,
  columns,
  searchableColumns = [],
  filterableColumns = [],
  advancedFilter = false,
  hideToolbar = false,
  onClickRow,
  floatingBarContent,
  deleteRowsAction,
  className,
}: DataTableProps<TData, TValue>) {
  return (
    <div className="flex h-full w-full flex-grow flex-col space-y-3">
      {!hideToolbar && (
        <div className="flex w-full items-center">
          {advancedFilter ? (
            <DataTableAdvancedToolbar
              dataTable={dataTable}
              filterableColumns={filterableColumns}
              searchableColumns={searchableColumns}
            />
          ) : (
            <DataTableToolbar
              table={dataTable}
              filterableColumns={filterableColumns}
              searchableColumns={searchableColumns}
              deleteRowsAction={deleteRowsAction}
            />
          )}
        </div>
      )}
      <div className={cn("rounded-md border bg-background", className)}>
        <Table>
          <TableHeader>
            {dataTable.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {dataTable.getRowModel()?.rows?.length ? (
              dataTable.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-pw="data-table-row"
                  onClick={() => onClickRow?.(row.original)}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.id.includes("_select")
                          ? "w-min min-w-[3.5rem]"
                          : ""
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="space-y-2.5">
        <DataTablePagination table={dataTable} />
        {floatingBarContent ? (
          <DataTableFloatingBar table={dataTable}>
            {floatingBarContent}
          </DataTableFloatingBar>
        ) : null}
      </div>
    </div>
  );
}
