'use client'

import { cn } from '@/lib/cn'
import { setHtml } from '@/lib/setHtml'
import { useRef, useState } from 'react'

export default function Accordion({
  description,
  title,
}: {
  description: string
  title: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)
  const [isShowing, setIsShowing] = useState(false)

  const toggle = () => {
    setIsShowing(!isShowing)
    if (parentRef.current && ref.current)
      parentRef.current.style.height =
        (!isShowing ? +ref.current.getBoundingClientRect().height + 20 : 0) +
        100 +
        'px'
  }

  return (
    <div
      className='w-full overflow-hidden transition-all duration-500'
      ref={parentRef}
      style={{ height: 100 }}
    >
      <button
        className='flex h-[6.25rem] w-full items-center justify-between'
        onClick={toggle}
        type='button'
        aria-label='accordion-item'
      >
        <p className='text-xl'>{title}</p>
        <div className='relative h-5 w-5'>
          <div
            className={cn(
              'absolute left-1/2 top-1/2 h-[3px] w-full -translate-x-1/2 -translate-y-1/2 bg-main transition-all duration-300',
              isShowing ? 'rotate-180' : 'rotate-0'
            )}
          />
          <div
            className={cn(
              'absolute left-1/2 top-1/2 h-[3px] w-full -translate-x-1/2 -translate-y-1/2 bg-main transition-all duration-300',
              isShowing ? 'rotate-180 opacity-0' : 'rotate-90 opacity-100'
            )}
          />
        </div>
      </button>
      <div
        ref={ref}
        className={cn(
          'px-6 opacity-0 transition-opacity duration-300',
          isShowing ? 'opacity-100' : 'opacity-0'
        )}
        {...setHtml(description)}
      />
    </div>
  )
}
