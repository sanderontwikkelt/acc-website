"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { ActionEnum, EntityEnum } from "types/permissions";

import { buttonVariants, cn, NextImage } from "@acme/ui";

import type { DataTableFilterableColumn } from "~/components/ui/data-table/data-table-types";
import { Card } from "~/components/ui/card";
import { DataTable } from "~/components/ui/data-table/data-table";
import { DataTableColumnDefs } from "~/components/ui/data-table/data-table-column-def";
import {
  deleteSelectedRows,
  TableFloatingBarContent,
} from "~/components/ui/data-table/table-actions";
import { Heading } from "~/components/ui/heading";
import UploadButton from "~/components/ui/upload-button";
import { useDataTable } from "~/hooks/use-data-table";
import { formatBytes } from "~/lib/formatBytes";
import { useHasPermissions } from "~/lib/utils";
import { api } from "~/trpc/react";

const title = "Media";
const entity = EntityEnum.MEDIA;

interface Column {
  id: number;
  createdAt: string;
  filename: string;
  size: number;
  width: number;
  height: number;
  mimetype: string;
  filepath: string;
  url: string;
}

const MediasPage = () => {
  const searchParams = useSearchParams();

  const page = +(searchParams.get("page") || 10);
  const perPage = +(searchParams.get("per_page") || 10);
  const sort = searchParams.get("sort");
  const mimetype = searchParams.get("mimetype");

  const [medias] = api.media.list.useSuspenseQuery({
    page,
    sort: sort || undefined,
    perPage,
    mimetype: mimetype || undefined,
  });
  const [totalMedias] = api.media.count.useSuspenseQuery();

  const deleteMedia = api.media.delete.useMutation();

  const router = useRouter();

  const filterableColumns: DataTableFilterableColumn<Column>[] = React.useMemo(
    () => [
      {
        id: "mimetype",
        title: "Mimetype",
        options: [
          { label: "Afbeelding / JPG", value: "image/jpeg" },
          { label: "Afbeelding / PNG", value: "image/png" },
          { label: "Video / MP4", value: "video/mp4" },
        ],
      },
    ],
    [],
  );

  const [canCreate] = useHasPermissions([entity, ActionEnum.CREATE]);

  const data = React.useMemo<Column[]>(
    () =>
      medias.map((media) => ({
        id: media.id,
        filename: media.filename,
        size: media.size,
        width: media.width,
        height: media.height,
        mimetype: media.mimetype,
        filepath: media.filepath,
        url: media.url,
        createdAt: media.createdAt
          ? format(new Date(media.createdAt), "dd-LL-yyyy, hh:mm")
          : "",
      })) as Column[],
    [medias],
  );

  const onDelete = async (id: string | number) => {
    await deleteMedia.mutateAsync(id as number);
  };

  const columns = DataTableColumnDefs<Column>({
    columns: [
      {
        label: "Bestand",
        name: "filename",
        cell: ({ row }) => (
          <a
            className={cn(
              buttonVariants({ variant: "link" }),
              "flex max-w-[calc(100%+1rem)] cursor-pointer items-center justify-start truncate px-0",
            )}
            href={`/api/download?url=${row.original.url}&filename=${row.original.filename}`}
          >
            <NextImage
              image={{
                width: row.original.width,
                height: row.original.height,
                src: row.original.url,
              }}
              alt={row.original.filename}
              loading="lazy"
              className="mr-3 max-h-[2.5rem] w-[2.5rem] rounded-md"
            />
            {row.original.filename}
          </a>
        ),
      },
      {
        label: "Formaat",
        name: "size",
        cell: ({ row }) => formatBytes(row.original.size),
      },
      { label: "Breedte", name: "width" },
      { label: "Hoogte", name: "height" },
      { label: "Mimetype", name: "mimetype", enableSorting: false },
      { label: "Aangemaakt", name: "createdAt" },
    ],
    entity: entity,
  });

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount: totalMedias[0] ? Math.ceil(+totalMedias[0]?.count / perPage) : 1,
    filterableColumns,
  });

  return (
    <>
      <Heading
        title={`${title} (${data?.length})`}
        description={`Een lijst met alle ${title.toLowerCase()} binnen jouw toegang.`}
      >
        {canCreate && <UploadButton />}
      </Heading>
      <Card className="flex-grow">
        <DataTable
          className="max-h-[calc(100vh-16.25rem)] overflow-auto"
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

export default MediasPage;
