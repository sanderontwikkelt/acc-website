import {
  Activity,
  ClipboardList,
  GraduationCap,
  ImageIcon,
  ListTree,
  Package,
  ShoppingBag,
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
    canFindOrders,
    canFindCarts,
  ] = await getPermissions(
    [EntityEnum.USER, ActionEnum.FIND],
    [EntityEnum.ROLE, ActionEnum.FIND],
    [EntityEnum.MEDIA, ActionEnum.FIND],
    [EntityEnum.PRODUCT, ActionEnum.FIND],
    [EntityEnum.ORDER, ActionEnum.FIND],
    [EntityEnum.CART, ActionEnum.FIND],
  );

  return (
    <Sidebar
      {...props}
      id="sidebar"
      className={cn(
        "h-screen transition-all duration-300 max-md:fixed max-md:inset-0 max-md:w-screen max-md:-translate-x-full",
      )}
    >
      <SidebarItem className="relative flex w-full items-center gap-1 pl-1">
        <span className="sr-only text-xl font-bold">Sockwave</span>
        <svg
          width="71"
          height="31"
          className="h-14 w-auto"
          viewBox="0 0 71 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 31H11.6C16.2392 31 20 27.7615 20 23.7667V10.3333H8V31Z"
            fill="#3056D3"
          />
          <path
            d="M20 0H16.4C11.7608 0 8 3.23847 8 7.23333V20.6667H20V0Z"
            fill="#3056D3"
          />
          <path
            opacity="0.6"
            d="M0 24C0 23.4477 0.447715 23 1 23H8V31H5.6C2.50721 31 0 28.4928 0 25.4V24Z"
            fill="#3056D3"
          />
          <path
            opacity="0.6"
            d="M28 1C28 0.447715 27.5523 0 27 0H20V8H22.4C25.4928 8 28 5.4928 28 2.4V1Z"
            fill="#3056D3"
          />
          <path
            d="M27.2152 23L24.4411 13.1818H26.7997L28.5256 20.0852H28.6151L30.3793 13.1818H32.7124L34.4766 20.0469H34.5724L36.2727 13.1818H38.6378L35.8572 23H33.4474L31.6065 16.3651H31.4723L29.6314 23H27.2152ZM43.0787 23.1982C42.4565 23.1982 41.8961 23.0874 41.3975 22.8658C40.9032 22.6399 40.5112 22.3075 40.2214 21.8686C39.9359 21.4297 39.7931 20.8885 39.7931 20.245C39.7931 19.6911 39.8954 19.233 40.1 18.8707C40.3045 18.5085 40.5836 18.2188 40.9373 18.0014C41.291 17.7841 41.6895 17.62 42.1326 17.5092C42.5801 17.3942 43.0424 17.3111 43.5197 17.2599C44.095 17.2003 44.5616 17.147 44.9196 17.1001C45.2775 17.049 45.5375 16.9723 45.6994 16.87C45.8656 16.7635 45.9487 16.5994 45.9487 16.3778V16.3395C45.9487 15.858 45.8059 15.4851 45.5204 15.2209C45.2349 14.9567 44.8237 14.8246 44.2868 14.8246C43.72 14.8246 43.2704 14.9482 42.938 15.1953C42.6099 15.4425 42.3883 15.7344 42.2733 16.071L40.1127 15.7642C40.2832 15.1676 40.5645 14.669 40.9565 14.2685C41.3485 13.8636 41.8279 13.5611 42.3947 13.3608C42.9615 13.1562 43.5879 13.054 44.274 13.054C44.747 13.054 45.2179 13.1094 45.6866 13.2202C46.1554 13.331 46.5836 13.5142 46.9714 13.7699C47.3592 14.0213 47.6703 14.3643 47.9047 14.799C48.1433 15.2337 48.2626 15.777 48.2626 16.429V23H46.0382V21.6513H45.9615C45.8208 21.924 45.6227 22.1797 45.367 22.4183C45.1156 22.6527 44.7981 22.8423 44.4146 22.9872C44.0353 23.1278 43.59 23.1982 43.0787 23.1982ZM43.6795 21.4979C44.144 21.4979 44.5467 21.4062 44.8876 21.223C45.2285 21.0355 45.4906 20.7884 45.6738 20.4815C45.8613 20.1747 45.9551 19.8402 45.9551 19.478V18.321C45.8826 18.3807 45.7591 18.4361 45.5843 18.4872C45.4139 18.5384 45.2221 18.5831 45.0091 18.6214C44.796 18.6598 44.585 18.6939 44.3762 18.7237C44.1674 18.7536 43.9863 18.7791 43.8329 18.8004C43.4877 18.8473 43.1788 18.924 42.9061 19.0305C42.6333 19.1371 42.4181 19.2862 42.2605 19.478C42.1028 19.6655 42.024 19.9084 42.024 20.2067C42.024 20.6328 42.1795 20.9545 42.4906 21.1719C42.8017 21.3892 43.198 21.4979 43.6795 21.4979ZM59.0076 13.1818L55.5112 23H52.9544L49.4579 13.1818H51.9252L54.1816 20.4751H54.2839L56.5467 13.1818H59.0076ZM64.6214 23.1918C63.6371 23.1918 62.7869 22.9872 62.071 22.5781C61.3594 22.1648 60.8118 21.581 60.4283 20.8267C60.0447 20.0682 59.853 19.1754 59.853 18.1484C59.853 17.1385 60.0447 16.2521 60.4283 15.4893C60.8161 14.7223 61.3572 14.1257 62.0518 13.6996C62.7464 13.2692 63.5625 13.054 64.5 13.054C65.1051 13.054 65.6761 13.152 66.2131 13.348C66.7543 13.5398 67.2315 13.8381 67.6449 14.2429C68.0625 14.6477 68.3906 15.1634 68.6293 15.7898C68.8679 16.4119 68.9872 17.1534 68.9872 18.0142V18.7237H60.9396V17.1641H66.7692C66.7649 16.7209 66.669 16.3267 66.4815 15.9815C66.294 15.6321 66.032 15.3572 65.6953 15.157C65.3629 14.9567 64.9751 14.8565 64.532 14.8565C64.0589 14.8565 63.6435 14.9716 63.2855 15.2017C62.9276 15.4276 62.6484 15.7259 62.4482 16.0966C62.2521 16.4631 62.152 16.8658 62.1477 17.3047V18.6662C62.1477 19.2372 62.2521 19.7273 62.4609 20.1364C62.6697 20.5412 62.9616 20.8523 63.3366 21.0696C63.7116 21.2827 64.1506 21.3892 64.6534 21.3892C64.9901 21.3892 65.2947 21.3423 65.5675 21.2486C65.8402 21.1506 66.0767 21.0078 66.277 20.8203C66.4773 20.6328 66.6286 20.4006 66.7308 20.1236L68.8913 20.3665C68.755 20.9375 68.495 21.4361 68.1115 21.8622C67.7322 22.2841 67.2464 22.6122 66.6541 22.8466C66.0618 23.0767 65.3842 23.1918 64.6214 23.1918Z"
            fill="#1C2033"
          />
          <path
            d="M24 26V26C24.412 25.176 25.588 25.176 26 26V26C26.412 26.824 27.588 26.824 28 26V26C28.412 25.176 29.588 25.176 30 26V26C30.412 26.824 31.588 26.824 32 26V26C32.412 25.176 33.588 25.176 34 26V26C34.412 26.824 35.588 26.824 36 26V26C36.412 25.176 37.588 25.176 38 26V26C38.412 26.824 39.588 26.824 40 26V26C40.412 25.176 41.588 25.176 42 26V26C42.412 26.824 43.588 26.824 44 26V26C44.412 25.176 45.588 25.176 46 26V26C46.412 26.824 47.588 26.824 48 26V26C48.412 25.176 49.588 25.176 50 26V26C50.412 26.824 51.588 26.824 52 26V26C52.412 25.176 53.588 25.176 54 26V26C54.412 26.824 55.588 26.824 56 26V26C56.412 25.176 57.588 25.176 58 26V26C58.412 26.824 59.588 26.824 60 26V26C60.412 25.176 61.588 25.176 62 26V26C62.412 26.824 63.588 26.824 64 26V26C64.412 25.176 65.588 25.176 66 26V26C66.412 26.824 67.588 26.824 68 26V26C68.412 25.176 69.588 25.176 70 26V26"
            stroke="#3056D3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
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

      {(canFindProducts || canFindOrders || canFindCarts) && (
        <SidebarItem>
          <SidebarItemLabel>Webshop</SidebarItemLabel>
          <SidebarItemContent>
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
