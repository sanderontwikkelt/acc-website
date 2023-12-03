'use client'

import { AlertModal } from '../modals/alert-modal'
import { MediaValue } from './media-select'
import { Video } from './video'
import { formatBytes } from '@/lib/formatBytes'
import { cn } from '@/lib/utils'
import { Media } from '@prisma/client'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import toast from 'react-hot-toast'

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
        toast.success('Dit bestand is verwijderd.')
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
        setShowDeleteDialog(null)
      }
    }
  }
  return (
    <div className='mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
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
          type='button'
          className={cn(
            'relative bg-card shadow-md hover:shadow-xl border transition-all rounded-md',
            selected?.some(({ src }) => src === mediaItem.url)
              ? 'ring-2 ring-primary ring-offset-1'
              : 'opacity-80'
          )}
        >
          <div className='w-full h-36 overflow-hidden rounded-t-md bg-gray-200 dark:bg-gray-800 relative'>
            {mediaItem.mimetype.startsWith('image') ? (
              <Image
                fill
                className='object-contain'
                alt={mediaItem.filename}
                src={mediaItem.url}
              />
            ) : (
              <Video src={mediaItem.url} />
            )}
          </div>
          <div className='w-full p-3 justify-between relative flex border-t text-left'>
            <div className='w-full'>
              <h2 className='text-sm mb-1 font-medium truncate max-w-full'>
                {mediaItem.filename}
              </h2>
              <p className='text-xs'>{formatBytes(mediaItem.size)}</p>
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
