"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EntityEnum } from "types/permissions";

import type { Media } from "@acme/db";

import { useMutation } from "~/hooks/use-mutation";
import { formatBytes } from "~/lib/formatBytes";
import { cn } from "~/lib/utils";
import { AlertModal } from "../modals/alert-modal";
import { Video } from "./video";

export const MediaGrid = ({
  media,
  selected = [],
  onSelect,
  multiple,
}: {
  media: Media[];
  selected: Media[];
  onSelect: (media: Media[]) => void;
  multiple: boolean;
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const deleteUser = useMutation(EntityEnum.MEDIA, "delete");

  const onRemove = async () => {
    if (showDeleteDialog) {
      try {
        setLoading(true);
        await deleteUser(showDeleteDialog);
        router.refresh();
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
        setShowDeleteDialog(null);
      }
    }
  };

  return (
    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {media.map((mediaItem) => (
        <button
          key={mediaItem.url}
          onClick={() => {
            onSelect(
              multiple
                ? selected.some(({ id }) => id === mediaItem.id)
                  ? selected.filter(({ id }) => id !== mediaItem.id)
                  : [...selected, mediaItem]
                : [mediaItem],
            );
          }}
          type="button"
          className={cn(
            "relative rounded-md border bg-card shadow-md transition-all hover:shadow-xl",
            selected?.some(({ url }) => url === mediaItem.url)
              ? "ring-2 ring-primary ring-offset-1"
              : "opacity-80",
          )}
        >
          <div className="relative h-36 w-full overflow-hidden rounded-t-md bg-gray-200 dark:bg-gray-800">
            {mediaItem.mimetype?.startsWith("image") ? (
              <Image
                fill
                className="object-contain"
                alt={mediaItem.filename || ""}
                src={mediaItem.url}
              />
            ) : (
              <Video src={mediaItem.url} />
            )}
          </div>
          <div className="relative flex w-full justify-between border-t p-3 text-left">
            <div className="w-full">
              <h2 className="mb-1 max-w-full truncate text-sm font-medium">
                {mediaItem.filename}
              </h2>
              <p className="text-xs">{formatBytes(mediaItem.size)}</p>
            </div>
          </div>
        </button>
      ))}
      <AlertModal
        isOpen={!!showDeleteDialog}
        onClose={() => setShowDeleteDialog(null)}
        onConfirm={() => onRemove()}
        loading={loading}
      />
    </div>
  );
};
