'use client'

import { MediaModal, MediaType } from '../modals/media-modal'
import TooltipWrapper from '../tooltip-wrapper'
import { Button } from './button'
import DragPercentages from './drag-percentages'
import { MediaValue } from './media-select'
import { Video } from './video'
import { ImagePlus } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const MediaItem = ({
  type = 'image',
  value: { objectPosition, ...value },
  onChange,
}: {
  type: MediaType
  value: MediaValue
  onChange?: (v: MediaValue) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <MediaModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selected={[value]}
        onSelect={([media]) => onChange?.(media)}
        type={type}
        multiple={false}
      />
      <div className='w-12 h-12 min-w-[3rem] relative bg-gray-200 dark:bg-gray-900 rounded-md overflow-hidden'>
        {type === 'image' ? (
          <Image
            {...value}
            className='object-contain w-full h-full'
            alt='media select'
          />
        ) : (
          <Video src={value.src} />
        )}
      </div>
      <span className='ml-3 text-sm mr-auto font-medium whitespace-nowrap max-w-full truncate'>
        {value.name}
      </span>
      {!!onChange && (
        <DragPercentages
          className='mr-2'
          position={objectPosition || { x: 50, y: 50 }}
          setPosition={(o) => onChange({ ...value, objectPosition: o })}
        />
      )}
      <Button
        type='button'
        variant='outline'
        className='min-w-[2.5rem]'
        size='icon'
        onClick={() => setIsOpen(true)}
      >
        <TooltipWrapper message='Verander'>
          <ImagePlus className='h-4 w-4' />
        </TooltipWrapper>
      </Button>
    </>
  )
}

export default MediaItem
