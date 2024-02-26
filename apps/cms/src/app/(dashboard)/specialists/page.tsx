"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

const title = "Specialisten";
const entity = EntityEnum.SPECIALIST;

interface Column {
  id: number;
  createdAt: string;
  title: string;
  name: string;
  description: string;
}

const SpecialistsPage = ({ searchParams }) => {
  const page = +(searchParams.page || 1);
  const perPage = +(searchParams.per_page || 10);
  const sort = searchParams.sort;

  const [specialists] = api.specialist.list.useSuspenseQuery({
    page,
    sort: sort || undefined,
    perPage,
  });

  const [totalSpecialists] = api.specialist.count.useSuspenseQuery();

  const deleteSpecialist = api.specialist.delete.useMutation();

  const router = useRouter();
  const pathname = usePathname();

  const [canCreate] = useHasPermissions([entity, ActionEnum.CREATE]);

  const data = React.useMemo<Column[]>(
    () =>
      specialists.map((specialist) => ({
        id: specialist.id,
        title: specialist.title ?? "",
        name: specialist.name ?? "",
        description: specialist.description ?? "",
        createdAt: formatCreatedAt(specialist.createdAt),
        updatedAt: formatCreatedAt(specialist.updatedAt),
      })) as Column[],
    [specialists],
  );

  const onDelete = async (id: string | number) => {
    await deleteSpecialist.mutateAsync(id as number);
  };

  const columns = DataTableColumnDefs<Column>({
    columns: [
      { label: "Naam", name: "name" },
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
    pageCount: totalSpecialists[0]
      ? Math.ceil(+totalSpecialists[0]?.count / perPage)
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

export default SpecialistsPage;
