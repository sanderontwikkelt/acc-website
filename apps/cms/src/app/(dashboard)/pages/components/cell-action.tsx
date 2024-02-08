"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ActionEnum, EntityEnum } from "@/types/permissions";
import { ActivityLogIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";

import { AlertModal } from "~/components/modals/alert-modal";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useHasPermissions } from "~/lib/utils";
import { PageColumn } from "./columns";

interface CellActionProps {
  data: PageColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [canUpdate, canDelete] = useHasPermissions(
    [EntityEnum.PAGE, ActionEnum.UPDATE],
    [EntityEnum.PAGE, ActionEnum.DELETE],
  );

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/pages/${data.id}`);
      toast.success("Page verwijderd.");
      router.refresh();
    } catch (error) {
      toast.error(" Er is iets mis gegaan");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Page ID gekopiëerd naar klembord.");
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acties</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" /> Kopiëer ID
          </DropdownMenuItem>
          {canUpdate && (
            <DropdownMenuItem onClick={() => router.push(`/pages/${data.id}`)}>
              <Edit className="mr-2 h-4 w-4" /> Aanpassen
            </DropdownMenuItem>
          )}
          {canUpdate && (
            <DropdownMenuItem
              onClick={() => router.push(`/pages/${data.id}/builder`)}
            >
              <ActivityLogIcon className="mr-2 h-4 w-4" /> Content Builder
            </DropdownMenuItem>
          )}
          {canDelete && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className="mr-2 h-4 w-4" /> Verwijderenen
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
