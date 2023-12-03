import TooltipWrapper from '../tooltip-wrapper'
import { cn } from '@/lib/utils'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { DragHandleDots2Icon } from '@radix-ui/react-icons'
import { CopyIcon, PlusIcon } from 'lucide-react'
import React, { ReactNode } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'

type Props = {
  onChange: (value: any[]) => void
  values: any[]
  dragItem: (
    {
      key,
      value,
    }: {
      key: string
      value: any
      index: number
    },
    i: number
  ) => ReactNode
  disabled?: boolean
  root?: boolean
  small?: boolean
  className?: string
}

const DragList = ({
  values,
  onChange,
  dragItem,
  disabled,
  className = '',
  root = false,
  small = false,
}: Props) => {
  const handleDrop = (droppedItem: any) => {
    if (!droppedItem.destination) return
    const updatedList = [...values]
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1)
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem)
    onChange(updatedList)
  }

  return (
    <div className='relative'>
      {root && (
        <button
          onClick={() => onChange([...values, { ...values[0], id: uuidv4() }])}
          className='absolute right-0 -top-8 p-1'
        >
          <TooltipWrapper message='Toevoegen'>
            <PlusIcon className='h-5 w-5' />
          </TooltipWrapper>
        </button>
      )}
      {values?.length ? (
        values?.length > 1 ? (
          <DragDropContext onDragEnd={handleDrop}>
            <Droppable droppableId='list-container'>
              {(provided) => (
                <div
                  className={cn(
                    'list-container space-y-1 mb-4 bg-accent p-1 rounded-md',
                    disabled ? 'pointer-events-none' : '',
                    className
                  )}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {values.map((item, index) => {
                    if (!item) return
                    if (!item.id) item.id = uuidv4()
                    return (
                      <Draggable
                        key={item.id + index}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className='item-container'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <div
                              className={cn(
                                'flex flex-col card items-start space-y-3 border w-full rounded-md shadow-sm bg-background p-2 hover:shadow-md'
                              )}
                            >
                              <div className='flex items-center w-full'>
                                <div {...provided.dragHandleProps}>
                                  <TooltipWrapper message='Verslepen'>
                                    <DragHandleDots2Icon className='w-auto rotate-90 h-6' />
                                  </TooltipWrapper>
                                </div>
                                {!!small && (
                                  <div className='px-1 w-full'>
                                    {dragItem(
                                      {
                                        key: item.name || item.id,
                                        value: item,
                                        index,
                                      },
                                      index
                                    )}
                                  </div>
                                )}
                                <button
                                  onClick={() =>
                                    onChange([
                                      ...values,
                                      { ...item, id: uuidv4() },
                                    ])
                                  }
                                  className='ml-auto'
                                >
                                  <TooltipWrapper message='Dupliceren'>
                                    <CopyIcon className='h-4 w-4' />
                                  </TooltipWrapper>
                                </button>

                                <button
                                  onClick={() =>
                                    onChange(
                                      values.filter((_, idx) => idx !== index)
                                    )
                                  }
                                  className='ml-[0.75rem]'
                                >
                                  <TooltipWrapper message='Verwijderen'>
                                    <XMarkIcon className='h-6 w-6' />
                                  </TooltipWrapper>
                                </button>
                              </div>
                              {!small && (
                                <div className='w-full flex items-center'>
                                  {dragItem(
                                    {
                                      key: item.name || item.id,
                                      value: item,
                                      index,
                                    },
                                    index
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className='mb-2'>
            <div
              className={cn(
                'flex card items-center border border-input w-full rounded-md shadow-sm bg-background p-2'
              )}
            >
              {!!values[0] &&
                dragItem(
                  {
                    key: values[0].name || values[0].id,
                    value: values[0],
                    index: 0,
                  },
                  0
                )}
            </div>
          </div>
        )
      ) : null}
    </div>
  )
}

export default DragList
