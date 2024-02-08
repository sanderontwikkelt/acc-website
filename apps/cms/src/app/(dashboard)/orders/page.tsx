"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import {
  orderStatusBadges,
  orderStatusTranslations,
} from "node_modules/@acme/api/src/utils";
import { ActionEnum, EntityEnum } from "types/permissions";

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

const title = "Bestellingen";
const entity = EntityEnum.ORDER;

interface Column {
  id: number;
  createdAt: string;
  price: number;
  items: number;
  status: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  userId: string;
}

interface Option {
  label: string;
  value: string;
}

const OrdersPage = () => {
  const searchParams = useSearchParams();

  const page = +(searchParams.get("page") || 10);
  const perPage = +(searchParams.get("per_page") || 10);
  const sort = searchParams.get("sort");

  const status = searchParams.get("status");

  const [orders] = api.order.list.useSuspenseQuery({
    page,
    sort: sort || undefined,
    perPage,
    ...(status && {
      status: status as "WAITING_PAYMENT",
    }),
  });

  const [totalOrders] = api.order.count.useSuspenseQuery();

  const deleteOrder = api.order.delete.useMutation();

  const router = useRouter();
  const pathname = usePathname();

  const statusOptions = useMemo(
    () =>
      (Object.entries(orderStatusTranslations)?.map(([value, label]) => ({
        label,
        value,
      })) || []) as Option[],
    [],
  );

  const filterableColumns: DataTableFilterableColumn<Column>[] = React.useMemo(
    () => [
      {
        id: "status",
        title: "Status",
        options: statusOptions,
      },
    ],
    [statusOptions],
  );

  const [canCreate] = useHasPermissions([entity, ActionEnum.CREATE]);

  const data = React.useMemo<Column[]>(
    () =>
      orders.map((order) => ({
        id: order.id,
        userId: order.userId,
        price: order.items.reduce((a, item) => +item.price, 0),
        user: {
          id: order.user.id,
          name: order.user.name,
          email: order.user.email,
        },
        items: order.items.length,
        status: order.status,
        createdAt: formatCreatedAt(order.createdAt),
        updatedAt: formatCreatedAt(order.updatedAt),
      })) as Column[],
    [orders],
  );

  const onDelete = async (id: string | number) => {
    await deleteOrder.mutateAsync(id as number);
  };

  const columns = DataTableColumnDefs<Column>({
    columns: [
      { label: "Titel", name: "title" },
      { label: "Slug", name: "slug" },
      {
        label: "Status",
        name: "status",
        cell: ({ row }) =>
          row.original.status ? (
            <Badge variant={orderStatusBadges[row.original.status]}>
              {orderStatusTranslations[row.original.status]}
            </Badge>
          ) : (
            "Geen"
          ),
      },
      {
        label: "Prijs",
        name: "price",
        cell: ({ row }) => <code>{formatter.format(+row.original.price)}</code>,
      },
      { label: "Voorraad", name: "stock" },
      { label: "Aangemaakt", name: "createdAt" },
      { label: "Aangepast", name: "updatedAt" },
    ],
    entity: entity,
    onEdit: (id: number | string) => router.push(`${pathname}/${id}`),
  });

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount: totalOrders[0] ? Math.ceil(+totalOrders[0]?.count / perPage) : 1,
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

export default OrdersPage;
