"use client";

import { useEffect, useState } from "react";

import type { Media } from "@acme/db";
import {
  Button,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@acme/ui";

import { Modal } from "~/components/ui/modal";
import { api } from "~/trpc/react";
import { Loader } from "../ui/loader";
import { MediaGrid } from "../ui/media-grid";
import UploadButton from "../ui/upload-button";

export type MediaType = "image" | "video";

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (value: Media[]) => void;
  selected: Media[] | null;
  type: MediaType;
  multiple?: boolean;
}

export const MediaModal: React.FC<MediaModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selected,
  multiple,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media[] | null>(selected);
  const [page, setPage] = useState(1);
  const perPage = 12;

  const { data: media, isLoading } = api.media.list.useQuery({
    page,
    perPage,
  });

  const [total] = api.media.count.useSuspenseQuery();
  const pageCount = total[0] ? Math.ceil(+total[0]?.count / perPage) : 1;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setSelectedMedia(selected);
  }, [selected]);

  if (!isMounted) {
    return null;
  }

  const onSubmit = () => {
    if (!selectedMedia) return;
    onSelect(selectedMedia);
    onClose();
  };

  return (
    <Modal
      className="sm:max-w-4xl"
      title="Kies een afbeelding"
      description="Selecteer een afbeelding uit je media."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4 pt-2">
        {!!isLoading && (
          <div className="absolute inset-0 flex h-full w-full items-center justify-center">
            <Loader />
          </div>
        )}
        <MediaGrid
          multiple={!!multiple}
          media={
            (media?.map((m) => ({
              ...m,
              createdAt: new Date(),
              updatedAt: new Date(),
            })) as Media[]) || []
          }
          onSelect={setSelectedMedia}
          selected={selectedMedia || []}
        />
        {media?.length ? (
          <Pagination>
            <PaginationContent>
              <PaginationItem
                onClick={() => setPage((prev) => prev - 1)}
                className={page === 1 ? "pointer-events-none opacity-60" : ""}
              >
                <PaginationPrevious href="#" />
              </PaginationItem>
              {Array(Math.max(pageCount, 3))
                .fill(0)
                .map((_, i) => {
                  const start = page > 1 ? page - 1 : 1;
                  const current = start + i;
                  if (pageCount < current) return null;
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={current === page}
                        onClick={() => setPage(current)}
                        href="#"
                      >
                        {current}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
              <PaginationItem
                className={
                  page === pageCount ? "pointer-events-none opacity-60" : ""
                }
              >
                <PaginationNext
                  href="#"
                  onClick={() => setPage((prev) => prev + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ) : (
          <p className="flex w-full items-center justify-center rounded-md bg-white py-8 text-sm">
            Geen media gevonden. Voeg een afbeelding toe.
          </p>
        )}
        <div className="sticky bottom-0 space-y-2">
          <div className="flex w-full items-center justify-end space-x-2 pt-6">
            <UploadButton />
            <Button disabled={!selectedMedia} type="button" onClick={onSubmit}>
              Selecteren
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
