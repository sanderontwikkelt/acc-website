import { format } from "date-fns"

import prismadb from "@/lib/prismadb"

import { RoleClient } from "./components/client"
import { RoleColumn } from "./components/columns"

export const dynamic = "force-dynamic"

const rolePage = async () => {
  const role = await prismadb.role.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedrole: RoleColumn[] = role.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description || undefined,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <RoleClient data={formattedrole} />
      </div>
    </div>
  )
}

export default rolePage
