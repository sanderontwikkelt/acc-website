"use client";

import React, { useState } from "react";
import Link from "next/link";
import HamburgerMenu from "react-hamburger-menu";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";

const MobileMenu = ({
  navigation,
}: {
  navigation: { pathname: string; name: string }[];
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="relative z-10 md:hidden">
        <HamburgerMenu
          isOpen={mobileMenuOpen}
          menuClicked={() => setMobileMenuOpen((prev: boolean) => !prev)}
          width={14}
          height={9}
          strokeWidth={1}
          rotate={0}
          color="#212B36"
          borderRadius={99}
          animationDuration={0.5}
        />
      </div>

      <div
        className={cn(
          `max-w-screen fixed bottom-0 right-0 top-[5rem] z-50 h-[calc(100vh-5rem)] w-full overflow-y-auto bg-accent px-6 py-6 shadow-md transition-all duration-500 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 md:hidden`,
          mobileMenuOpen
            ? "translate-x-0"
            : "right-[150vw] -translate-x-[150vw]",
        )}
      >
        <div className="flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="flex flex-col space-y-2 py-6">
              {navigation.slice(0, navigation.length - 1).map((item, i) => (
                <Link
                  key={item.name + i}
                  className="py-4 text-lg font-medium"
                  href={item.pathname || "/"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {!!navigation[navigation.length - 1] && (
              <div className="py-6">
                <Button
                  className=""
                  href={navigation[navigation.length - 1]!.pathname}
                  size="lg"
                  aria-label="Contact"
                >
                  {navigation[navigation.length - 1]!.name}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
