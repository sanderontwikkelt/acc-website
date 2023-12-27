import { format } from "date-fns"

import prismadb from "@/lib/prismadb"

import { UserClient } from "./components/client"
import { UserColumn } from "./components/columns"

export const revalidate = 1

export const dynamic = "force-dynamic"

const UsersPage = async () => {
  const users = await prismadb.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      roles: true,
    },
  })

  const formattedUsers: UserColumn[] = users.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    roles: item.roles.map(({ name }) => name).join(", "),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <UserClient data={formattedUsers} />
      </div>
    </div>
  )
}

export default UsersPage