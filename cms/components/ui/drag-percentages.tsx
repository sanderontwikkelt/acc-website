"use client"

import React, { useMemo } from "react"
import Draggable from "react-draggable"

import { cn } from "@/lib/utils"

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
        "relative h-[2.5rem] w-[2.5rem] min-w-[2.5rem] rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground",
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
        <div className="absolute left-0 top-0 h-3 w-3 cursor-move rounded-full bg-primary text-center">
          {/* Draggable content */}
        </div>
      </Draggable>
    </div>
  )
}

export default DragPercentages
