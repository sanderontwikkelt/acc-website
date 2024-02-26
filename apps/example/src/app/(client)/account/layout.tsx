"use client";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  BellIcon,
  CreditCardIcon,
  KeyIcon,
  SquaresPlusIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import { cn } from "@acme/ui";

const subNavigation = [
  { name: "Account", href: "/account", icon: UserCircleIcon, current: false },
  {
    name: "Password",
    href: "/account/password",
    icon: KeyIcon,
    current: false,
  },
  {
    name: "Notifications",
    href: "/account/notifications",
    icon: BellIcon,
    current: false,
  },
  {
    name: "Billing",
    href: "/account/billing",
    icon: CreditCardIcon,
    current: true,
  },
  {
    name: "Cookies",
    href: "/account/cookies",
    icon: SquaresPlusIcon,
    current: false,
  },
];

export default function AccountLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="h-full bg-gray-100">
        <section className="dark:bg-dark pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]">
          <div className="container relative mx-auto">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
              <aside className="top-36 h-min px-2 py-6 sm:px-6 lg:sticky lg:col-span-3 lg:px-0 lg:py-0">
                <nav className="space-y-1">
                  {subNavigation.map((item) => {
                    item.current = pathname === item.href;
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className={cn(
                          item.current
                            ? "bg-gray-50 text-orange-600 hover:bg-white"
                            : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <item.icon
                          className={cn(
                            item.current
                              ? "text-orange-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "-ml-1 mr-3 h-6 w-6 flex-shrink-0",
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                      </a>
                    );
                  })}
                </nav>
              </aside>

              {/* Payment details */}
              <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
                {children}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
