"use client";

import { useRouter } from "next/navigation";
import { ChevronUp, LogOut, Settings, User, User2Icon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

import { Button } from "~/components/ui/button";
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
} from "~/components/ui/dropdown-menu";

const themes = [
  { value: "light", label: "Licht" },
  { value: "dark", label: "Donker" },
  { value: "system", label: "Systeem" },
];

export function UserNav() {
  const { data: session } = useSession();
  const { setTheme, theme } = useTheme();

  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {!!session?.user && (
          <Button className="relative mt-auto flex h-12 w-full justify-start">
            <User2Icon className="mr-2 w-4" />
            {session.user.name}
            <ChevronUp className="ml-auto w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="center" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Welkom!</p>
            <p className="text-xs leading-none text-muted-foreground">
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
            <User className="mr-2 h-4 w-4" />
            <span>Profiel</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/settings`)}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Instellingen</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Uitloggen</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
