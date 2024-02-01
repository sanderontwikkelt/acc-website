"use client";

import type { ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import { useRouter } from "next/navigation";

import type { DataTableFilterableColumn } from "~/components/ui/data-table/data-table-types";
import {
  deleteSelectedRows,
  UsersTableFloatingBarContent,
} from "./table-actions";
import { fetchUsersTableColumnDefs } from "./table-column-def";

type User = InferSelectModel<typeof schema.user>;

export function UsersTableShell({}: UsersTableShellProps) {
  const router = useRouter();

  const filterableColumns: DataTableFilterableColumn<User>[] = React.useMemo(
    () => [
      {
        id: "role_id",
        title: "Rol",
        options:
          groupingTemplates.map?.((template) => ({
            label: template.label,
            value: template.id.toString(),
          })) || [],
      },
    ],
    [groupingTemplates, t, tBadge],
  );

  const [isPending, startTransition] = React.useTransition();

  const actionTexts = React.useMemo(
    () => ({
      deleting: tActions("deleting"),
      deleted_success: tActions("delete-success"),
      edit: tActions("edit"),
      download: tActions("download"),
    }),
    [tActions],
  );

  const columnTexts = React.useMemo(
    () => ({
      created_at: t("table-header.created_at"),
      user_name: t("table-header.user_name"),
      file_name: t("table-header.file_name"),
      order_import_grouping_template: t(
        "table-header.order_import_grouping_template",
      ),
      status: t("table-header.status"),
    }),
    [t],
  );

  const columns = React.useMemo<ColumnDef<User, unknown>[]>(
    () =>
      fetchUsersTableColumnDefs(
        isPending,
        startTransition,
        {
          ...columnTexts,
          ...actionTexts,
        },
        router.refresh,
      ),
    [isPending, columnTexts, actionTexts],
  );

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount: meta.last_page,
    filterableColumns,
  });

  return (
    <DataTable
      dataTable={dataTable}
      columns={columns}
      filterableColumns={filterableColumns}
      floatingBarContent={UsersTableFloatingBarContent(dataTable)}
      deleteRowsAction={async (event) => {
        deleteSelectedRows(dataTable, actionTexts, event);
        router.refresh();
      }}
    />
  );
}
