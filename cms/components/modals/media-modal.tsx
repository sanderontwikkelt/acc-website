'use client'

import { Loader } from '../ui/loader'
import { MediaGrid } from '../ui/media-grid'
import { MediaValue } from '../ui/media-select'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Media } from '@prisma/client'
import axios from 'axios'
import { ImagePlus } from 'lucide-react'
import { useEffect, useState } from 'react'

export type MediaType = 'image' | 'video'

interface MediaModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (value: MediaValue[]) => void
  selected: MediaValue[] | null
  type: MediaType
  multiple?: boolean
}

export const MediaModal: React.FC<MediaModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selected,
  type = 'image',
  multiple,
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [selectedMedia, setSelectedMedia] = useState<MediaValue[] | null>(
    selected
  )
  const [media, setMedia] = useState<Media[]>([])

  const fetchMedia = async () => {
    const { data } = await axios.get('/api/media?type=' + type)
    if (isFetching) setIsFetching(false)
    setMedia(data)
  }
  useEffect(() => {
    setIsMounted(true)
    fetchMedia()
  }, [])

  useEffect(() => {
    setSelectedMedia(selected)
  }, [selected])

  if (!isMounted) {
    return null
  }

  const onChange = async (files: FileList | null) => {
    if (!files) return
    setLoading(true)

    try {
      // Create a FormData object and append the file to it
      const formData = new FormData()
      const file = files[0]
      formData.append('file', file)

      // Send a POST request to your API endpoint
      const response = await axios.post('/api/media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setMedia((prev) => [...prev, response.data])
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = () => {
    if (!selectedMedia) return
    onSelect(selectedMedia)
    onClose()
  }

  return (
    <Modal
      className='sm:max-w-4xl'
      title='Select an image'
      description='Select one of the images from your media store.'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='space-y-4 pt-2'>
        {loading ? (
          <div className='flex h-full w-full items-center justify-center absolute inset-0'>
            <Loader />
          </div>
        ) : null}
        {isFetching ? (
          <div className='flex w-full items-center justify-center h-36'>
            <Loader />
          </div>
        ) : (
          <MediaGrid
            multiple={!!multiple}
            media={media}
            onSelect={setSelectedMedia}
            selected={selectedMedia || []}
            refetch={fetchMedia}
          />
        )}
        <div className='space-y-2 sticky bottom-0'>
          <div className='flex w-full items-center justify-end space-x-2 pt-6'>
            <div>
              <input
                type='file'
                hidden
                id='media-model-upload'
                accept={type === 'image' ? 'image/*' : 'video/*'}
                onChange={(e) => onChange(e.target.files)}
              />
              <Button
                type='button'
                disabled={loading}
                variant='secondary'
                onClick={(e) => {
                  e.stopPropagation()
                  document?.getElementById('media-model-upload')?.click()
                }}
              >
                <ImagePlus className='mr-2 h-4 w-4' />
                Afbeelding uploaden
              </Button>
            </div>
            <Button
              disabled={loading || !selectedMedia}
              type='button'
              onClick={onSubmit}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
