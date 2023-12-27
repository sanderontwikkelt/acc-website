"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"

import { ActionEnum, EntityEnum } from "@/types/permissions"
import { useHasPermissions } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { UserColumn, columns } from "./columns"

interface UserClientProps {
  data: UserColumn[]
}

export const UserClient: React.FC<UserClientProps> = ({ data }) => {
  const router = useRouter()
  const [canCreate] = useHasPermissions([EntityEnum.USER, ActionEnum.CREATE])

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Gebruikers (${data.length})`}
          description="Beheer gebruikers."
        >
          {canCreate && (
            <Button onClick={() => router.push(`/users/new`)}>
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
