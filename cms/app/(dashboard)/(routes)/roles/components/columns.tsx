"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type RoleColumn = {
  id: string
  name: string
  description?: string
  createdAt: string
}

export const columns: ColumnDef<RoleColumn>[] = [
  {
    accessorKey: "name",
    header: "Naam",
  },
  {
    accessorKey: "description",
    header: "Beschrijving",
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
