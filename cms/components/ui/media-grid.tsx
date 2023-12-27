"use client"

import { useState } from "react"
import Image from "next/image"
import { Media } from "@prisma/client"
import axios from "axios"
import toast from "react-hot-toast"

import { formatBytes } from "@/lib/formatBytes"
import { cn } from "@/lib/utils"

import { AlertModal } from "../modals/alert-modal"
import { MediaValue } from "./media-select"
import { Video } from "./video"

export const MediaGrid = ({
  media,
  selected = [],
  onSelect,
  refetch,
  multiple,
}: {
  media: Media[]
  selected: MediaValue[]
  onSelect: (media: MediaValue[]) => void
  refetch: () => void
  multiple: boolean
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onRemove = async () => {
    if (showDeleteDialog) {
      try {
        setLoading(true)
        await axios.delete(`/api/media/${showDeleteDialog}`)
        refetch()
        toast.success("Dit bestand is verwijderd.")
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
        setShowDeleteDialog(null)
      }
    }
  }
  return (
    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {media.map((mediaItem) => (
        <button
          key={mediaItem.url}
          onClick={() => {
            const newItem = {
              id: mediaItem.id,
              name: mediaItem.filename,
              width: mediaItem.width,
              height: mediaItem.height,
              src: mediaItem.url,
            }
            onSelect(
              multiple
                ? selected.some(({ id }) => id === mediaItem.id)
                  ? selected.filter(({ id }) => id !== mediaItem.id)
                  : [...selected, newItem]
                : [newItem]
            )
          }}
          type="button"
          className={cn(
            "relative rounded-md border bg-card shadow-md transition-all hover:shadow-xl",
            selected?.some(({ src }) => src === mediaItem.url)
              ? "ring-2 ring-primary ring-offset-1"
              : "opacity-80"
          )}
        >
          <div className="relative h-36 w-full overflow-hidden rounded-t-md bg-gray-200 dark:bg-gray-800">
            {mediaItem.mimetype.startsWith("image") ? (
              <Image
                fill
                className="object-contain"
                alt={mediaItem.filename}
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
  )
}
