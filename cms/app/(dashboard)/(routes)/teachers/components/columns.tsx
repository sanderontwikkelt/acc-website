"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type TeacherColumn = {
  id: string
  name: string
  title: string
  createdAt: string
}

export const columns: ColumnDef<TeacherColumn>[] = [
  {
    accessorKey: "name",
    header: "Naam",
  },
  {
    accessorKey: "title",
    header: "Titel/beroep",
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
