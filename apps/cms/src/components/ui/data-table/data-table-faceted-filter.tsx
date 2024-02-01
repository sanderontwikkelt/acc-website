import type { Column } from "@tanstack/react-table";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";

import {
  cn,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@acme/ui";
import { Button } from "@acme/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@acme/ui/popover";
import { Separator } from "@acme/ui/separator";

import type { Option } from "./data-table-types";
import { Badge } from "../badge";

interface DataTableFacetedFilter<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: Option[];
  variant?: "popover" | "command";
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  variant = "popover",
  ...props
}: DataTableFacetedFilter<TData, TValue>) {
  const selectedValues = new Set(column?.getFilterValue() as string[]);
  return (
    <>
      {variant === "popover" ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-dashed"
              {...props}
            >
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              {title}
              {selectedValues?.size > 0 && (
                <>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal lg:hidden"
                  >
                    {selectedValues.size}
                  </Badge>
                  <div className="hidden space-x-1 lg:flex">
                    {selectedValues.size > 2 ? (
                      <Badge
                        variant="secondary"
                        className="rounded-sm px-1 font-normal"
                      >
                        {selectedValues.size} geselecteerd
                      </Badge>
                    ) : (
                      options
                        .filter((option) => selectedValues.has(option.value))
                        .map((option) => (
                          <Badge
                            variant="secondary"
                            key={option.value}
                            className="rounded-sm px-1 font-normal"
                          >
                            {option.label}
                          </Badge>
                        ))
                    )}
                  </div>
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder={title} />
              <CommandList>
                <CommandEmpty>Geen resultaten</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = selectedValues.has(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        data-pw="faceted_filter_option"
                        onSelect={() => {
                          if (isSelected) {
                            selectedValues.delete(option.value);
                          } else {
                            selectedValues.add(option.value);
                          }
                          const filterValues = Array.from(selectedValues);
                          column?.setFilterValue(
                            filterValues.length ? filterValues : undefined,
                          );
                        }}
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible",
                          )}
                        >
                          <CheckIcon
                            className={cn("h-4 w-4")}
                            aria-hidden="true"
                          />
                        </div>
                        {option.icon && (
                          <option.icon
                            className="mr-2 h-4 w-4 text-muted-foreground"
                            aria-hidden="true"
                          />
                        )}
                        <span>{option.label}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                {selectedValues.size > 0 && (
                  <>
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => column?.setFilterValue(undefined)}
                        className="justify-center text-center"
                      >
                        Filters verwijderen
                      </CommandItem>
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      ) : (
        <Command className="p-1">
          <CommandInput
            placeholder={title}
            className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
          <CommandList className="mt-1">
            <CommandEmpty>Geen resultaten</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined,
                      );
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} aria-hidden="true" />
                    </div>
                    {option.icon && (
                      <option.icon
                        className="mr-2 h-4 w-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Filters verwijderen
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      )}
    </>
  );
}
