"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Media } from "@prisma/client";
import axios from "axios";
import { ImagePlus } from "lucide-react";
import toast from "react-hot-toast";

import { AlertModal } from "~/components/modals/alert-modal";
import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";
import { MediaGrid } from "~/components/ui/media-grid";
import { MediaValue } from "~/components/ui/media-select";
import { Separator } from "~/components/ui/separator";
import { useHasPermissions } from "~/lib/utils";
import { ActionEnum, EntityEnum } from "~/types/permissions";

const Client = ({ media }: { media: Media[] }) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaValue[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [canCreate, canUpdate, canDelete] = useHasPermissions(
    [EntityEnum.MEDIA, ActionEnum.CREATE],
    [EntityEnum.MEDIA, ActionEnum.UPDATE],
    [EntityEnum.MEDIA, ActionEnum.DELETE],
  );

  const onRemove = async () => {
    if (!canDelete) return;
    if (showDeleteDialog) {
      try {
        setLoading(true);
        await Promise.all(
          selectedMedia.map(({ id }) => axios.delete(`/api/media/${id}`)),
        );
        toast.success(
          `${
            selectedMedia.length === 1
              ? "1 bestand"
              : `${selectedMedia.length} bestanden`
          } succesvol verwijderd.`,
        );
        setSelectedMedia([]);
        refetch();
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
        setShowDeleteDialog(false);
      }
    }
  };

  const refetch = () => {
    router.refresh();
  };

  const onChange = async (files: FileList | null) => {
    if (!files) return;
    setLoading(true);

    try {
      // Create a FormData object and append the file to it
      const formData = new FormData();
      const file = files[0];
      formData.append("file", file);

      // Send a POST request to your API endpoint
      await axios.post("/api/media", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      refetch();
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        hidden
        id="media-model-upload"
        accept="image/*,video/*"
        onChange={(e) => onChange(e.target.files)}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={`Media (${media.length})`}
          description="Beheer Media voor je website"
        >
          <div className="flex items-center space-x-3">
            {canDelete && (
              <Button
                disabled={!selectedMedia.length}
                type="button"
                variant="outline"
                onClick={() => setShowDeleteDialog(true)}
              >
                Verwijderen
              </Button>
            )}
            {canCreate && (
              <Button
                type="button"
                disabled={loading}
                onClick={(e) => {
                  e.stopPropagation();
                  document?.getElementById("media-model-upload")?.click();
                }}
              >
                <ImagePlus className="mr-2 h-4 w-4" />
                Nieuwe toevoegen
              </Button>
            )}
          </div>
        </Heading>
      </div>
      <Separator />
      <MediaGrid
        multiple
        media={media}
        onSelect={(media) => setSelectedMedia(canUpdate ? media : [])}
        selected={selectedMedia || []}
        refetch={refetch}
      />
      <AlertModal
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => onRemove()}
        loading={loading}
      />
    </>
  );
};

export default Client;
