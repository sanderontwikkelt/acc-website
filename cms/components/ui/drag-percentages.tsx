'use client'

import { cn } from '@/lib/utils'
import React, { useMemo } from 'react'
import Draggable from 'react-draggable'

type Position = { x: number; y: number }

const DragPercentages: React.FC<{
  className?: string
  position: Position
  setPosition: (p: Position) => void
}> = ({ className, position, setPosition }) => {
  const containerSize = 40
  const childSize = 12
  const handleDrag = (e: any, data: any) => {
    const xPercent = (data.x / (containerSize - childSize)) * 100
    const yPercent = (data.y / (containerSize - childSize)) * 100

    setPosition({ x: xPercent, y: yPercent })
  }

  const pixelPosition = useMemo(() => {
    return {
      x: (position.x / 100) * (containerSize - childSize),
      y: (position.y / 100) * (containerSize - childSize),
    }
  }, [position])

  return (
    <div
      className={cn(
        'relative border rounded-md border-input bg-background min-w-[2.5rem] hover:bg-accent hover:text-accent-foreground w-[2.5rem] h-[2.5rem]',
        className
      )}
    >
      <Draggable
        onDrag={handleDrag}
        position={{ x: pixelPosition.x, y: pixelPosition.y }}
        bounds={{
          left: 0,
          top: 0,
          right: containerSize - childSize,
          bottom: containerSize - childSize,
        }}
      >
        <div className='absolute top-0 left-0 rounded-full cursor-move bg-primary w-3 h-3 text-center'>
          {/* Draggable content */}
        </div>
      </Draggable>
    </div>
  )
}

export default DragPercentages
