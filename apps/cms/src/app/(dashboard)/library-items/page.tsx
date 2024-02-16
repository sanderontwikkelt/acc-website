"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { ActionEnum, EntityEnum } from "types/permissions";

import type { LibraryCategory } from "@acme/db";
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
import { formatCreatedAt, useHasPermissions } from "~/lib/utils";
import { api } from "~/trpc/react";

const title = "Bibliotheek";
const entity = EntityEnum.LIBRARY;

interface Column {
  id: number;
  createdAt: string;
  slug: string;
  title: string;
  category: LibraryCategory;
  categoryId: number;
}

interface Option {
  label: string;
  value: string;
}

const LibrariesPage = ({ searchParams }) => {
  const page = +(searchParams.page || 1);
  const perPage = +(searchParams.per_page || 10);
  const sort = searchParams.sort;

  const categoryIds = searchParams.category;

  const [libraries] = api.library.list.useSuspenseQuery({
    page,
    sort: sort || undefined,
    perPage,
    ...(categoryIds && {
      categoryIds: categoryIds.split(".").map((p) => +p),
    }),
  });

  const [categories] = api.libraryCategory.all.useSuspenseQuery();

  const [totalLibraries] = api.library.count.useSuspenseQuery();

  const deleteLibrary = api.library.delete.useMutation();

  const router = useRouter();
  const pathname = usePathname();

  const categoryOptions = useMemo(
    () =>
      (categories?.map(({ id, title }) => ({
        label: title,
        value: String(id),
      })) || []) as Option[],
    [categories],
  );

  const filterableColumns: DataTableFilterableColumn<Column>[] = React.useMemo(
    () => [
      {
        id: "categoryId",
        title: "Categoriën",
        options: categoryOptions,
      },
    ],
    [categoryOptions],
  );

  const [canCreate, canViewCategories] = useHasPermissions([entity, ActionEnum.CREATE], [EntityEnum.LIBRARYCATEGORY, ActionEnum.FIND]);

  const data = React.useMemo<Column[]>(
    () =>
      libraries.map((library) => ({
        id: library.id,
        slug: library.slug ?? "",
        title: library.title ?? "",
        category: {
          ...library.category,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        categoryId: library.categoryId,
        createdAt: formatCreatedAt(library.createdAt),
        updatedAt: formatCreatedAt(library.updatedAt),
      })) as Column[],
    [libraries],
  );

  const onDelete = async (id: string | number) => {
    await deleteLibrary.mutateAsync(id as number);
  };

  const columns = DataTableColumnDefs<Column>({
    columns: [
      { label: "Titel", name: "title" },
      { label: "Slug", name: "slug" },
      {
        label: "Categorie",
        name: "categoryId",
        cell: ({ row }) =>
          row.original.category ? (
            <Badge variant="outline">{row.original.category.title}</Badge>
          ) : (
            "Geen"
          ),
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
    pageCount: totalLibraries[0]
      ? Math.ceil(+totalLibraries[0]?.count / perPage)
      : 1,
    filterableColumns,
  });

  return (
    <>
      <Heading
        title={`${title} (${data?.length})`}
        description={`Een lijst met alle ${title.toLowerCase()} binnen jouw toegang.`}
      >
        <div className="flex space-x-2">

        {canViewCategories && (
          <Link href="/library-categories" className={buttonVariants({ variant: 'outline'})}>
            Categorieën
          </Link>
        )}
        {canCreate && (
          <Link href={`${pathname}/new`} className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" /> Toevoegen
          </Link>
        )}
        </div>
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

export default LibrariesPage;
