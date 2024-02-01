import React from "react"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Item {
  title?: string
  description?: string
}
interface List {
  list: Item[]
  setList: (l: Item[]) => void
  title?: boolean
  description?: boolean
}

const DynamicList = ({
  list,
  title = false,
  description = false,
  setList,
}: List) => {
  return (
    <div className="">
      <div className="mb-4 max-h-[20rem] space-y-4 overflow-auto rounded-md border border-gray-200 bg-gray-50 p-3">
        {list.map((item: Item, i: number) => (
          <div className="flex w-full space-x-2" key={i}>
            <div className="mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
              {i + 1}
            </div>
            <div className="flex-grow space-y-2">
              {title && (
                <Input
                  value={item.title}
                  onChange={(e) =>
                    setList(
                      list.map((listItem, idx) =>
                        idx === i
                          ? { ...listItem, title: e.target.value }
                          : listItem
                      )
                    )
                  }
                />
              )}
              {description && (
                <Textarea
                  value={item.description}
                  onChange={(e) =>
                    setList(
                      list.map((listItem, idx) =>
                        idx === i
                          ? { ...listItem, description: e.target.value }
                          : listItem
                      )
                    )
                  }
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        onClick={() =>
          setList([
            ...list,
            {
              title: title ? "" : undefined,
              description: description ? "" : undefined,
            },
          ])
        }
      >
        Add more <PlusCircle className="ml-1 h-4 w-4" />
      </Button>
    </div>
  )
}

export default DynamicList
