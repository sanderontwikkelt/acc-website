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
import { permissionActions, permissionEntities } from '@/lib/permissions'
import { cn } from '@/lib/utils'
import { Permission } from '@prisma/client'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

type Option = {
  label: string
  value: string
}

export function PermissionsField({
  form,
  permissions,
  value,
}: {
  form: any
  permissions: Permission[]
  value: string[]
}) {
  const [selectedValues, setSelectedValues] = useState<string[]>(() => value)

  const options = permissionEntities.reduce(
    (a, entity) => [
      ...a,
      ...(permissionActions
        .map((action) => ({
          label: `${entity.label} - ${action.label}`,
          value:
            permissions.find(
              (permission) =>
                permission.action === action.value &&
                entity.value === permission.entity
            )?.id || null,
        }))
        .filter(({ value }) => !!value) as Option[]),
    ],
    [] as Option[]
  )

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
      name='permissionIds'
      render={({ field }) => (
        <FormItem className=' w-[300px]'>
          <FormLabel>Rechten</FormLabel>
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
                <CommandInput placeholder='Search permissions...' />
                <CommandEmpty>Geen rechten gevonden.</CommandEmpty>
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
            Deze rechten zorgen voor toegang door de applicatie.
          </FormDescription>
        </FormItem>
      )}
    />
  )
}
