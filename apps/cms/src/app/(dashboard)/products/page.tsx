"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { ActionEnum, EntityEnum } from "types/permissions";

import type { ProductCategory } from "@acme/db";
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
import { formatter, useHasPermissions } from "~/lib/utils";
import { api } from "~/trpc/react";

const title = "Producten";
const entity = EntityEnum.PRODUCT;

interface Column {
  id: number;
  createdAt: string;
  slug: string;
  title: string;
  description: string;
  price: string;
  stock: number;
  category: ProductCategory;
  categoryId: number;
}

interface Option {
  label: string;
  value: string;
}

const ProductsPage = () => {
  const searchParams = useSearchParams();

  const page = +(searchParams.get("page") || 10);
  const perPage = +(searchParams.get("per_page") || 10);
  const sort = searchParams.get("sort");

  const categoryIds = searchParams.get("category");

  const [products] = api.product.list.useSuspenseQuery({
    page,
    sort: sort || undefined,
    perPage,
    ...(categoryIds && {
      categoryIds: categoryIds.split(".").map((p) => +p),
    }),
  });

  const [categories] = api.productCategory.all.useSuspenseQuery();

  const [totalProducts] = api.product.count.useSuspenseQuery();

  const deleteProduct = api.product.delete.useMutation();

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

  const [canCreate] = useHasPermissions([entity, ActionEnum.CREATE]);

  const data = React.useMemo<Column[]>(
    () =>
      products.map((product) => ({
        id: product.id,
        slug: product.slug ?? "",
        title: product.title ?? "",
        description: product.description ?? "",
        category: product.category,
        categoryId: product.categoryId,
        price: product.price ?? "",
        stock: product.stock ?? "",
        createdAt: product.createdAt
          ? format(new Date(product.createdAt), "dd-LL-yyyy, hh:mm")
          : "",
      })) as Column[],
    [products],
  );

  const onDelete = async (id: string | number) => {
    await deleteProduct.mutateAsync(id as number);
  };

  const columns = DataTableColumnDefs<Column>({
    columns: [
      { label: "Titel", name: "title" },
      { label: "Slug", name: "slug" },
      { label: "Beschrijving", name: "description" },
      {
        label: "Categorie",
        name: "categoryId",
        cell: ({ row }) => (
          <Badge variant="outline">{row.original.category.title}</Badge>
        ),
      },
      {
        label: "Prijs",
        name: "price",
        cell: ({ row }) => <code>{formatter.format(+row.original.price)}</code>,
      },
      { label: "Voorraad", name: "stock" },
      { label: "Aangemaakt", name: "createdAt" },
    ],
    entity: entity,
    onEdit: (id: number | string) => router.push(`${pathname}/${id}`),
  });

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount: totalProducts[0]
      ? Math.ceil(+totalProducts[0]?.count / perPage)
      : 1,
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
    </>
  );
};

export default ProductsPage;
