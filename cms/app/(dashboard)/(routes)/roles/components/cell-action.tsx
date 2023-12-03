'use client'

import { RoleColumn } from './columns'
import { AlertModal } from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useHasPermissions } from '@/lib/utils'
import { ActionEnum, EntityEnum } from '@/types/permissions'
import axios from 'axios'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface CellActionProps {
  data: RoleColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [canUpdate, canDelete] = useHasPermissions(
    [EntityEnum.ROLE, ActionEnum.UPDATE],
    [EntityEnum.ROLE, ActionEnum.DELETE]
  )

  const onConfirm = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/roles/${data.id}`)
      toast.success('Rol verwijderd.')
      router.refresh()
    } catch (error) {
      toast.error('Zorg dat je eerst deze rol van alle gebruikers verwijderd.')
    } finally {
      setOpen(false)
      setLoading(false)
    }
  }

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success('Rol ID gekopiëerd naar klembord.')
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Acties</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className='mr-2 h-4 w-4' /> Kopiëer ID
          </DropdownMenuItem>
          {canUpdate && (
            <DropdownMenuItem onClick={() => router.push(`/roles/${data.id}`)}>
              <Edit className='mr-2 h-4 w-4' /> Bewerken
            </DropdownMenuItem>
          )}
          {canDelete && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className='mr-2 h-4 w-4' /> Verwijderen
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
