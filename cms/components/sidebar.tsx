import {
  Activity,
  Book,
  Briefcase,
  GraduationCap,
  ImageIcon,
  ListTree,
  User,
  Users,
} from "lucide-react"

import { ActionEnum, EntityEnum } from "@/types/permissions"
import { getPermissions } from "@/lib/user"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarItem,
  SidebarItemContent,
  SidebarItemLabel,
  SidebarItemLink,
} from "@/components/ui/sidebar"

import SidebarSwitch from "./sidebar-switch"
import { UserNav } from "./user-nav"

export async function AdminSideBar({
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [
    canFindUsers,
    canFindRoles,
    canFindMedia,
    canFindPages,
    canFindCategories,
    canFindTeacher,
  ] = await getPermissions(
    [EntityEnum.USER, ActionEnum.FIND],
    [EntityEnum.ROLE, ActionEnum.FIND],
    [EntityEnum.MEDIA, ActionEnum.FIND],
    [EntityEnum.PAGE, ActionEnum.FIND],
    [EntityEnum.CATEGORY, ActionEnum.FIND],
    [EntityEnum.TEACHER, ActionEnum.FIND]
  )

  return (
    <Sidebar
      {...props}
      id="sidebar"
      className={cn(
        "transition-all duration-300 max-md:fixed max-md:inset-0 max-md:w-screen max-md:-translate-x-full"
      )}
    >
      <SidebarItem className="relative flex w-full items-center gap-1 pl-1">
        <span className="sr-only text-xl font-bold">KLEERLIJK</span>
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-black dark:fill-white"
        >
          <mask
            id="mask0_28_740"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="52"
            height="52"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.000244141 0.000200272H51.3297V51.3416H0.000244141V0.000200272Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_28_740)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.6652 1.6896C19.5212 1.6896 13.3822 4.0266 8.70424 8.7036C-0.647756 18.0556 -0.647756 33.2736 8.70424 42.6256C13.2352 47.1556 19.2592 49.6516 25.6652 49.6516C32.0722 49.6516 38.0972 47.1556 42.6262 42.6256C51.9782 33.2736 51.9782 18.0556 42.6262 8.7036C37.9512 4.0276 31.8082 1.6896 25.6652 1.6896ZM25.6652 51.3416C18.8072 51.3416 12.3592 48.6706 7.50924 43.8206C-2.50276 33.8096 -2.50276 17.5196 7.50924 7.5076C17.5232 -2.5034 33.8132 -2.5014 43.8222 7.5076C53.8322 17.5196 53.8322 33.8096 43.8222 43.8206C38.9722 48.6706 32.5252 51.3416 25.6652 51.3416Z"
            />
          </g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.0212 16.6511V27.0341H18.5292C22.6762 27.0341 23.5492 23.8471 23.5492 20.2671C23.5492 15.8461 22.3842 13.6361 19.1972 13.6361C17.3972 13.6361 17.0212 14.2361 17.0212 16.6511ZM19.4592 12.9681C25.9872 12.9681 29.3752 15.8121 29.3752 19.8901C29.3752 23.2821 27.1642 27.7361 18.8892 27.7361H17.0212V33.8531C17.0212 36.5941 17.6552 36.9721 20.7732 37.0061V37.7761H8.81421V37.0741C11.0422 36.9721 11.4362 36.6111 11.4362 34.0591V16.6511C11.4362 14.0991 11.0252 13.7391 8.81421 13.6361V12.9761L19.4592 12.9681Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M36.2589 15.2878L34.6869 19.3738H37.7639L36.2589 15.2878ZM37.8759 12.9678L41.5599 22.4728C41.8419 23.1988 42.2279 23.4288 42.5159 23.4438V23.7468H37.8979V23.4438C38.6239 23.4138 38.9659 23.3028 38.9659 22.8878C38.9659 22.7098 38.9059 22.4728 38.7869 22.1678L37.8759 19.6768H34.5759L34.1679 20.7298C33.8789 21.4718 33.7529 22.0128 33.7529 22.4128C33.7529 23.2138 34.2719 23.4208 35.1019 23.4438V23.7468H32.0479V23.4438C32.4929 23.3618 32.9379 22.9688 33.3679 21.8498L36.8219 12.9678H37.8759Z"
          />
          <mask
            id="mask1_28_740"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="52"
            height="52"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 51.3422H51.33V0.000200272H0V51.3422Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask1_28_740)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32.0371 26.7312H42.5111V25.3722H32.0371V26.7312Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M37.7316 34.9347C37.7316 36.5037 36.4596 37.7767 34.8896 37.7767C33.3196 37.7767 32.0476 36.5037 32.0476 34.9347C32.0476 33.3657 33.3196 32.0927 34.8896 32.0927C36.4596 32.0927 37.7316 33.3657 37.7316 34.9347Z"
            />
          </g>
        </svg>
      </SidebarItem>

      <SidebarItem>
        <SidebarItemLabel>Algemeen</SidebarItemLabel>
        <SidebarItemContent>
          <SidebarItemLink href="/">
            <Activity className="mr-2 h-4 w-4" />
            Analytics
          </SidebarItemLink>
          {canFindUsers && (
            <SidebarItemLink href="/users">
              <Users className="mr-2 h-4 w-4" />
              Gebruikers
            </SidebarItemLink>
          )}
          {canFindRoles && (
            <SidebarItemLink href="/roles">
              <GraduationCap className="mr-2 h-4 w-4" />
              Rollen
            </SidebarItemLink>
          )}
          {canFindMedia && (
            <SidebarItemLink href="/media">
              <ImageIcon className="mr-2 h-4 w-4" />
              Media
            </SidebarItemLink>
          )}
          {canFindPages && (
            <SidebarItemLink href="/pages">
              <ListTree className="mr-2 h-4 w-4" />
              Pagina&apos;s
            </SidebarItemLink>
          )}
        </SidebarItemContent>
      </SidebarItem>

      {(canFindCategories || canFindTeacher) && (
        <SidebarItem>
          <SidebarItemLabel>Gegevens</SidebarItemLabel>
          <SidebarItemContent>
            {canFindTeacher && (
              <SidebarItemLink href="/teachers">
                <GraduationCap className="mr-2 h-4 w-4" />
                Teacher
              </SidebarItemLink>
            )}
          </SidebarItemContent>
        </SidebarItem>
      )}
      <SidebarItem className="relative mt-auto w-full">
        <UserNav />
      </SidebarItem>
      <SidebarSwitch />
    </Sidebar>
  )
}
