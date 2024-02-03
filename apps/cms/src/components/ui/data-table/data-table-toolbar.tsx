"use client";

import type { Table } from "@tanstack/react-table";
import * as React from "react";
import { Cross2Icon, TrashIcon } from "@radix-ui/react-icons";

import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "./data-table-types";
import { AlertModal } from "~/components/modals/alert-modal";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>[];
  newRowLink?: string;
  columns?: { label: string; value: string }[];
  deleteRowsAction?: React.MouseEventHandler<HTMLButtonElement>;
}

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
  searchableColumns = [],
  deleteRowsAction,
  columns,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [isPending, startTransition] = React.useTransition();
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const onDelete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    startTransition(() => {
      table.toggleAllPageRowsSelected(false);
      deleteRowsAction?.(event);
      setDeleteOpen(false);
    });
  };

  return (
    <div className="flex w-full items-center justify-between space-x-2 overflow-auto">
      <div className="flex flex-1 items-center space-x-2">
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <Input
                  key={String(column.id)}
                  placeholder={`Filter ${column.title}...`}
                  data-pw="data-table-search-input"
                  value={
                    (table
                      .getColumn(String(column.id))
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn(String(column.id))
                      ?.setFilterValue(event.target.value)
                  }
                  className="h-8 w-[150px] lg:w-[250px]"
                />
              ),
          )}
        {filterableColumns.length > 0 &&
          filterableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <DataTableFacetedFilter
                  key={String(column.id)}
                  data-pw={"faceted_filter-" + String(column.id)}
                  column={table.getColumn(column.id ? String(column.id) : "")}
                  title={column.title}
                  options={column.options}
                />
              ),
          )}
        {isFiltered && (
          <Button
            aria-label="Reset filters"
            variant="ghost"
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {deleteRowsAction && table.getSelectedRowModel().rows.length > 0 && (
          <>
            <Button
              aria-label="Delete selected rows"
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => setDeleteOpen(true)}
              disabled={isPending}
            >
              <TrashIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Verwijderen
            </Button>
            <AlertModal
              isOpen={deleteOpen}
              onClose={() => setDeleteOpen(false)}
              onConfirm={onDelete}
              loading={isPending}
            />
          </>
        )}
        <DataTableViewOptions table={table} columns={columns} />
      </div>
    </div>
  );
}
