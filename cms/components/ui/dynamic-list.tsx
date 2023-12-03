import DragList from './drag-list'
import { Input } from './input'
import MediaSelect, { MediaValue } from './media-select'
import RichText from './rich-text'
import React, { useCallback } from 'react'

type Item = {
  title: string
  subtitle?: string
  author?: string
  href?: string
  description: string
  image?: MediaValue
}

const DynamicList = ({
  values,
  onChange,
}: {
  values: Item[]
  onChange: (value: Item[]) => void
}) => {
  const handleChange = useCallback(
    (
      value: Item,
      field: 'title' | 'description' | 'subtitle' | 'image' | 'href' | 'author',
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
        {value.title !== undefined && (
          <Input
            value={value.title}
            onChange={(e) =>
              handleChange(value, 'title', e.target.value, index)
            }
          />
        )}
        {value.author !== undefined && (
          <Input
            value={value.author}
            onChange={(e) =>
              handleChange(value, 'author', e.target.value, index)
            }
          />
        )}
        {value.subtitle !== undefined && (
          <Input
            value={value.subtitle}
            onChange={(e) =>
              handleChange(value, 'subtitle', e.target.value, index)
            }
          />
        )}
        {value.href !== undefined && (
          <Input
            value={value.href}
            placeholder='Link'
            onChange={(e) => handleChange(value, 'href', e.target.value, index)}
          />
        )}
        <RichText
          id={'drag-list' + index}
          value={value.description}
          onChange={(e) => handleChange(value, 'description', e, index)}
        />
        {!!value.image && (
          <MediaSelect
            values={[value.image]}
            onChange={([media]) => handleChange(value, 'image', media, index)}
          />
        )}
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

export default DynamicList
