"use client";

import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { ActionEnum, EntityEnum } from "types/permissions";

import type { Role, User } from "@acme/db";
import { Button } from "@acme/ui/button";

import type { DataTableFilterableColumn } from "~/components/ui/data-table/data-table-types";
import { DataTable } from "~/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "~/components/ui/data-table/data-table-column-header";
import { Heading } from "~/components/ui/heading";
import { useDataTable } from "~/hooks/use-data-table";
import { useHasPermissions } from "~/lib/utils";
import { api } from "~/trpc/react";
import {
  deleteSelectedRows,
  UsersTableFloatingBarContent,
} from "./_components/table-actions";

const title = "Gebruikers";

const UsersPage = () => {
  const searchParams = useSearchParams();
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
  const pathname = usePathname();

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
        options:
          roles.map?.((option) => ({
            label: option.name,
            value: option.id.toString(),
          })) || [],
      },
    ],
    [roles],
  );

  const data = React.useMemo<Column[]>(
    () =>
      users.map(({ user, role }) => ({
        id: user.id,
        name: user.name ?? "",
        email: user.email,
        role,
        createdAt: user.createdAt
          ? format(new Date(user.createdAt as Date), "dd-LL-yyyy, hh:mm")
          : "",
      })) as Column[],
    [users],
  );

  const columns = React.useMemo<ColumnDef<Column, unknown>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Naam" />
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="E-mail" />
        ),
      },
      {
        accessorKey: "roleId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Rol" />
        ),
        cell: ({ row }) => row.original.role?.name || "",
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Aangemaakt" />
        ),
      },
    ],
    [],
  );

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount: totalUsers[0] ? Math.ceil(+totalUsers[0]?.count / perPage) : 1,
    filterableColumns,
  });

  const deleteUser = async (id: string) => {
    await api.user.delete.useMutation().mutateAsync(id);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${title} (${data.length})`}
          description={`Een lijst met alle ${title.toLowerCase()} binnen jouw toegang.`}
        >
          {canCreate && (
            <Button onClick={() => router.push(`${pathname}/new`)}>
              <Plus className="mr-2 h-4 w-4" /> Toevoegen
            </Button>
          )}
        </Heading>
      </div>
      <DataTable
        dataTable={dataTable}
        columns={columns}
        filterableColumns={filterableColumns}
        floatingBarContent={UsersTableFloatingBarContent(dataTable, deleteUser)}
        deleteRowsAction={async (event) => {
          deleteSelectedRows(dataTable, deleteUser, event);
          router.refresh();
        }}
      />
    </>
  );
};

export default UsersPage;
