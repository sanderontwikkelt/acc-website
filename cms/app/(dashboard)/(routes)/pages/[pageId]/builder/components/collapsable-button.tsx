'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

export type ButtonValue = {
  title: string
  children: React.ReactNode
  href: string
  target: '_blank' | '_self'
  variant: 'default' | 'accent' | 'main' | 'outline' | 'link'
  rounded: 'default' | 'sm' | 'md'
  size: 'default' | 'lg'
  withArrow: boolean
}

type Props = {
  children: React.ReactNode
  value: ButtonValue
  setValue: (v: ButtonValue) => void
}

export function CollapsibleButton({ children, value, setValue }: Props) {
  const { title, href, target, withArrow, variant, rounded, size } = value
  const [isOpen, setIsOpen] = React.useState(false)

  const onChange = (f: string, v: string) => setValue({ ...value, [f]: v })

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className='w-full space-y-2 h-full'
    >
      <div className='flex items-center justify-between space-x-4 h-full'>
        {children || (
          <div className='space-y-2 w-full'>
            <Input
              placeholder='Titel'
              value={title}
              onChange={(e) => onChange('title', e.target.value)}
            />
          </div>
        )}
        <CollapsibleTrigger asChild>
          <Button variant='outline' size='icon' className='w-9 p-0'>
            <ChevronsUpDown className='h-4 w-4' />
            <span className='sr-only'>Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className='space-y-2'>
        {!!children && (
          <div className='space-y-2'>
            <Input
              placeholder='Titel'
              value={title}
              onChange={(e) => onChange('title', e.target.value)}
            />
          </div>
        )}
        <CollapsibleContent className='space-y-2'>
          <Input
            placeholder='Navigeer naar'
            value={href}
            onChange={(e) => onChange('href', e.target.value)}
          />
          <Select
            value={target}
            onValueChange={(value) => onChange('target', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Selecteer target' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='_self'>Self</SelectItem>
              <SelectItem value='_blank'>Blank</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={variant}
            onValueChange={(value) => onChange('variant', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Selecteer variant' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='default'>Standaard</SelectItem>
              <SelectItem value='accent'>Accent</SelectItem>
              <SelectItem value='main'>Primair</SelectItem>
              <SelectItem value='outline'>Omranding</SelectItem>
              <SelectItem value='success'>Succes</SelectItem>
              <SelectItem value='link'>Link</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={size}
            onValueChange={(value) => onChange('size', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Selecteer formaat' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='default'>Normaal</SelectItem>
              <SelectItem value='lg'>Groot</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={rounded}
            onValueChange={(value) => onChange('rounded', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Selecteer radius' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='default'>Geen</SelectItem>
              <SelectItem value='sm'>Klein</SelectItem>
              <SelectItem value='md'>Middel</SelectItem>
            </SelectContent>
          </Select>

          <div className='flex items-center space-x-2 pt-1'>
            <Checkbox
              checked={withArrow}
              // @ts-ignore
              onCheckedChange={(checked) => onChange('withArrow', checked)}
            />
            <Label>Met pijl</Label>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
