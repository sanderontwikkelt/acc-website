"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import type { User } from "@acme/db";

import { DataTableColumnHeader } from "~/components/ui/data-table/data-table-column-header";

export function fetchUsersTableColumnDefs(): ColumnDef<User & { role }>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Naam" />
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="E-mail" />
      ),
    },
    {
      accessorKey: "roleId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rol" />
      ),
      cell: ({ row }) => row.original.role?.name || "",
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Aangemaakt" />
      ),
    },
  ];
}
