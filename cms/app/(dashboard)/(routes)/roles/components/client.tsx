"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"

import { ActionEnum, EntityEnum } from "@/types/permissions"
import { useHasPermissions } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { RoleColumn, columns } from "./columns"

interface RoleClientProps {
  data: RoleColumn[]
}

export const RoleClient: React.FC<RoleClientProps> = ({ data }) => {
  const router = useRouter()
  const [canCreate] = useHasPermissions([EntityEnum.ROLE, ActionEnum.CREATE])

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Rollen (${data.length})`} description="Beheer rollen.">
          {canCreate && (
            <Button onClick={() => router.push(`/roles/new`)}>
              <Plus className="mr-2 h-4 w-4" /> Toevoegen
            </Button>
          )}
        </Heading>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  )
}
