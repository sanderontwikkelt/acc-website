'use client'

import { Button } from './ui/button'
import { useState } from 'react'

type Data = {
  pageTitle: string
  pageViews: number
  pagePath: string
}

export function ViewsPerTitle({ data }: { data: Data[] }) {
  const [limit, setLimit] = useState(true)
  const limitedData = limit ? data.slice(0, 5) : data
  return (
    <div className='space-y-8 w-full'>
      {limitedData.map(({ pageTitle, pageViews, pagePath }, i: number) => (
        <div className='flex items-center w-full' key={i}>
          <div className='space-y-1 w-[calc(100%-1rem)] pr-4'>
            <p className='text-sm font-medium leading-none truncate max-w-[calc(100%)]'>
              {pageTitle}
            </p>
            <p className='text-sm text-muted-foreground truncate max-w-[calc(100%)]'>
              {pagePath}
            </p>
          </div>
          <div className='ml-auto font-medium'>{pageViews}</div>
        </div>
      ))}
      {data.length > 5 && (
        <Button
          variant='link'
          className='mt-2 px-0 text-blue-500'
          onClick={() => setLimit((prev) => !prev)}
        >
          {limit ? 'Alles' : 'Minder'} tonen
        </Button>
      )}
    </div>
  )
}
