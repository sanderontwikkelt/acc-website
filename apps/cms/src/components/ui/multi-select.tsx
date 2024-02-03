import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, cn } from '@acme/ui'
import { Check, ChevronsUpDown } from 'lucide-react'

const MultiSelect = ({ options, selectedValues = [], onChange, disabled }: { disabled?: boolean; options?: { label: string; value: string}[]; selectedValues: string[]; onChange: (v: string[]) => void}) => {
    const toggleValue = (value: string) => {
        let newValues: string[] = [];
        if (selectedValues.some((v) => +v === +value)) {
          newValues = selectedValues.filter((v) => +v !== +value);
        } else {
          newValues = [...selectedValues, value];
        }
        onChange(newValues);
      };
  return (
    <Popover>
            <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  disabled={disabled}
                  role="combobox"
                  aria-haspopup="listbox"
                  className={cn(
                    "w-full justify-between",
                  )}
                >
                  {`${selectedValues.length} geselecteerd`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="max-h-[50vh] w-[300px] overflow-auto p-0">
              <Command>
                <CommandInput placeholder="Search permissions..." />
                <CommandEmpty>Geen rechten gevonden.</CommandEmpty>
                <CommandGroup>
                  {options?.map((option) => (
                    <CommandItem
                      value={option.label}
                      key={option.value}
                      onSelect={() => toggleValue(option.value)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedValues.some((v) => +v === +option.value)
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
  )
}

export default MultiSelect