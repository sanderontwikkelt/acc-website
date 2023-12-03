import { Button } from './button'
import DragList from './drag-list'
import {
  ButtonValue,
  CollapsibleButton,
} from '@/app/(dashboard)/(routes)/pages/[pageId]/builder/components/collapsable-button'
import { LinkIcon } from 'lucide-react'
import React, { useCallback } from 'react'

const DynamicButtonList = ({
  value,
  onChange,
  disabled,
}: {
  disabled?: boolean
  value: ButtonValue[]
  onChange: (value: ButtonValue[]) => void
}) => {
  const dragItem = useCallback(
    ({ value: buttonValue, index }: { value: ButtonValue; index: number }) => (
      <div className='space-y-2 w-full'>
        <CollapsibleButton
          value={buttonValue}
          setValue={(v) =>
            onChange(
              value.map((oldValue, idx) => (idx === index ? v : oldValue))
            )
          }
        >
          {null}
        </CollapsibleButton>
      </div>
    ),
    [value]
  )

  return (
    <div className='space-y-4'>
      <DragList
        className='p-0 mb-0'
        disabled={disabled}
        values={value || []}
        onChange={onChange}
        dragItem={dragItem}
        root
      />
    </div>
  )
}

export default DynamicButtonList
