"use client";

import type { Row } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { ActionEnum, EntityEnum } from "types/permissions";

import type { Role, User } from "@acme/db";
import { Button } from "@acme/ui";
import { userFormSchema } from "@acme/validators";

import type { DataTableFilterableColumn } from "~/components/ui/data-table/data-table-types";
import { Card } from "~/components/ui/card";
import { DataTable } from "~/components/ui/data-table/data-table";
import { DataTableColumnDefs } from "~/components/ui/data-table/data-table-column-def";
import {
  deleteSelectedRows,
  TableFloatingBarContent,
} from "~/components/ui/data-table/table-actions";
import DetailDrawer, { TypeEnum } from "~/components/ui/detail-drawer";
import { Heading } from "~/components/ui/heading";
import { useDataTable } from "~/hooks/use-data-table";
import { useHasPermissions } from "~/lib/utils";
import { api } from "~/trpc/react";

const title = "Gebruikers";

const UsersPage = () => {
  const searchParams = useSearchParams();
  const [showUser, setShowUser] = useState<string | null>(null);

  const page = +(searchParams.get("page") || 10);
  const perPage = +(searchParams.get("per_page") || 10);
  const sort = searchParams.get("sort");

  const [users] = api.user.all.useSuspenseQuery<{ user: User; role: Role }[]>({
    page,
    sort: String(sort),
    perPage,
  });
  const [totalUsers] = api.user.count.useSuspenseQuery();
  const [roles] = api.role.all.useSuspenseQuery();

  const router = useRouter();
  const { data: user, loading } = api.user.byId.useQuery({
    id: showUser || "",
  });

  const roleOptions = useMemo(
    () =>
      (roles?.map(({ id, name }) => ({
        label: name || "",
        value: String(id),
      })) || []) as { label: string; value: string }[],
    [roles],
  );

  const [canCreate] = useHasPermissions([EntityEnum.USER, ActionEnum.CREATE]);

  interface Column {
    id: string;
    createdAt: string;
    name: string;
    email: string;
    roleId: number;
    role: Role;
  }

  const filterableColumns: DataTableFilterableColumn<Column>[] = React.useMemo(
    () => [
      {
        id: "roleId",
        title: "Rol",
        options: roleOptions,
      },
    ],
    [roleOptions],
  );

  const data = React.useMemo<Column[]>(
    () =>
      users.map(({ user, role }) => ({
        id: user.id,
        name: user.name ?? "",
        email: user.email,
        roleId: user.roleId,
        role,
        createdAt: user.createdAt
          ? format(new Date(user.createdAt as Date), "dd-LL-yyyy, hh:mm")
          : "",
      })) as Column[],
    [users],
  );

  const onDelete = async (id: string) => {
    await api.user.delete.useMutation().mutateAsync(id);
  };

  const columns = DataTableColumnDefs<Column>({
    columns: [
      { label: "Naam", name: "name" },
      { label: "E-mail", name: "email" },
      {
        label: "Rol",
        name: "roleId",
        cell: ({ row }: { row: Row<Column> }) => row.original.role?.name,
      },
      { label: "Aangemaakt", name: "createdAt" },
    ],
    onDelete,
    onEdit: (id: string) => setShowUser(id),
  });

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount: totalUsers[0] ? Math.ceil(+totalUsers[0]?.count / perPage) : 1,
    filterableColumns,
  });

  const formFields = useMemo(
    () => [
      { name: "name", label: "Naam", type: TypeEnum.INPUT },
      { name: "email", label: "E-mail", type: TypeEnum.EMAIL },
      {
        name: "roleId",
        label: "Rol",
        type: TypeEnum.SELECT,
        options: roleOptions,
      },
    ],
    [roleOptions],
  );

  const isDetails = !!(showUser && showUser !== "new");

  return (
    <>
      <Heading
        title={`${title} (${data?.length})`}
        description={`Een lijst met alle ${title.toLowerCase()} binnen jouw toegang.`}
      >
        {canCreate && (
          <Button onClick={() => setShowUser("new")}>
            <Plus className="mr-2 h-4 w-4" /> Toevoegen
          </Button>
        )}
      </Heading>
      <Card className="flex-grow">
        <DataTable
          dataTable={dataTable}
          columns={columns}
          filterableColumns={filterableColumns}
          floatingBarContent={TableFloatingBarContent(dataTable, onDelete)}
          deleteRowsAction={async (event) => {
            deleteSelectedRows(dataTable, onDelete, event);
            router.refresh();
          }}
        />
      </Card>
      <DetailDrawer<User>
        title={isDetails ? "Gebruiker aanpassen" : "Gebruiker toevoegen"}
        description={
          isDetails
            ? "Bekijk gebruiker gegevens en pas eventueel aan"
            : "Maak een nieuw gebruiker aan"
        }
        id={showUser || undefined}
        onClose={() => setShowUser(null)}
        entity={EntityEnum.USER}
        initialData={user || { name: "", email: "", roleId: 0 }}
        formFields={formFields}
        loading={loading}
        formSchema={userFormSchema}
        transformData={(data) => {
          if (data.roleId) data.roleId = +data.roleId;
          return data;
        }}
      />
    </>
  );
};

export default UsersPage;
