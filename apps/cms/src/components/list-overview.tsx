"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { EntityEnum } from "types/permissions";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Copy, Edit, MoreHorizontal, Plus, Trash } from "lucide-react";
import { ActionEnum } from "types/permissions";

import { Checkbox } from "@acme/ui/checkbox";
import { toast } from "@acme/ui/toast";

import { AlertModal } from "~/components/modals/alert-modal";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { useMutation } from "~/hooks/use-mutation";
import { useHasPermissions } from "~/lib/utils";
import { DataTable } from "./ui/data-table/data-table";

interface CellActionProps<T> {
  data: T;
  canUpdate?: boolean;
  canDelete?: boolean;
  onDelete: (id: string | number) => void;
}

export const CellAction = <T extends { id: string | number }>({
  data,
  canUpdate,
  canDelete,
  onDelete,
}: CellActionProps<T>) => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, onChange] = useState(false);

  const onConfirm = async () => {
    if (!canDelete) return null;
    setLoading(true);
    onDelete(data.id);
    setOpen(false);
    setLoading(false);
  };

  const onCopy = async (id: string) => {
    await navigator.clipboard.writeText(id);
    toast.success("ID gekopiëerd naar klembord.");
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu open={isOpen} onOpenChange={onChange}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acties</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id.toString())}>
            <Copy className="mr-2 h-4 w-4" /> Kopiëer ID
          </DropdownMenuItem>
          {canUpdate && (
            <DropdownMenuItem
              onClick={() => router.push(`${pathname}/${data.id}`)}
            >
              <Edit className="mr-2 h-4 w-4" /> Bewerken
            </DropdownMenuItem>
          )}
          {canDelete && (
            <DropdownMenuItem
              onClick={() => {
                onChange(false);
                setOpen(true);
              }}
            >
              <Trash className="mr-2 h-4 w-4" /> Verwijderen
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const ListOverview = <T extends { id: string | number }>({
  data,
  entity,
  title,
  columns,
}: {
  data: T[];
  entity: EntityEnum;
  title: string;
  columns: ColumnDef<T>[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate: onDelete } = useMutation(entity, "delete");

  const [canCreate, canUpdate, canDelete] = useHasPermissions(
    [entity, ActionEnum.CREATE],
    [entity, ActionEnum.UPDATE],
    [entity, ActionEnum.DELETE],
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${title} (${data.length})`}
          description={`Een lijst met alle ${title.toLowerCase()} binnen jouw toegang.`}
        >
          {canCreate && (
            <Button onClick={() => router.push(`${pathname}/new`)}>
              <Plus className="mr-2 h-4 w-4" /> Toevoegen
            </Button>
          )}
        </Heading>
      </div>
      <Separator />
      <DataTable
        searchKey="name"
        columns={[
          {
            id: "select",
            header: ({ table }) => (
              <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => {
                  table.toggleAllPageRowsSelected(!!value);
                }}
                aria-label="Select all"
                className="translate-y-[2px]"
              />
            ),
            cell: ({ row }) => (
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => {
                  row.toggleSelected(!!value);
                }}
                aria-label="Select row"
                data-pw="row-checkbox"
                className="translate-y-[2px]"
              />
            ),
            enableSorting: false,
            enableHiding: false,
          },
          ...columns,
          {
            id: "actions",
            cell: ({ row }) => (
              <CellAction<T>
                data={row.original}
                canUpdate={canUpdate}
                canDelete={canDelete}
                onDelete={onDelete}
              />
            ),
          },
        ]}
        data={data}
      />
    </>
  );
};
