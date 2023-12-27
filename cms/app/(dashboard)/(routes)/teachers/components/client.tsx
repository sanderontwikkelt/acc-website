"use client"

import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"

import { ActionEnum, EntityEnum } from "@/types/permissions"
import { useHasPermissions } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { TeacherColumn, columns } from "./columns"

interface TeacherClientProps {
  data: TeacherColumn[]
}

export const TeacherClient: React.FC<TeacherClientProps> = ({ data }) => {
  const router = useRouter()
  const [canCreate] = useHasPermissions([EntityEnum.TEACHER, ActionEnum.CREATE])

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Docenten (${data.length})`}
          description="Beheer docenten."
        >
          {canCreate && (
            <Button onClick={() => router.push(`/teachers/new`)}>
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
