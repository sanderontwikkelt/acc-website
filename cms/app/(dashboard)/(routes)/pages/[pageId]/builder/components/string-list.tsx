import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PlusCircle } from 'lucide-react'
import React from 'react'

interface List {
  list: string[]
  setList: (l: string[]) => void
}

const StringList = ({ list, setList }: List) => {
  return (
    <div className=''>
      <div className='space-y-4 mb-4 max-h-[20rem] overflow-auto border-gray-200 p-3 border rounded-md bg-gray-50'>
        {list.map((item: string, i: number) => (
          <div className='flex space-x-2 w-full' key={i}>
            <div className='rounded-full flex items-center justify-center bg-slate-900 text-xs h-6 w-6 mt-2 text-white font-semibold'>
              {i + 1}
            </div>
            <div className='space-y-2 flex-grow'>
              <Input
                value={item}
                onChange={(e) =>
                  setList(
                    list.map((listItem, idx) =>
                      idx === i ? e.target.value : listItem
                    )
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>
      <Button variant='outline' onClick={() => setList([...list, ''])}>
        Meer
        <PlusCircle className='w-4 h-4 ml-1' />
      </Button>
    </div>
  )
}

export default StringList
