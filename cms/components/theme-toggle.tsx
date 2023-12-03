'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='px-2 w-full'>
          <Sun className='h-[1.2rem] mr-2 w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:w-0' />
          <Moon className='mr-2 h-[1.2rem] dark:w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 w-0' />
          {
            {
              light: 'Licht',
              dark: 'Donker',
              system: 'Systeem',
            }[theme as string]
          }
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Licht
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Donker
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          Systeem
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
