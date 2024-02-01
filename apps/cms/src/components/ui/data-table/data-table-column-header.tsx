import type { Column } from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={
              column.getIsSorted() === "desc"
                ? `Sorted descending. Click to sort ascending.`
                : column.getIsSorted() === "asc"
                  ? `Sorted ascending. Click to sort descending.`
                  : `Not sorted. Click to sort ascending.`
            }
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
            variant="ghost"
            data-pw={"data-table-sort-" + column.id}
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            aria-label="Sort ascending"
            data-pw="data-table-sort-asc"
            onClick={() => column.toggleSorting(false)}
          >
            <ArrowUpIcon
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            aria-label="Sort descending"
            data-pw="data-table-sort-desc"
            onClick={() => column.toggleSorting(true)}
          >
            <ArrowDownIcon
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            aria-label="Hide column"
            onClick={() => column.toggleVisibility(false)}
          >
            <EyeNoneIcon
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
