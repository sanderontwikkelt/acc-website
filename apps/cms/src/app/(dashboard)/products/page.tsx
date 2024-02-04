"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import {
  ActionEnum,
  EntityEnum,
} from "types/permissions";

import type { Product, productCategory } from "@acme/db";
import { Button } from "@acme/ui";
import { productFormSchema } from "@acme/validators";

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
import { formatter, useHasPermissions } from "~/lib/utils";
import { api } from "~/trpc/react";
import { Badge } from "~/components/ui/badge";

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
  category: productCategory;
  categoryId: number;
}

interface Option {
  label: string;
  value: string;
}

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const [id, setId] = useState<number | string | null>(null);

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
  const { data: product, isLoading } = api.product.byId.useQuery({
    id: id && id !== "new" ? +id : 0,
  });

  const categoryOptions = useMemo(
    () =>
      (
        categories?.map(({ id, title }) => ({
          label: title,
          value: String(id),
        })) || []
      ) as Option[],
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
      { label: "Naam", name: "name" },
      { label: "Slug", name: "slug" },
      { label: "Beschrijving", name: "description" },
      { label: "category", name: "category", cell: ({row})=> <Badge variant="outline">{row.original.category.title}</Badge> },
      { label: "Prijs", name: "price", cell: ({row})=> <code>{formatter.format(+row.original.price)}</code> },
      { label: "Voorraad", name: "stock" },
      { label: "Aangemaakt", name: "createdAt" },
    ],
    entity: entity,
    onEdit: (id: number | string) => setId(id as number),
  });

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount: totalProducts[0] ? Math.ceil(+totalProducts[0]?.count / perPage) : 1,
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
      <ProductDetailDrawer
        onClose={() => setId(null)}
        {...{ id, product, isLoading, categoryOptions }}
      />
    </>
  );
};

export default ProductsPage;

const ProductDetailDrawer = ({
  id,
  onClose,
  product,
  isLoading,
  categoryOptions,
}: {
  categoryOptions: Option[];
  id: string | number | null;
  isLoading: boolean;
  product?: Product | null;
  onClose: () => void;
}) => {
  const isDetails = !!(id && id !== "new");

  const formFields = useMemo(
    () => [
      { name: "title", label: "Titel", type: TypeEnum.INPUT },
      { name: "description", label: "Beschrijving", type: TypeEnum.INPUT },
      { name: "slug", label: "Slug", type: TypeEnum.INPUT },
      { name: "price", label: "Prijs", type: TypeEnum.INPUT, inputProps: { type: 'number', min: 0, max: 50_000, step: 0.01 } },
      { name: "stock", label: "Standaard voorraad", type: TypeEnum.INPUT, inputProps: { type: 'number', min: 0, max: 50_000, step: 0.01 } },
      {
        name: "categoryId",
        label: "Categorie",
        type: TypeEnum.SELECT,
        options: categoryOptions,
      },
    ],
    [categoryOptions],
  );

  return (
    <DetailDrawer
      title={isDetails ? "Product aanpassen" : "Product toevoegen"}
      description={
        isDetails
          ? "Bekijk product gegevens en pas eventueel aan"
          : "Maak een nieuw product aan"
      }
      id={id || undefined}
      onClose={onClose}
      entity={entity}
      initialData={product || { name: "", description: "" }}
      formFields={formFields}
      loading={isLoading}
      formSchema={productFormSchema}
      transformData={(data) => {
        if (data.productId) data.productId = +data.productId;
        return data;
      }}
    />
  );
};
