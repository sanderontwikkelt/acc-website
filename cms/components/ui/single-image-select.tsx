'use client'

import { MediaModal } from '../modals/media-modal'
import { Loader } from './loader'
import axios from 'axios'
import { ImagePlus } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export type MediaValue = {
  src: string
  width: number
  height: number
  id: string
  name: string
}

interface SingleImageSelectProps {
  disabled?: boolean
  onChange: (value: string) => void
  value: string
  multiple?: boolean
}

const getImage = async (
  id: string,
  setImage: (i: MediaValue) => void,
  setLoading: (b: boolean) => void
) => {
  setLoading(true)
  const { data } = await axios.get('/api/media/' + id)

  if (data)
    setImage({
      id: data.id,
      height: data.height,
      width: data.width,
      src: data.url,
      name: data.filename,
    })
  setLoading(false)
}

const SingleImageSelect: React.FC<SingleImageSelectProps> = ({
  onChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [image, setImage] = useState<MediaValue | null>(null)

  useEffect(() => {
    console.log({ value })
    if (value) {
      getImage(value, setImage, setIsLoading)
    } else {
      setIsLoading(false)
    }
  }, [value])

  return (
    <div>
      <MediaModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selected={image ? [image] : []}
        onSelect={([{ id }]) => onChange(id)}
        type='image'
      />
      <button
        disabled={isLoading}
        type='button'
        className='w-full h-36 overflow-hidden rounded-md bg-secondary border border-input relative'
        onClick={() => setIsOpen(true)}
      >
        {image ? (
          <Image
            fill
            className='object-contain px-5'
            alt={image.name}
            src={image.src}
          />
        ) : (
          <div className='flex items-center justify-center w-full h-full'>
            {isLoading ? <Loader /> : <ImagePlus />}
          </div>
        )}
      </button>
    </div>
  )
}

export default SingleImageSelect
