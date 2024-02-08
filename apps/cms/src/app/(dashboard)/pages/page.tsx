"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { ActionEnum, EntityEnum } from "types/permissions";

import type { User } from "@acme/db";
import { buttonVariants } from "@acme/ui";

import type { DataTableFilterableColumn } from "~/components/ui/data-table/data-table-types";
import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import { DataTable } from "~/components/ui/data-table/data-table";
import { DataTableColumnDefs } from "~/components/ui/data-table/data-table-column-def";
import {
  deleteSelectedRows,
  TableFloatingBarContent,
} from "~/components/ui/data-table/table-actions";
import { Heading } from "~/components/ui/heading";
import { useDataTable } from "~/hooks/use-data-table";
import { formatCreatedAt, formatter, useHasPermissions } from "~/lib/utils";
import { api } from "~/trpc/react";

const title = "Pagina's";
const entity = EntityEnum.PAGE;

interface Column {
  id: number;
  createdAt: string;
  pathname: string;
  name: string;
  concept: number;
  createdBy: User;
  updatedBy: User;
}

interface Option {
  label: string;
  value: string;
}

const PagesPage = () => {
  const searchParams = useSearchParams();

  const page = +(searchParams.get("page") || 10);
  const perPage = +(searchParams.get("per_page") || 10);
  const sort = searchParams.get("sort");

  const [pages] = api.page.list.useSuspenseQuery({
    page,
    sort: sort || undefined,
    perPage,
  });

  const [totalPages] = api.page.count.useSuspenseQuery();

  const deletePage = api.page.delete.useMutation();

  const router = useRouter();
  const pathname = usePathname();

  const [canCreate] = useHasPermissions([entity, ActionEnum.CREATE]);

  const data = React.useMemo<Column[]>(
    () =>
      pages.map((page) => ({
        id: page.id,
        name: page.name ?? "",
        pathname: page.pathname ?? "",
        concept: page.concept ?? 0,
        createdBy: {
          ...(page.createdBy as User),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        updatedBy: {
          ...(page.updatedBy as User),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        createdAt: formatCreatedAt(page.createdAt),
        updatedAt: formatCreatedAt(page.updatedAt),
      })) as Column[],
    [pages],
  );

  const onDelete = async (id: string | number) => {
    await deletePage.mutateAsync(id as number);
  };

  const columns = DataTableColumnDefs<Column>({
    columns: [
      { label: "Naam", name: "name" },
      { label: "Padnaam", name: "pathname" },
      {
        label: "Status",
        name: "concept",
        cell: ({ row }) => (
          <Badge variant={row.original.concept ? "default" : "outline"}>
            {row.original.concept ? "Geplubliseerd" : "Concept"}
          </Badge>
        ),
      },
      {
        label: "Aangemaakt door",
        name: "createdBy",
        cell: ({ row }) =>
          row.original.createdBy ? (
            <Link
              href={`/users/${row.original.createdBy.id}`}
            >{`${row.original.createdBy.name}`}</Link>
          ) : null,
      },
      {
        label: "Aangepast door",
        name: "updatedBy",
        cell: ({ row }) =>
          row.original.updatedBy ? (
            <Link
              href={`/users/${row.original.updatedBy.id}`}
            >{`${row.original.updatedBy.name}`}</Link>
          ) : null,
      },
      { label: "Aangemaakt", name: "createdAt" },
      { label: "Aangepast", name: "updatedAt" },
    ],
    entity: entity,
    onEdit: (id: number | string) => router.push(`${pathname}/${id}`),
  });

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount: totalPages[0] ? Math.ceil(+totalPages[0]?.count / perPage) : 1,
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

export default PagesPage;
