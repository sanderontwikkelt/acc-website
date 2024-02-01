"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  PlusIcon,
  TextIcon,
} from "@radix-ui/react-icons";

import { Button } from "@acme/ui/button";

import type { DataTableFilterOption } from "../data-table-types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "../../command";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";

interface DataTableAdvancedFilterProps<TData> {
  options: DataTableFilterOption<TData>[];
  selectedOptions: DataTableFilterOption<TData>[];
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<DataTableFilterOption<TData>[]>
  >;
  children?: React.ReactNode;
}

export function DataTableAdvancedFilter<TData>({
  options,
  selectedOptions,
  setSelectedOptions,
  children,
}: DataTableAdvancedFilterProps<TData>) {
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<
    DataTableFilterOption<TData> | undefined
  >(options[0]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children ?? (
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            className="capitalize"
          >
            Filter
            <CaretSortIcon
              className="ml-2 h-4 w-4 shrink-0 opacity-50"
              aria-hidden="true"
            />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="p-0" align="end">
        <Command>
          <CommandInput placeholder="Filter by..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={String(option.value)}
                className="capitalize"
                value={String(option.label)}
                onSelect={(currentValue: string) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  setSelectedOption(option);
                  setSelectedOptions((prev) => {
                    if (currentValue === value) {
                      return prev.filter((item) => item.value !== option.value);
                    } else {
                      return [...prev, option];
                    }
                  });
                }}
              >
                {option.items.length > 0 ? (
                  <ChevronDownIcon
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                ) : (
                  <TextIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                )}
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                setSelectedOptions([
                  ...selectedOptions,
                  {
                    id: crypto.randomUUID(),
                    label: String(selectedOption?.label),
                    value: String(selectedOption?.value),
                    items: selectedOption?.items ?? [],
                    isMulti: true,
                  },
                ]);
              }}
            >
              <PlusIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Advanced filter
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
