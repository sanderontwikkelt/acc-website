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
const entity = EntityEnum.USER;

interface Column {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  roleId: number;
  role: Role;
}

interface Option {
  label: string;
  value: string;
}

const UsersPage = () => {
  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>(null);

  const page = +(searchParams.get("page") || 10);
  const perPage = +(searchParams.get("per_page") || 10);
  const sort = searchParams.get("sort");
  const roleIds = searchParams.get("roleId");

  const [users] = api.user.list.useSuspenseQuery({
    page,
    sort: sort || undefined,
    perPage,
    ...(roleIds && { roleIds: roleIds.split(".").map((p) => +p) }),
  });
  const [totalUsers] = api.user.count.useSuspenseQuery();
  const [roles] = api.role.all.useSuspenseQuery();

  const deleteUser = api.user.delete.useMutation();

  const router = useRouter();
  const { data: user, isLoading } = api.user.byId.useQuery({
    id: id || "",
  });

  const roleOptions = useMemo(
    () =>
      (roles?.map(({ id, name }) => ({
        label: name || "",
        value: String(id),
      })) || []) as Option[],
    [roles],
  );

  const [canCreate] = useHasPermissions([entity, ActionEnum.CREATE]);

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
      users.map((user) => ({
        id: user.id,
        name: user.name ?? "",
        email: user.email,
        roleId: user.roleId,
        role: user.role,
        createdAt: user.createdAt
          ? format(new Date(user.createdAt), "dd-LL-yyyy, hh:mm")
          : "",
      })) as Column[],
    [users],
  );

  const onDelete = async (id: string | number) => {
    await deleteUser.mutateAsync(id as string);
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
    entity: entity,
    onEdit: (id: string | number) => setId(id as string),
  });

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount: totalUsers[0] ? Math.ceil(+totalUsers[0]?.count / perPage) : 1,
    filterableColumns,
  });

  return (
    <>
      <Heading
        title={`${title} (${data?.length})`}
        description={`Een lijst met alle ${title.toLowerCase()} binnen jouw toegang.`}
      >
        {canCreate && (
          <Button onClick={() => setId("new")}>
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
      <UserDetailDrawer
        onClose={() => setId(null)}
        id={id}
        {...{ user, isLoading, roleOptions }}
      />
    </>
  );
};

export default UsersPage;

const UserDetailDrawer = ({
  id,
  onClose,
  user,
  isLoading,
  roleOptions,
}: {
  roleOptions: Option[];
  id: string | null;
  isLoading: boolean;
  user?: User | null;
  onClose: () => void;
}) => {
  const isDetails = !!(id && id !== "new");

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

  return (
    <DetailDrawer
      title={isDetails ? "Gebruiker aanpassen" : "Gebruiker toevoegen"}
      description={
        isDetails
          ? "Bekijk gebruiker gegevens en pas eventueel aan"
          : "Maak een nieuw gebruiker aan"
      }
      id={id || undefined}
      onClose={onClose}
      entity={entity}
      initialData={user || { name: "", email: "", roleId: 0 }}
      formFields={formFields}
      loading={isLoading}
      formSchema={userFormSchema}
      transformData={(data) => {
        if (data.roleId) data.roleId = +data.roleId;
        return data;
      }}
    />
  );
};
