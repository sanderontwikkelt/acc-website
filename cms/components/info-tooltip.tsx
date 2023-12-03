import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { QuestionMarkIcon } from '@radix-ui/react-icons'
import React, { ReactNode } from 'react'

const InfoTooltip = ({ children }: { children: ReactNode }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className='ml-2 py-0.5 px-1 rounded-sm bg-accent'>
          <QuestionMarkIcon className='w-3' />
        </TooltipTrigger>
        <TooltipContent>
          <p>{children}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default InfoTooltip
