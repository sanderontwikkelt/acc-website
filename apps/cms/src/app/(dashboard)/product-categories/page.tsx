"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { ActionEnum, EntityEnum } from "types/permissions";

import { buttonVariants } from "@acme/ui";

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

const title = "Productcategoriën";
const entity = EntityEnum.PRODUCTCATEGORY;

interface Column {
  id: number;
  createdAt: string;
  title: string;
}

const ProductCategoriesPage = () => {
  const searchParams = useSearchParams();

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
  const pathname = usePathname();

  const [canCreate] = useHasPermissions([entity, ActionEnum.CREATE]);

  const data = React.useMemo<Column[]>(
    () =>
      productCategories.map((productCategory) => ({
        id: productCategory.id,
        title: productCategory.title ?? "",
        createdAt: formatCreatedAt(productCategory.createdAt),
        updatedAt: formatCreatedAt(productCategory.updatedAt),
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
      { label: "Aangepast", name: "updatedAt" },
    ],
    entity: entity,
    onEdit: (id: number | string) => router.push(`${pathname}/${id}`),
  });

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount: totalProductCategories[0]
      ? Math.ceil(+totalProductCategories[0]?.count / perPage)
      : 1,
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

export default ProductCategoriesPage;
