'use client'

import { cn } from '@/lib/cn'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import NextImage from './NextImage'

interface Item {
  title: string
  category: string
  description: string
  image: {
    src: string
    width: number
    height: number
  }
  className: string
}
interface Category {
  value: string
  name: string
}

const PortfolioList = ({
  categories,
  items,
}: {
  categories: Category[]
  items: Item[]
}) => {
  const [filters, setFilters] = useState<string[]>([])

  const filteredItems = useMemo(
    () =>
      items.filter(
        ({ category }) => !filters.length || filters.includes(category)
      ),
    [items, filters]
  )
  return (
    <div className='relative'>
      <div className='wrap flex flex-wrap items-center space-x-2 space-y-2 md:justify-end md:space-x-5'>
        <span className='font-semibold max-md:w-full'>Filter op:</span>
        {categories.map(({ name, value }) => (
          <button
            key={value}
            aria-label={'filter-on-' + name}
            onClick={() =>
              setFilters((prev) =>
                prev.includes(value)
                  ? prev.filter((i) => i !== value)
                  : [...prev, value]
              )
            }
            className={cn(
              'whitespace-nowrap rounded-full border border-[#343A3F] px-3 py-1 font-semibold transition-colors max-md:text-sm md:px-[1.25rem] md:py-[0.625rem]',
              filters.includes(value)
                ? 'bg-[#343A3F] text-white'
                : 'hover:bg-main/5'
            )}
          >
            {name}
          </button>
        ))}
      </div>
      {filteredItems.length ? (
        <div className='absolute inset-0 z-[-1] max-md:hidden'>
          <svg
            width='100%'
            height='1327'
            viewBox='0 0 822 1327'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1 0V404C1 547.594 117.406 664 261 664H561C704.594 664 821 780.406 821 924V1326.5'
              stroke='#64BD6E'
              strokeDasharray='6 6'
            />
          </svg>
        </div>
      ) : (
        <p className='mx-auto max-w-sm py-20 text-center'>
          Geen items gevonden
        </p>
      )}
      <div className='flex flex-wrap space-y-20 py-24 md:space-x-20'>
        {filteredItems.map(({ title, description, image }) => (
          <div
            className='group flex-grow justify-center max-md:w-full md:flex'
            key={title}
          >
            <div>
              <div
                style={{ width: image.width, height: image.height }}
                className='max-w-full overflow-hidden'
              >
                <NextImage
                  image={image}
                  alt='title'
                  className='max-w-full transition-all duration-500 group-hover:scale-[1.05] max-md:h-full max-md:w-full max-md:object-cover'
                />
              </div>
              <h3 className='mb-[0.625rem] mt-5 text-base font-semibold md:text-base'>
                {title}
              </h3>
              <p className='mb-0 text-xs font-normal'>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PortfolioList
