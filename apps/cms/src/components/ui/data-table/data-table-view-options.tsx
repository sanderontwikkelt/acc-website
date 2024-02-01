"use client";

import type { Table } from "@tanstack/react-table";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@acme/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@acme/ui/dropdown";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  columns?: { label: string; value: string }[];
}

export function DataTableViewOptions<TData>({
  table,
  columns,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Toggle columns"
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          Weergave
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-[30rem] overflow-auto">
        <DropdownMenuLabel>Selectie</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide(),
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {columns
                  ? columns.find((c) => c.value === column.id)?.label ||
                    column.id
                  : column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
