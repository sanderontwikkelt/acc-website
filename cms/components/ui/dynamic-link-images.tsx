import DragList from './drag-list'
import { Input } from './input'
import MediaSelect, { MediaValue } from './media-select'
import React, { useCallback } from 'react'

type Item = {
  href: string
  image: MediaValue
}

const DynamicLinkImages = ({
  values,
  onChange,
}: {
  values: Item[]
  onChange: (value: Item[]) => void
}) => {
  const handleChange = useCallback(
    (
      value: Item,
      field: 'href' | 'image',
      fieldValue: string | MediaValue,
      index: number
    ) => {
      onChange(
        values.map((oldValue, idx) =>
          idx === index ? { ...value, [field]: fieldValue } : oldValue
        )
      )
    },
    [values]
  )

  const dragItem = useCallback(
    ({ value, index }: { value: Item; index: number }) => (
      <div className='space-y-2 w-full'>
        <MediaSelect
          values={[value.image]}
          onChange={([media]) => handleChange(value, 'image', media, index)}
        />
        <Input
          value={value.href}
          placeholder='Href'
          onChange={(e) => handleChange(value, 'href', e.target.value, index)}
        />
      </div>
    ),
    [values]
  )
  console.log({ values })
  return (
    <DragList
      values={values || []}
      onChange={onChange}
      dragItem={dragItem}
      root
    />
  )
}

export default DynamicLinkImages
