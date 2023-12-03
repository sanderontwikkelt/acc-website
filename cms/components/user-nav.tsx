'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  LogOut,
  Settings,
  User,
  User2Icon,
  UserCogIcon,
  UserIcon,
  UserX2Icon,
  Users2Icon,
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

const themes = [
  { value: 'light', label: 'Licht' },
  { value: 'dark', label: 'Donker' },
  { value: 'system', label: 'Systeem' },
]

export async function UserNav() {
  const { data: session } = useSession()
  const { setTheme, theme } = useTheme()

  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='relative h-10 text-sm px-1 flex space-x-2'
        >
          <span className='whitespace-nowrap truncate max-w-full'>
            Welkom, {session?.user.name}!
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='' align='start' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>Welkom!</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {session?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={theme}>
              {themes.map((theme) => (
                <DropdownMenuRadioItem
                  key={theme.value}
                  value={theme.value}
                  onClick={() => setTheme(theme.value)}
                >
                  {theme.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push(`/users/${session?.user.id}`)}
          >
            <User className='mr-2 h-4 w-4' />
            <span>Profiel</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/settings`)}>
            <Settings className='mr-2 h-4 w-4' />
            <span>Instellingen</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Uitloggen</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
