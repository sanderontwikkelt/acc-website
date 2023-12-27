"use client"

import { useState } from "react"

import { Button } from "./ui/button"

type Data = {
  pageTitle: string
  pageViews: number
  pagePath: string
}

export function ViewsPerTitle({ data }: { data: Data[] }) {
  const [limit, setLimit] = useState(true)
  const limitedData = limit ? data.slice(0, 5) : data
  return (
    <div className="w-full space-y-8">
      {limitedData.map(({ pageTitle, pageViews, pagePath }, i: number) => (
        <div className="flex w-full items-center" key={i}>
          <div className="w-[calc(100%-1rem)] space-y-1 pr-4">
            <p className="max-w-[calc(100%)] truncate text-sm font-medium leading-none">
              {pageTitle}
            </p>
            <p className="max-w-[calc(100%)] truncate text-sm text-muted-foreground">
              {pagePath}
            </p>
          </div>
          <div className="ml-auto font-medium">{pageViews}</div>
        </div>
      ))}
      {data.length > 5 && (
        <Button
          variant="link"
          className="mt-2 px-0 text-blue-500"
          onClick={() => setLimit((prev) => !prev)}
        >
          {limit ? "Alles" : "Minder"} tonen
        </Button>
      )}
    </div>
  )
}
