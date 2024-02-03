"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { ActionEnum, EntityEnum, permissionActions, permissionEntities } from "types/permissions";

import type { Role } from "@acme/db";
import { Button } from "@acme/ui";
import { roleFormSchema } from "@acme/validators";

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

const RolesPage = () => {
  const searchParams = useSearchParams();
  const [id, setId] = useState<number | string | null>(null);

  const page = +(searchParams.get("page") || 10);
  const perPage = +(searchParams.get("per_page") || 10);
  const sort = searchParams.get("sort");

  const [roles] = api.role.list.useSuspenseQuery({
    page,
    sort: sort ? String(sort) : undefined,
    perPage,
  });
  const [permissions] = api.permission.all.useSuspenseQuery();
  const [totalRoles] = api.role.count.useSuspenseQuery();

  const deleteRole = api.role.delete.useMutation();

  const router = useRouter();
  const { data: role, isLoading } = api.role.byId.useQuery({
    id: id && id !== 'new' ? +id : 0,
  });

  const permissionOptions = useMemo(
    () =>
      (permissions?.map(({ id, entity, action }) => ({
        label: `${permissionEntities.find(({ value }) => value === entity)?.label || '-'} - ${permissionActions.find(({ value }) => value === action)?.label || '-'}`,
        value: String(id),
      })) || []).sort((a, b) => a.label.localeCompare(b.label)) as Option[],
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
        permissions: role.permissions.length === permissions.length ? 'Alles' : String(role.permissions.length),
        createdAt: role.createdAt
          ? format(new Date(role.createdAt), "dd-LL-yyyy, hh:mm")
          : "",
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
    onEdit: (id: number | string) => setId(id as number),
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
      <RoleDetailDrawer
        onClose={() => setId(null)}
        id={id}
        {...{ role, isLoading, permissionOptions }}
      />
    </>
  );
};

export default RolesPage;

const RoleDetailDrawer = ({
  id,
  onClose,
  role,
  isLoading,
  permissionOptions,
}: {
  permissionOptions: Option[];
  id: string | number | null;
  isLoading: boolean;
  role?: Role | null;
  onClose: () => void;
}) => {
  const isDetails = !!(id && id !== "new");

  const formFields = useMemo(
    () => [
      { name: "name", label: "Naam", type: TypeEnum.INPUT },
      { name: "description", label: "Beschrijving", type: TypeEnum.EMAIL },
      {
        name: "permissionIds",
        label: "Rechten",
        type: TypeEnum.MULTISELECT,
        options: permissionOptions,
      },
    ],
    [permissionOptions],
  );

  return (
    <DetailDrawer
      title={isDetails ? "Rol aanpassen" : "Rol toevoegen"}
      description={
        isDetails
          ? "Bekijk rol gegevens en pas eventueel aan"
          : "Maak een nieuw rol aan"
      }
      id={id || undefined}
      onClose={onClose}
      entity={entity}
      initialData={role || { name: "", description: "" }}
      formFields={formFields}
      loading={isLoading}
      formSchema={roleFormSchema}
      transformData={(data) => {
        if (data.roleId) data.roleId = +data.roleId;
        return data;
      }}
    />
  );
};
