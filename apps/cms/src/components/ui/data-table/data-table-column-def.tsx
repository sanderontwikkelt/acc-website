"use client";

import type { Column, ColumnDef, Row, RowData } from "@tanstack/react-table";
import type { ReactNode } from "react";
import type { EntityEnum } from "types/permissions";
import { useState } from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@acme/ui";

import { AlertModal } from "~/components/modals/alert-modal";
import { DataTableColumnHeader } from "~/components/ui/data-table/data-table-column-header";
import { useMutation } from "~/hooks/use-mutation";

export function DataTableColumnDefs<Schema = { id: string }>({
  columns,
  entity,
  canEdit,
  canDelete,
  onEdit,
  actions,
}: {
  columns: {
    label: string;
    name: string;
    cell?: ({ row }: { row: Row<Schema> }) => ReactNode;
    enableSorting?: boolean;
  }[];
  entity: EntityEnum;
  canDelete?: (row: RowData) => boolean;
  canEdit?: (row: RowData) => boolean;
  onEdit?: (id: string | number) => void;
  actions?: ({ row }: { row: Row<Schema> }) => ReactNode;
}): ColumnDef<Schema, unknown>[] {
  const [isDeleting, setIsDeleting] = useState<number | string | null>(null);

  const onDelete = useMutation(entity, "delete");

  const handleDelete = async (row: Row<Schema & { id: string }>) => {
    if (row.original.id === isDeleting) {
      row.toggleSelected(false);
      setIsDeleting(null);
      await onDelete(row.original.id);
    }
  };
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
          data-pw="row-checkbox"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...columns.map(({ name, label, cell, ...props }) => ({
      accessorKey: name,
      header: ({ column }: { column: Column<Schema> }) => (
        <DataTableColumnHeader column={column} title={label} />
      ),
      ...(cell && { cell }),
      ...props,
    })),
    {
      id: "actions",
      cell: ({ row }) => {
        const id = (row.original as { id: string }).id;
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              {
                <DropdownMenuContent align="end">
                  {!!actions && actions({ row })}
                  {!!onEdit && (!canEdit || canEdit(row)) && (
                    <DropdownMenuItem onClick={() => onEdit(id)}>
                      Aanpassen
                    </DropdownMenuItem>
                  )}
                  {(!canDelete || canDelete(row)) && (
                    <>
                      <DropdownMenuItem onClick={() => setIsDeleting(id)}>
                        Verwijderen
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              }
            </DropdownMenu>
            <AlertModal
              isOpen={isDeleting === id}
              onClose={() => setIsDeleting(null)}
              onConfirm={() =>
                handleDelete(row as Row<Schema & { id: string }>)
              }
              loading={false}
            />
          </>
        );
      },
    },
  ];
}
