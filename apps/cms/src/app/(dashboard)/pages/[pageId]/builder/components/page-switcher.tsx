"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { Page } from "@prisma/client"
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"

import { ActionEnum, EntityEnum } from "@/types/permissions"
import { cn, useHasPermissions } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { PageForm } from "../../components/page-form"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface PageSwitcherProps extends PopoverTriggerProps {
  pages: Page[]
  page: Page
  mobile: boolean
}

export default function PageSwitcher({
  className,
  pages,
  page,
  mobile,
}: PageSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const [showNewPageDialog, setShowNewPageDialog] = React.useState(false)
  const params = useParams()

  const [canCreate] = useHasPermissions([EntityEnum.PAGE, ActionEnum.CREATE])

  if (!page) {
    router.push("/pages")
    return null
  }

  const frontendUrl = process.env.NEXT_PUBLIC_FRONT_URL || ""

  return (
    <Dialog open={showNewPageDialog} onOpenChange={setShowNewPageDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            role="combobox"
            aria-expanded={open}
            aria-label="Selecteer een pagina"
            className={cn("h-[38px] justify-between px-2 text-xs", className)}
          >
            {mobile ? "" : frontendUrl}
            {page.pathname || "Selecteer een pagina"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Pagina zoeken..." />
              <CommandEmpty>Geen pagina gevonden.</CommandEmpty>
              {pages.map((page) => (
                <CommandItem
                  key={page.id}
                  onSelect={() => {
                    router.push(`/pages/${page.id}/builder`)
                    router.refresh()
                    setOpen(false)
                  }}
                  className="text-sm"
                >
                  {page.name}{" "}
                  {page.concept ? (
                    <span className="ml-2 opacity-50">(concept)</span>
                  ) : (
                    ""
                  )}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      page.id === params.pageId ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
            <CommandSeparator />
            {canCreate && (
              <CommandList>
                <CommandGroup>
                  <DialogTrigger asChild>
                    <CommandItem
                      onSelect={() => {
                        setOpen(false)
                        setShowNewPageDialog(true)
                      }}
                    >
                      <PlusCircledIcon className="mr-2 h-5 w-5" />
                      Pagina aanmaken
                    </CommandItem>
                  </DialogTrigger>
                </CommandGroup>
              </CommandList>
            )}
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pagina Toevoegen</DialogTitle>
          <DialogDescription>Voeg een nieuwe pagina toe</DialogDescription>
        </DialogHeader>
        <PageForm initialData={null} />
      </DialogContent>
    </Dialog>
  )
}
