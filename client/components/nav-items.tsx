'use client'

import { cn } from '@/lib/cn'
import { getArray } from '@/lib/getArray'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Values = { pathname: string; name: string }[]
const NavItems = ({
  links,
  setHoveredItem,
}: {
  links: {
    pathname: string
    name: string
    values?: Values
  }[]
  setHoveredItem: (v: Values | null) => void
}) => {
  const path = usePathname()
  return links.length
    ? links.map(({ pathname, name, values }, i) => (
        <Link
          href={pathname || ''}
          key={pathname + name + i}
          aria-label={name}
          onMouseOver={() => values && setHoveredItem(values)}
          onFocus={() => values && setHoveredItem(values)}
          className={cn(
            'flex items-center space-x-2 whitespace-nowrap p-3 hover:underline',
            path.includes(pathname) ? 'underline' : ''
          )}
        >
          {name}
          {!!getArray(values)?.length && (
            <svg
              width='12'
              height='7'
              viewBox='0 0 12 7'
              className='ml-2'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M0 1.02679L5.33184 6.54839L6.32258 5.52159L0.991441 0L0 1.02679Z'
                fill='#A2A2A2'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M4.74219 5.99394L5.74866 7L11.5164 1.23222L10.5106 0.225806L4.74219 5.99394Z'
                fill='#A2A2A2'
              />
            </svg>
          )}
        </Link>
      ))
    : null
}

export default NavItems
