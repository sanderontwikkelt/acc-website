import prismadb from "@/lib/prismadb"

import { UserForm } from "./components/user-form"

const UserPage = async ({ params }: { params: { userId: string } }) => {
  const user = await prismadb.user.findUnique({
    where: {
      id: params.userId,
    },
    include: {
      roles: true,
    },
  })

  const roles = await prismadb.role.findMany()

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <UserForm
          initialData={
            user
              ? {
                  ...user,
                  roleIds: user?.roles.map(({ id }) => id) || [],
                }
              : null
          }
          roles={roles}
        />
      </div>
    </div>
  )
}

export default UserPage
