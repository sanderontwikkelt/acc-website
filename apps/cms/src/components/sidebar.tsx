import {
  Activity,
  ClipboardList,
  GraduationCap,
  ImageIcon,
  Package,
  ShoppingBag,
  TriangleIcon,
  Users,
} from "lucide-react";
import { ActionEnum, EntityEnum } from "types/permissions";

import {
  Sidebar,
  SidebarItem,
  SidebarItemContent,
  SidebarItemLabel,
  SidebarItemLink,
} from "~/components/ui/sidebar";
import { getPermissions } from "~/lib/user";
import { cn } from "~/lib/utils";
import SidebarSwitch from "./sidebar-switch";
import { UserNav } from "./user-nav";

export async function AdminSideBar({
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [
    canFindUsers,
    canFindRoles,
    canFindMedia,
    canFindProducts,
    canFindProductCategories,
    canFindOrders,
    canFindCarts,
  ] = await getPermissions(
    [EntityEnum.USER, ActionEnum.FIND],
    [EntityEnum.ROLE, ActionEnum.FIND],
    [EntityEnum.MEDIA, ActionEnum.FIND],
    [EntityEnum.PRODUCT, ActionEnum.FIND],
    [EntityEnum.PRODUCTCATEGORY, ActionEnum.FIND],
    [EntityEnum.ORDER, ActionEnum.FIND],
    [EntityEnum.CART, ActionEnum.FIND],
  );

  return (
    <Sidebar
      {...props}
      id="sidebar"
      className={cn(
        "h-screen transition-all duration-300 max-md:fixed max-md:inset-0 max-md:w-[calc(100vw-2rem)] max-md:-translate-x-[calc(100%+2rem)]",
      )}
    >
      <SidebarItem className="relative flex w-full items-center gap-1 pl-1">
        <span className="sr-only text-xl font-bold">Physis</span>
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          className="fill-foreground"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_11_830"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="52"
            height="52"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0.000200272H51.3295V51.3416H0V0.000200272Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_11_830)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.665 1.6896C19.521 1.6896 13.382 4.0266 8.704 8.7036C-0.648 18.0556 -0.648 33.2736 8.704 42.6256C13.235 47.1556 19.259 49.6516 25.665 49.6516C32.072 49.6516 38.097 47.1556 42.626 42.6256C51.978 33.2736 51.978 18.0556 42.626 8.7036C37.951 4.0276 31.808 1.6896 25.665 1.6896ZM25.665 51.3416C18.807 51.3416 12.359 48.6706 7.509 43.8206C-2.503 33.8096 -2.503 17.5196 7.509 7.5076C17.523 -2.5034 33.813 -2.5014 43.822 7.5076C53.832 17.5196 53.832 33.8096 43.822 43.8206C38.972 48.6706 32.525 51.3416 25.665 51.3416Z"
            />
          </g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.0215 16.6511V27.0341H18.5295C22.6765 27.0341 23.5495 23.8471 23.5495 20.2671C23.5495 15.8461 22.3845 13.6361 19.1975 13.6361C17.3975 13.6361 17.0215 14.2361 17.0215 16.6511ZM19.4595 12.9681C25.9875 12.9681 29.3755 15.8121 29.3755 19.8901C29.3755 23.2821 27.1645 27.7361 18.8895 27.7361H17.0215V33.8531C17.0215 36.5941 17.6555 36.9721 20.7735 37.0061V37.7761H8.81445V37.0741C11.0425 36.9721 11.4365 36.6111 11.4365 34.0591V16.6511C11.4365 14.0991 11.0255 13.7391 8.81445 13.6361V12.9761L19.4595 12.9681Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M36.2598 15.2878L34.6878 19.3738H37.7648L36.2598 15.2878ZM37.8768 12.9678L41.5608 22.4728C41.8428 23.1988 42.2288 23.4288 42.5168 23.4438V23.7468H37.8988V23.4438C38.6248 23.4138 38.9668 23.3028 38.9668 22.8878C38.9668 22.7098 38.9068 22.4728 38.7878 22.1678L37.8768 19.6768H34.5768L34.1688 20.7298C33.8798 21.4718 33.7538 22.0128 33.7538 22.4128C33.7538 23.2138 34.2728 23.4208 35.1028 23.4438V23.7468H32.0488V23.4438C32.4938 23.3618 32.9388 22.9688 33.3688 21.8498L36.8228 12.9678H37.8768Z"
          />
          <mask
            id="mask1_11_830"
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
          <g mask="url(#mask1_11_830)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32.0371 26.7312H42.5111V25.3722H32.0371V26.7312Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M37.7309 34.9347C37.7309 36.5037 36.4589 37.7767 34.8889 37.7767C33.3189 37.7767 32.0469 36.5037 32.0469 34.9347C32.0469 33.3657 33.3189 32.0927 34.8889 32.0927C36.4589 32.0927 37.7309 33.3657 37.7309 34.9347Z"
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
        </SidebarItemContent>
      </SidebarItem>

      {(canFindProductCategories || canFindProducts || canFindOrders || canFindCarts) && (
        <SidebarItem>
          <SidebarItemLabel>Webshop</SidebarItemLabel>
          <SidebarItemContent>
            {canFindProductCategories && (
              <SidebarItemLink href="/product-categories">
                <TriangleIcon className="mr-2 h-4 w-4" />
                Productcategoriën
              </SidebarItemLink>
            )}
            {canFindProducts && (
              <SidebarItemLink href="/products">
                <Package className="mr-2 h-4 w-4" />
                Producten
              </SidebarItemLink>
            )}
            {canFindOrders && (
              <SidebarItemLink href="/orders">
                <ClipboardList className="mr-2 h-4 w-4" />
                Bestellingen
              </SidebarItemLink>
            )}
            {canFindCarts && (
              <SidebarItemLink href="/carts">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Winkelmanden
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
  );
}
