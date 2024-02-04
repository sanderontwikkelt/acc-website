"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import {
  ActionEnum,
  EntityEnum,
} from "types/permissions";

import type { ProductCategory } from "@acme/db";
import { Button } from "@acme/ui";
import { productCategoryFormSchema } from "@acme/validators";

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
const entity = EntityEnum.PRODUCTCATEGORY;

interface Column {
  id: number;
  createdAt: string;
  title: string;
}

interface Option {
  label: string;
  value: string;
}

const ProductCategoriesPage = () => {
  const searchParams = useSearchParams();
  const [id, setId] = useState<number | string | null>(null);

  const page = +(searchParams.get("page") || 10);
  const perPage = +(searchParams.get("per_page") || 10);
  const sort = searchParams.get("sort");

  const permissionIds = searchParams.get("permissions");

  const [productCategories] = api.productCategory.list.useSuspenseQuery({
    page,
    sort: sort || undefined,
    perPage,
    ...(permissionIds && {
      permissionIds: permissionIds.split(".").map((p) => +p),
    }),
  });

  const [totalProductCategories] = api.productCategory.count.useSuspenseQuery();

  const deleteProductCategory = api.productCategory.delete.useMutation();

  const router = useRouter();
  const { data: productCategory, isLoading } = api.productCategory.byId.useQuery({
    id: id && id !== "new" ? +id : 0,
  });

  const [canCreate] = useHasPermissions([entity, ActionEnum.CREATE]);

  const data = React.useMemo<Column[]>(
    () =>
      productCategories.map((productCategory) => ({
        id: productCategory.id,
        title: productCategory.title ?? "",
        createdAt: productCategory.createdAt
          ? format(new Date(productCategory.createdAt), "dd-LL-yyyy, hh:mm")
          : "",
      })) as Column[],
    [productCategories],
  );

  const onDelete = async (id: string | number) => {
    await deleteProductCategory.mutateAsync(id as number);
  };

  const columns = DataTableColumnDefs<Column>({
    columns: [
      { label: "Titel", name: "title" },
      { label: "Aangemaakt", name: "createdAt" },
    ],
    entity: entity,
    onEdit: (id: number | string) => setId(id as number),
  });

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount: totalProductCategories[0] ? Math.ceil(+totalProductCategories[0]?.count / perPage) : 1,
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
          floatingBarContent={TableFloatingBarContent(dataTable, onDelete)}
          deleteRowsAction={async (event) => {
            deleteSelectedRows(dataTable, onDelete, event);
            router.refresh();
          }}
        />
      </Card>
      <ProductCategoryDetailDrawer
        onClose={() => setId(null)}
        {...{ id, productCategory, isLoading }}
      />
    </>
  );
};

export default ProductCategoriesPage;

const ProductCategoryDetailDrawer = ({
  id,
  onClose,
  productCategory,
  isLoading,
}: {
  id: string | number | null;
  isLoading: boolean;
  productCategory?: ProductCategory | null;
  onClose: () => void;
}) => {
  const isDetails = !!(id && id !== "new");

  const formFields = useMemo(
    () => [
      { name: "title", label: "Titel", type: TypeEnum.INPUT },
    ],
    [],
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
      initialData={productCategory || { name: "", description: "" }}
      formFields={formFields}
      loading={isLoading}
      formSchema={productCategoryFormSchema}
      transformData={(data) => {
        if (data.productCategoryId) data.productCategoryId = +data.productCategoryId;
        return data;
      }}
    />
  );
};
