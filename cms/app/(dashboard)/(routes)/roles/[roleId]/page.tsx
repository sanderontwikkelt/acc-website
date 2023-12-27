import prismadb from "@/lib/prismadb"

import { RoleForm } from "./components/role-form"

const RolePage = async ({ params }: { params: { roleId: string } }) => {
  const role = await prismadb.role.findUnique({
    where: {
      id: params.roleId,
    },
    include: {
      permissions: true,
    },
  })

  const permissions = await prismadb.permission.findMany()

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <RoleForm
          initialData={
            role
              ? {
                  ...role,
                  permissionIds: role?.permissions.map(({ id }) => id) || [],
                }
              : null
          }
          permissions={permissions}
        />
      </div>
    </div>
  )
}

export default RolePage
