"use client";

import { format } from "date-fns";
import { EntityEnum } from "types/permissions";

import { ListOverview } from "~/components/list-overview";
import { api } from "~/trpc/react";

interface UserColumn {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const UsersPage = () => {
  const [users] = api.user.all.useSuspenseQuery();

  const data = users.map((item) => ({
    id: item.id,
    name: item.name ?? "",
    email: item.email,
    role: item.role?.name ?? "",
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  const columns = [
    {
      accessorKey: "name",
      header: "Naam",
    },
    {
      accessorKey: "email",
      header: "E-mail",
    },
    {
      accessorKey: "role",
      header: "Rollen",
    },
    {
      accessorKey: "createdAt",
      header: "Aangemaakt",
    },
  ];

  return (
    <ListOverview<UserColumn>
      columns={columns}
      data={data}
      entity={EntityEnum.USER}
      title="Gebruikers"
    />
  );
};

export default UsersPage;
