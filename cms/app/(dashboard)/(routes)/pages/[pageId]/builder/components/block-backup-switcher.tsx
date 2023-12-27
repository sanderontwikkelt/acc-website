"use client"

import * as React from "react"
import { BlockBackup } from "@prisma/client"
import { ClockIcon } from "lucide-react"

import { BlockType } from "@/lib/html-blocks"
import { cn, formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandItem, CommandList } from "@/components/ui/command"
import { Dialog } from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface BlockBackupSwitcherProps extends PopoverTriggerProps {
  backups: BlockBackup[]
  setBlocks: (b: BlockType[]) => void
}

export default function BlockBackupSwitcher({
  className,
  backups,
  setBlocks,
}: BlockBackupSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [showNewBlockBackupDialog, setShowNewBlockBackupDialog] =
    React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <Dialog
      open={showNewBlockBackupDialog}
      onOpenChange={setShowNewBlockBackupDialog}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            role="combobox"
            aria-expanded={open}
            aria-label="Selecteer een pagina"
            className={cn("justify-between px-2 text-xs", className)}
          >
            <ClockIcon className="w-4" />
          </Button>
        </PopoverTrigger>
        {mounted && (
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandItem disabled className="font-medium">
                  Content historie
                </CommandItem>
                {!backups.length && (
                  <CommandItem>
                    <div className="flex w-full items-center justify-center py-3 text-center text-sm">
                      Geen historie gevonden.
                    </div>
                  </CommandItem>
                )}
                {backups.map((blockBackup, i) => (
                  <CommandItem
                    key={blockBackup.id}
                    onSelect={() => {
                      setBlocks(
                        Array.isArray(blockBackup.blocks)
                          ? (blockBackup.blocks as any)
                          : []
                      )
                      setOpen(false)
                    }}
                    className="flex w-full items-center justify-between text-sm"
                  >
                    Versie {i + 1}
                    <span className="ml-2 text-xs text-muted-foreground">
                      {formatDate(blockBackup.createdAt)}
                    </span>
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>
    </Dialog>
  )
}
