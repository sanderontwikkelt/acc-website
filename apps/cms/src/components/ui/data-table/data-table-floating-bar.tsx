"use client";

import type { Table } from "@tanstack/react-table";
import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";

interface DataTableFloatingBarProps<TData>
  extends React.HTMLAttributes<HTMLElement> {
  table: Table<TData>;
}

export function DataTableFloatingBar<TData>({
  table,
  children,
  className,
  ...props
}: DataTableFloatingBarProps<TData>) {
  if (table.getFilteredSelectedRowModel().rows.length <= 0) return null;
  return (
    <div
      className={cn(
        "mx-auto flex w-fit items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-white",
        className,
      )}
      {...props}
    >
      <Button
        aria-label="Clear selection"
        title="Clear"
        className="h-auto bg-transparent p-1 text-white hover:bg-zinc-700"
        onClick={() => table.toggleAllRowsSelected(false)}
      >
        <Cross2Icon className="h-4 w-4" aria-hidden="true" />
      </Button>
      {table.getFilteredSelectedRowModel().rows.length} rij(en) geselecteerd.
      {children}
    </div>
  );
}
