"use client";

import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { ActionEnum, EntityEnum } from "types/permissions";

import type { Role, User } from "@acme/db";
import { Button } from "@acme/ui/button";
import { Separator } from "@acme/ui/separator";

import type { DataTableFilterableColumn } from "~/components/ui/data-table/data-table-types";
import { DataTable } from "~/components/ui/data-table/data-table";
import { Heading } from "~/components/ui/heading";
import { useDataTable } from "~/hooks/use-data-table";
import { useHasPermissions } from "~/lib/utils";
import { api } from "~/trpc/react";
import {
  deleteSelectedRows,
  UsersTableFloatingBarContent,
} from "./_components/table-actions";
import { fetchUsersTableColumnDefs } from "./_components/table-column-def";

const title = "Gebruikers";

const UsersPage = () => {
  const searchParams = useSearchParams();
  const page = +(searchParams.get("page") || 10);
  const perPage = +(searchParams.get("per_page") || 10);
  const sort = +(searchParams.get("sort") || 10);
  const [users] = api.user.all.useSuspenseQuery({ page, sort, perPage });
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
    role: Role;
  }

  const filterableColumns: DataTableFilterableColumn<User>[] = React.useMemo(
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
        createdAt: format(new Date(user.createdAt), "dd-LL-yyyy, hh:mm"),
      })),
    [users],
  );

  const columns = React.useMemo<ColumnDef<Column[], unknown>[]>(
    () => fetchUsersTableColumnDefs(),
    [],
  );
  console.log(totalUsers, perPage);
  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount: Math.ceil(+totalUsers[0].count / perPage),
    filterableColumns,
  });

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
        floatingBarContent={UsersTableFloatingBarContent(dataTable)}
        deleteRowsAction={async (event) => {
          deleteSelectedRows(dataTable, event);
          router.refresh();
        }}
      />
    </>
  );
};

export default UsersPage;
