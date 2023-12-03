'use client'

import { CellAction } from './cell-action'
import { ColumnDef } from '@tanstack/react-table'

export type PageColumn = {
  id: string
  name: string
  pathname: string
  concept: string
  createdAt: string
}

export const columns: ColumnDef<PageColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Naam',
  },
  {
    accessorKey: 'pathname',
    header: 'Padnaam',
  },
  {
    accessorKey: 'concept',
    header: 'Concept',
  },
  {
    accessorKey: 'createdAt',
    header: 'Aangemaakt',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
