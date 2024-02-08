"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import {
  ActionEnum,
  EntityEnum,
  permissionActions,
  permissionEntities,
} from "types/permissions";

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
import { useDataTable } from "~/hooks/use-data-table";
import { formatCreatedAt, useHasPermissions } from "~/lib/utils";
import { api } from "~/trpc/react";

const title = "Rollen";
const entity = EntityEnum.ROLE;

interface Column {
  id: number;
  createdAt: string;
  name: string;
  permissions: string;
  description: string;
}

interface Option {
  label: string;
  value: string;
}

const RolesPage = ({ searchParams }) => {
  const page = +(searchParams.page || 1);
  const perPage = +(searchParams.per_page || 10);
  const sort = searchParams.sort;

  const permissionIds = searchParams.permissions;

  const [roles] = api.role.list.useSuspenseQuery({
    page,
    sort: sort || undefined,
    perPage,
    ...(permissionIds && {
      permissionIds: permissionIds.split(".").map((p) => +p),
    }),
  });

  const [permissions] = api.permission.all.useSuspenseQuery();
  const [totalRoles] = api.role.count.useSuspenseQuery();

  const deleteRole = api.role.delete.useMutation();

  const router = useRouter();
  const pathname = usePathname();

  const permissionOptions = useMemo(
    () =>
      (
        permissions?.map(({ id, entity, action }) => ({
          label: `${permissionEntities.find(({ value }) => value === entity)?.label || "-"} - ${permissionActions.find(({ value }) => value === action)?.label || "-"}`,
          value: String(id),
        })) || []
      ).sort((a, b) => a.label.localeCompare(b.label)) as Option[],
    [permissions],
  );

  const filterableColumns: DataTableFilterableColumn<Column>[] = React.useMemo(
    () => [
      {
        id: "permissions",
        title: "Recht",
        options: permissionOptions,
      },
    ],
    [permissionOptions],
  );

  const [canCreate] = useHasPermissions([entity, ActionEnum.CREATE]);

  const data = React.useMemo<Column[]>(
    () =>
      roles.map((role) => ({
        id: role.id,
        name: role.name ?? "",
        description: role.description,
        permissions:
          role.permissions.length === permissions.length
            ? "Alles"
            : String(role.permissions.length),
        createdAt: formatCreatedAt(role.createdAt),
      })) as Column[],
    [roles, permissions.length],
  );

  const onDelete = async (id: string | number) => {
    await deleteRole.mutateAsync(id as number);
  };

  const columns = DataTableColumnDefs<Column>({
    columns: [
      { label: "Naam", name: "name" },
      { label: "Beschrijving", name: "description" },
      { label: "Rechten", name: "permissions" },
      { label: "Aangemaakt", name: "createdAt" },
    ],
    entity: entity,
    onEdit: (id: number | string) => router.push(`${pathname}/${id}`),
  });

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount: totalRoles[0] ? Math.ceil(+totalRoles[0]?.count / perPage) : 1,
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
    </>
  );
};

export default RolesPage;
