import type { Table } from "@tanstack/react-table";
import * as React from "react";
import { unstable_noStore as noStore } from "next/cache";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@acme/ui";

type Action = (id: string | number) => Promise<void>;

export function deleteSelectedRows<Column>(
  table: Table<Column & { id: string | number }>,
  onDelete: Action,
  event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
) {
  event?.preventDefault();
  const selectedRows = table.getFilteredSelectedRowModel().rows as {
    original: { id: string | number };
  }[];

  noStore();
  return toast.promise(
    Promise.all(selectedRows.map(async (row) => onDelete(row.original.id))),
    {
      loading: "Verwijderen..",
      success: () => {
        return "Succesvol verwijderd";
      },
      error: (err: unknown) => {
        console.error(err);
        return "Verwijderen mislukt.";
      },
    },
  );
}

export function TableFloatingBarContent<Schema>(
  table: Table<Schema & { id: string | number }>,
  onDelete?: Action,
) {
  return onDelete ? (
    <div className="justify-between gap-2 align-middle">
      <Button
        title="Delete"
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        data-pw="selected-rows-delete"
        onClick={(event) => {
          table.toggleAllPageRowsSelected(false);
          deleteSelectedRows<Schema>(table, onDelete, event);
        }}
      >
        <TrashIcon className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Verwijderen</span>
      </Button>
    </div>
  ) : null;
}
