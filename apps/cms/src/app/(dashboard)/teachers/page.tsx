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

const title = "Docenten";
const entity = EntityEnum.TEACHER;

interface Column {
  id: number;
  createdAt: string;
  title: string;
  name: string;
  description: string;
}

const TeachersPage = ({ searchParams }) => {
  const page = +(searchParams.page || 1);
  const perPage = +(searchParams.per_page || 10);
  const sort = searchParams.sort;

  const [teachers] = api.teacher.list.useSuspenseQuery({
    page,
    sort: sort || undefined,
    perPage,
  });

  const [totalTeachers] = api.teacher.count.useSuspenseQuery();

  const deleteTeacher = api.teacher.delete.useMutation();

  const router = useRouter();
  const pathname = usePathname();

  const [canCreate] = useHasPermissions([entity, ActionEnum.CREATE]);

  const data = React.useMemo<Column[]>(
    () =>
      teachers.map((teacher) => ({
        id: teacher.id,
        title: teacher.title ?? "",
        name: teacher.name ?? "",
        description: teacher.description ?? "",
        createdAt: formatCreatedAt(teacher.createdAt),
        updatedAt: formatCreatedAt(teacher.updatedAt),
      })) as Column[],
    [teachers],
  );

  const onDelete = async (id: string | number) => {
    await deleteTeacher.mutateAsync(id as number);
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
    pageCount: totalTeachers[0]
      ? Math.ceil(+totalTeachers[0]?.count / perPage)
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

export default TeachersPage;
