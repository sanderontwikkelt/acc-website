"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type UserColumn = {
  id: string
  name: string
  email: string
  roles: string
  createdAt: string
}

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "name",
    header: "Naam",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "roles",
    header: "Rollen",
  },
  {
    accessorKey: "createdAt",
    header: "Aangemaakt",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
