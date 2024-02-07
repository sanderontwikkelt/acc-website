"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { EntityEnum } from "types/permissions";

import { User } from "@acme/db";

import { Card } from "~/components/ui/card";
import { DataTable } from "~/components/ui/data-table/data-table";
import { DataTableColumnDefs } from "~/components/ui/data-table/data-table-column-def";
import { TableFloatingBarContent } from "~/components/ui/data-table/table-actions";
import { Heading } from "~/components/ui/heading";
import { useDataTable } from "~/hooks/use-data-table";
import { formatCreatedAt } from "~/lib/utils";
import { api } from "~/trpc/react";

const title = "Winkelmanden";
const entity = EntityEnum.CART;

interface Column {
  id: number;
  createdAt: string;
  user: User;
}

const CartsPage = () => {
  const searchParams = useSearchParams();

  const page = +(searchParams.get("page") || 10);
  const perPage = +(searchParams.get("per_page") || 10);
  const sort = searchParams.get("sort");

  const permissionIds = searchParams.get("permissions");

  const [carts] = api.cart.list.useSuspenseQuery({
    page,
    sort: sort || undefined,
    perPage,
    ...(permissionIds && {
      permissionIds: permissionIds.split(".").map((p) => +p),
    }),
  });

  const [totalCarts] = api.cart.count.useSuspenseQuery();

  const router = useRouter();
  const pathname = usePathname();

  const data = React.useMemo<Column[]>(
    () =>
      carts.map((cart) => ({
        id: cart.id,
        user: {
          ...cart.user,
          createdAt: new Date(),
          updatedAt: new Date(),
          emailVerified: new Date(),
        },
        createdAt: formatCreatedAt(cart.createdAt),
        updatedAt: formatCreatedAt(cart.updatedAt),
      })) as Column[],
    [carts],
  );

  const columns = DataTableColumnDefs<Column>({
    columns: [
      { label: "Klant", name: "user" },
      { label: "Aangemaakt", name: "createdAt" },
      { label: "Aangepast", name: "updatedAt" },
    ],
    entity: entity,
    onEdit: (id: number | string) => router.push(`${pathname}/${id}`),
  });

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount: totalCarts[0] ? Math.ceil(+totalCarts[0]?.count / perPage) : 1,
  });

  return (
    <>
      <Heading
        title={`${title} (${data?.length})`}
        description={`Een lijst met alle ${title.toLowerCase()} binnen jouw toegang.`}
      ></Heading>
      <Card>
        <DataTable
          dataTable={dataTable}
          columns={columns}
          floatingBarContent={TableFloatingBarContent(dataTable)}
        />
      </Card>
    </>
  );
};

export default CartsPage;
