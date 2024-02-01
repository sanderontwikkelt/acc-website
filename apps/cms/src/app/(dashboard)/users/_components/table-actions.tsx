import type { Table } from "@tanstack/react-table";
import * as React from "react";
import { unstable_noStore as noStore } from "next/cache";
import { TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { Button } from "@acme/ui/button";

export function deleteSelectedRows<Schema>(
  table: Table<Schema>,
  event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
) {
  event?.preventDefault();
  const selectedRows = table.getFilteredSelectedRowModel().rows as {
    original: Schema;
  }[];

  noStore();
  return toast.promise(
    Promise.all(
      selectedRows.map(async (row) =>
        deleteUser({
          id: row.original.id,
        }),
      ),
    ),
    {
      loading: "Verwijderen..",
      success: () => {
        return "Succesvol verwijdered";
      },
      error: (err: unknown) => {
        return catchError(err);
      },
    },
  );
}

export function UsersTableFloatingBarContent<Schema>(table: Table<Schema>) {
  return (
    <div className="justify-between gap-2 align-middle">
      <Button
        title="Delete"
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        data-pw="selected-rows-delete"
        onClick={(event) => {
          table.toggleAllPageRowsSelected(false);
          deleteSelectedRows?.(table, event);
        }}
      >
        <TrashIcon className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Verwijderen</span>
      </Button>
    </div>
  );
}
