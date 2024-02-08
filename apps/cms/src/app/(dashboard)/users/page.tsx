"use client";

import type { Row } from "@tanstack/react-table";
import React, { Suspense, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { ActionEnum, EntityEnum } from "types/permissions";

import type { Role } from "@acme/db";
import { buttonVariants } from "@acme/ui";

import type { DataTableFilterableColumn } from "~/components/ui/data-table/data-table-types";
import { Card } from "~/components/ui/card";
import { DataTable } from "~/components/ui/data-table/data-table";
import { DataTableColumnDefs } from "~/components/ui/data-table/data-table-column-def";
import {
  deleteSelectedRows,
  TableFloatingBarContent,
} from "~/components/ui/data-table/table-actions";
import { Heading } from "~/components/ui/heading";
import Loading from "~/components/ui/loading";
import { useDataTable } from "~/hooks/use-data-table";
import { formatCreatedAt, useHasPermissions } from "~/lib/utils";
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

const UsersPage = ({ searchParams }) => {
  const page = +(searchParams.page || 1);
  const perPage = +(searchParams.per_page || 10);
  const sort = searchParams.sort;
  const roleIds = searchParams.roleId;

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
  const pathname = usePathname();

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
        role: { ...user.role, createdAt: new Date(), updatedAt: new Date() },
        createdAt: formatCreatedAt(user.createdAt),
        updatedAt: formatCreatedAt(user.updatedAt),
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
      { label: "Aangepast", name: "updatedAt" },
    ],
    entity: entity,
    onEdit: (id: string | number) => router.push(`${pathname}/${id}`),
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
          <Link href={`${pathname}/new`} className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" /> Toevoegen
          </Link>
        )}
      </Heading>
      <Card>
        <Suspense fallback={<Loading />}>
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
        </Suspense>
      </Card>
    </>
  );
};

export default UsersPage;
