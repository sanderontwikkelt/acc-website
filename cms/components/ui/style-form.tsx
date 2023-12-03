import { Label } from './label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { ReactNode, useCallback } from 'react'

const paddingOptions = [
  { label: 'Geen', key: '0px' },
  { label: 'SM', key: '40px' },
  { label: 'M', key: '80px' },
  { label: 'L', key: '120px' },
  { label: 'XL', key: '160px' },
]
const Padding = ({
  value,
  onChange,
  label,
}: {
  value: string
  label: ReactNode
  onChange: (v: string) => void
}) => (
  <div className='space-y-2'>
    <Label>{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder='Selecteer een afstand' />
      </SelectTrigger>
      <SelectContent>
        {paddingOptions?.map(
          ({ key, label }: { key: string; label: string }) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  </div>
)

const StyleForm = ({
  value = {},
  onChange,
  append,
}: {
  append: string
  value: any
  onChange: (v: any) => void
}) => {
  const handleChange = useCallback(
    (v: string, field: string) => {
      onChange({ ...value, [field]: v })
    },
    [value]
  )

  const label = (a: string, l: string) => (
    <>
      {l}{' '}
      <span className='bg-accent text-xs font-normal text-opacity-80 px-1 py-0.5 rounded-sm'>
        {a}
      </span>
    </>
  )
  return (
    <>
      <div className='space-y-2'>
        <Label>Achtergrondkleur</Label>
        <Select
          value={value.backgroundColor}
          onValueChange={(v) => handleChange(v, 'backgroundColor')}
          defaultValue='transparent'
        >
          <SelectTrigger>
            <SelectValue placeholder='Selecteer een variant' />
          </SelectTrigger>
          <SelectContent>
            {[
              { key: 'transparent', label: 'Transparant' },
              { key: '#fff', label: 'Wit' },
              { key: '#0F1012', label: 'Donker' },
              { key: '#E9EAEC', label: 'Grijs' },
              { key: '#E6E1C9', label: 'Geel' },
              { key: '#C5CEDF', label: 'Blauw' },
            ].map(({ key, label }: { key: string; label: string }) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='space-y-2'>
        <Label>Tekstkleur</Label>
        <Select
          value={value.backgroundColor}
          onValueChange={(v) => handleChange(v, 'color')}
          defaultValue='#0F1012'
        >
          <SelectTrigger>
            <SelectValue placeholder='Selecteer een variant' />
          </SelectTrigger>
          <SelectContent>
            {[
              { key: '#fff', label: 'Wit' },
              { key: '#0F1012', label: 'Donker' },
            ].map(({ key, label }: { key: string; label: string }) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Padding
        value={value.paddingTop}
        onChange={(v) => handleChange(v, 'paddingTop')}
        label={label(append, 'Ruimte boven')}
      />
      <Padding
        value={value.paddingBottom}
        onChange={(v) => handleChange(v, 'paddingBottom')}
        label={label(append, 'Ruimte onder')}
      />
    </>
  )
}

export default StyleForm
