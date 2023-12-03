import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import React, { ReactNode } from 'react'

const TooltipWrapper = ({
  children,
  disabled,
  message,
}: {
  children: ReactNode
  disabled?: boolean
  message: ReactNode
}) => {
  return (
    <TooltipProvider disableHoverableContent={disabled}>
      <Tooltip>
        <TooltipTrigger className='h-full flex items-center'>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipWrapper
