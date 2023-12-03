'use client'

import DragList from '@/components/ui/drag-list'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import htmlBlocks, { BlockType } from '@/lib/html-blocks'
import { cn } from '@/lib/utils'
import { Page } from '@prisma/client'
import { EditIcon, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import { ReactNode, useCallback } from 'react'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

const BlockNavigation = ({
  onClick,
  src,
  children,
  add,
}: {
  add?: boolean
  onClick: () => void
  src: string
  children: ReactNode
}) => (
  <button
    onClick={onClick}
    className='group relative w-full flex items-center bg-background hover:bg-secondary rounded-lg p-3'
  >
    <div className='h-52 w-72 bg-[#FCF9EC] shadow-xl border border-input pointer-events-none absolute top-full left-1/2 -translate-x-1/2 transition-all z-50 duration-300 -translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 rounded-md overflow-hidden scale-90 group-hover:scale-100'>
      <Image
        src={src + '?234'}
        fill
        alt='preview'
        className='object-contain p-4'
      />
    </div>
    <div className='flex flex-col items-start mr-3 text-primary'>
      <div className='font-medium text-sm text-left'>
        {children}
        <span className='absolute inset-0' />
      </div>
    </div>
    {add ? (
      <PlusIcon className='w-4 ml-auto' />
    ) : (
      <EditIcon className='w-4 ml-auto' />
    )}
  </button>
)

export default function ComponentsMenu({
  onSelect,
  page,
  blocks: blocksState,
  open,
  setSectionId,
  setEditorOpen,
  setBlocks,
}: {
  page: Page
  open: boolean
  blocks: BlockType[]
  setEditorOpen: (e: 'blocks' | 'header' | 'footer') => void
  setBlocks: (b: BlockType[]) => void
  setSectionId: (s: string) => void
  onSelect: (block: BlockType) => void
}) {
  const handleSectionId = useCallback(
    (id: string) => {
      setEditorOpen('blocks')
      setSectionId(id)
    },
    [setSectionId]
  )

  const dragItem = useCallback(
    ({ value }: { value: BlockType; index: number }) => {
      const item = htmlBlocks[value.name]
      return (
        <BlockNavigation
          key={value.name}
          src={item.previewurl}
          onClick={() => {
            handleSectionId(value.uid)
          }}
        >
          {item.label}
        </BlockNavigation>
      )
    },
    [blocksState]
  )

  return (
    <aside
      className={cn(
        'flex h-full flex-col w-[24rem] max-md:fixed max-md:top-10 max-md:w-screen overflow-hidden max-md:z-50 transition-all duration-300 bg-background pb-6 relative',
        open
          ? 'min-w-[100vw] md:min-w-[24rem] opacity-100 max-md:right-0'
          : 'md:w-0 min-w-[0rem] opacity-0 max-md:right-full'
      )}
    >
      <Tabs defaultValue='blocks' className='w-full py-5'>
        <TabsList className='grid grid-cols-2 ml-5 max-md:mx-5'>
          <TabsTrigger value='blocks'>Pagina blocks</TabsTrigger>
          <TabsTrigger value='library'>Blocks library</TabsTrigger>
        </TabsList>
        <TabsContent value='blocks'>
          <div className='py-2 min-w-[100vw] md:min-w-[24rem] w-full space-y-4 max-h-[calc(100vh-8.125rem)] h-[calc(100vh-8.125rem)] overflow-auto max-md:px-5 pl-5'>
            <div className='bg-accent p-1 rounded-md'>
              <BlockNavigation
                onClick={() => {
                  setEditorOpen('header')
                }}
                src='/images/block/header.png'
              >
                Header
              </BlockNavigation>
            </div>

            {blocksState?.length ? (
              <DragList
                values={blocksState || []}
                small
                onChange={setBlocks}
                dragItem={dragItem}
              />
            ) : (
              <p className='text-sm m-auto text-center'>
                Nog geen blocks. Selecteer een van de blocks uit de Blocks
                library.
              </p>
            )}
            <div className='bg-accent p-1 rounded-md'>
              <BlockNavigation
                onClick={() => {
                  setEditorOpen('footer')
                }}
                src='/images/block/footer.png'
              >
                Footer
              </BlockNavigation>
            </div>
          </div>
        </TabsContent>
        <TabsContent value='library'>
          <div className='py-2 w-[24rem] max-h-[calc(100vh-6.625rem)] h-[calc(100vh-6.625rem)] overflow-auto max-md:px-5 pl-5'>
            <div className='space-y-4'>
              {Object.entries(htmlBlocks)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([name, item]) => (
                  <div className='bg-accent p-1 rounded-md' key={name}>
                    <BlockNavigation
                      key={name}
                      src={item.previewurl}
                      add
                      onClick={() => {
                        toast.success(
                          `${item.label} toegevoegd aan ${page.name}`
                        )
                        onSelect({
                          ...item,
                          uid: uuidv4(),
                        } as any)
                      }}
                    >
                      {item.label}
                    </BlockNavigation>
                  </div>
                ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  )
}
