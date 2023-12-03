import { cn } from '@/lib/cn'
import { ImageType } from '@/lib/types'
import React from 'react'
import NextImage from '../NextImage'

interface Item {
  image: ImageType
  cols: number
}

const images = ({ items }: { items: Item[] }) => {
  return (
    <div className={cn('grid grid-cols-12 gap-10 md:gap-[8rem]')}>
      {items.map(({ image, cols }, i) => {
        const span = {
          1: 'col-span-1',
          2: 'col-span-2',
          3: 'col-span-3',
          4: 'col-span-4',
          5: 'col-span-5',
          6: 'col-span-6',
          7: 'col-span-7',
          8: 'col-span-8',
          9: 'col-span-9',
          10: 'col-span-10',
          11: 'col-span-11',
          12: 'col-span-12',
        }[cols]
        return (
          <div
            className={cn(
              'relative min-h-[26rem] overflow-hidden max-md:col-span-12',
              span
            )}
            key={i}
          >
            <NextImage
              image={image}
              className='h-full w-full object-contain'
              alt={'grid_item_' + i}
            />
          </div>
        )
      })}
    </div>
  )
}

export default images
