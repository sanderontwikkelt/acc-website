"use client";

import React, { useState } from "react";
import { Trash } from "lucide-react";
import { ActionEnum, EntityEnum } from "types/permissions";

import { Button } from "@acme/ui/button";

import { useHasPermissions } from "~/lib/utils";
import { AlertModal } from "./modals/alert-modal";
import { Heading } from "./ui/heading";
import { Separator } from "./ui/separator";

const DetailHeader = ({
  entity,
  hasInitialData,
  title,
  onDelete,
}: {
  entity: EntityEnum;
  hasInitialData: boolean;
  title: string;
  onDelete: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [canDelete] = useHasPermissions([entity, ActionEnum.DELETE]);

  const onConfirm = () => {
    setLoading(true);
    onDelete();
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={hasInitialData ? `${title} bewerken` : `${title} toevoegen`}
          description={
            hasInitialData
              ? `Bewerk een ${title.toLowerCase()}.`
              : `Voeg een nieuwe ${title.toLowerCase()} toe`
          }
        >
          {hasInitialData && canDelete && (
            <Button
              disabled={loading}
              variant="destructive"
              size="icon"
              onClick={() => setOpen(true)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </Heading>
      </div>
      <Separator />
    </>
  );
};

export default DetailHeader;
