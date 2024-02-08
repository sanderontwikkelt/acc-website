"use client";

import React, { useState } from "react";
import HamburgerMenu from "react-hamburger-menu";

import { cn } from "@acme/ui";

import { Button } from "./button";
import MobileItem from "./mobileItem";

const MobileMenu = ({
  navigation,
}: {
  navigation: { pathname: string; name: string }[];
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <div className="relative z-10 ml-auto md:hidden">
        <HamburgerMenu
          isOpen={mobileMenuOpen}
          menuClicked={() => setMobileMenuOpen((prev: boolean) => !prev)}
          width={28}
          height={18}
          strokeWidth={2}
          rotate={0}
          color="#64BD6E"
          borderRadius={99}
          animationDuration={0.5}
        />
      </div>

      <div
        className={cn(
          `max-w-screen fixed bottom-0 right-0 top-[6.25rem] z-10 h-[calc(100vh-6.25rem)] w-full overflow-y-auto bg-accent px-6 py-6 shadow-md transition-all duration-500 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 md:hidden`,
          mobileMenuOpen
            ? "translate-x-0"
            : "right-[150vw] -translate-x-[150vw]",
        )}
      >
        <div className="flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {!!navigation.length &&
                navigation.slice(0, navigation.length - 1).map((item, i) => (
                  <MobileItem
                    key={item.name + i}
                    href={item.pathname || "/"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </MobileItem>
                ))}
            </div>
            {!!navigation.length && (
              <div className="py-6">
                <Button
                  className=""
                  href={navigation[navigation.length - 1].pathname}
                  size="lg"
                  withArrow
                  aria-label="Contact"
                >
                  {navigation[navigation.length - 1].name}
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
