'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Role } from '@prisma/client'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

export function RolesField({
  form,
  roles,
  value,
}: {
  form: any
  roles: Role[]
  value: string[]
}) {
  const [selectedValues, setSelectedValues] = useState<string[]>(() => value)

  const options = roles.map(({ id, name }) => ({ label: name, value: id }))

  const toggleValue = (value: string, cb: (s: string[]) => void) => {
    let newValues: string[] = []
    if (selectedValues.includes(value)) {
      newValues = selectedValues.filter((v) => v !== value)
    } else {
      newValues = [...selectedValues, value]
    }
    setSelectedValues(newValues)
    cb(newValues)
  }

  return (
    <FormField
      control={form.control}
      name='roleIds'
      render={({ field }) => (
        <FormItem className=' w-[300px]'>
          <FormLabel>Rollen</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-haspopup='listbox'
                  className={cn(
                    'w-full justify-between',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {`${selectedValues.length} geselecteerd`}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-[300px] p-0 max-h-[50vh] overflow-auto'>
              <Command>
                <CommandInput placeholder='Search roles...' />
                <CommandEmpty>Geen rollen gevonden.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      value={option.label}
                      key={option.value}
                      onSelect={() => toggleValue(option.value, field.onChange)}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedValues.includes(option.value)
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>
            Deze rollen zorgen voor toegang door de applicatie.
          </FormDescription>
        </FormItem>
      )}
    />
  )
}
