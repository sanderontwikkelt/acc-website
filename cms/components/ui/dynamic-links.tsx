import DragList from './drag-list'
import { Input } from './input'
import React, { useCallback } from 'react'

type Item = { title: string; href: string }

const DynamicLinks = ({
  values,
  onChange,
}: {
  values: Item[]
  onChange: (value: Item[]) => void
}) => {
  const handleChange = useCallback(
    (
      value: Item,
      field: 'title' | 'href',
      fieldValue: string,
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
        <Input
          value={value.title}
          placeholder='Titel'
          onChange={(e) => handleChange(value, 'title', e.target.value, index)}
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

  return (
    <DragList
      values={values || []}
      onChange={onChange}
      dragItem={dragItem}
      root
    />
  )
}

export default DynamicLinks
