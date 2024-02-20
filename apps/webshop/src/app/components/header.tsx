"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HamburgerMenu from "react-hamburger-menu";

import { cn } from "@acme/ui";

import type { HeaderType } from "~/lib/types";
import { getArray } from "~/lib/getArray";
import { Button } from "./button";
import MobileItem from "./mobileItem";
import NavItems from "./nav-items";

type Values = { pathname: string; name: string }[];

const defaultItems = [
  { pathname: "/mijn-account", name: "Mijn account" },
  {
    pathname: "https://community.physis.academy/login",
    name: "Cursist log in",
  },
  {
    pathname: "/winkelmand",
    name: "Winkelmand",
  },
];

const Header = ({ header }: { header: HeaderType }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<Values | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    ...getArray(header.navigation),
    ...getArray(header.links),
  ];

  return (
    <>
      <header
        className={cn(
          "fixed left-0 top-0 z-[99999] h-[6.25rem] w-full",
          scrolled
            ? "text-main bg-accent"
            : "bg-transparent fill-white text-white mix-blend-difference",
        )}
      >
        <div
          className={cn(
            "relative z-50 flex h-full w-full max-w-[100vw] items-center px-[calc(1.875rem+max((100vw-(1300rem/16))/2,0px))]",
          )}
        >
          <Link href="/" aria-label="Physis">
            {header.media?.url ? (
              <Image
                src={header.media.url}
                width={header.media.width}
                height={header.media.height}
                alt="Logo"
              />
            ) : scrolled ? (
              <svg
                width="52"
                height="53"
                viewBox="0 0 52 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_0_22"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="1"
                  width="52"
                  height="52"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 1.0002H51.3295V52.3416H0V1.0002Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask0_0_22)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M25.665 2.6896C19.521 2.6896 13.382 5.0266 8.704 9.7036C-0.648 19.0556 -0.648 34.2736 8.704 43.6256C13.235 48.1556 19.259 50.6516 25.665 50.6516C32.072 50.6516 38.097 48.1556 42.626 43.6256C51.978 34.2736 51.978 19.0556 42.626 9.7036C37.951 5.0276 31.808 2.6896 25.665 2.6896M25.665 52.3416C18.807 52.3416 12.359 49.6706 7.509 44.8206C-2.503 34.8096 -2.503 18.5196 7.509 8.5076C17.523 -1.5034 33.813 -1.5014 43.822 8.5076C53.832 18.5196 53.832 34.8096 43.822 44.8206C38.972 49.6706 32.525 52.3416 25.665 52.3416"
                    fill="#0F1012"
                  />
                </g>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.0215 17.6511V28.0341H18.5295C22.6765 28.0341 23.5495 24.8471 23.5495 21.2671C23.5495 16.8461 22.3845 14.6361 19.1975 14.6361C17.3975 14.6361 17.0215 15.2361 17.0215 17.6511V17.6511ZM19.4595 13.9681C25.9875 13.9681 29.3755 16.8121 29.3755 20.8901C29.3755 24.2821 27.1645 28.7361 18.8895 28.7361H17.0215V34.8531C17.0215 37.5941 17.6555 37.9721 20.7735 38.0061V38.7761H8.81445V38.0741C11.0425 37.9721 11.4365 37.6111 11.4365 35.0591V17.6511C11.4365 15.0991 11.0255 14.7391 8.81445 14.6361V13.9761L19.4595 13.9681Z"
                  fill="#0F1012"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M36.2598 16.2878L34.6878 20.3738H37.7648L36.2598 16.2878ZM37.8768 13.9678L41.5608 23.4728C41.8428 24.1988 42.2288 24.4288 42.5168 24.4438V24.7468H37.8988V24.4438C38.6248 24.4138 38.9668 24.3028 38.9668 23.8878C38.9668 23.7098 38.9068 23.4728 38.7878 23.1678L37.8768 20.6768H34.5768L34.1688 21.7298C33.8798 22.4718 33.7538 23.0128 33.7538 23.4128C33.7538 24.2138 34.2728 24.4208 35.1028 24.4438V24.7468H32.0488V24.4438C32.4938 24.3618 32.9388 23.9688 33.3688 22.8498L36.8228 13.9678H37.8768Z"
                  fill="#0F1012"
                />
                <mask
                  id="mask1_0_22"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="1"
                  width="52"
                  height="52"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 52.3422H51.33V1.0002H0V52.3422Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask1_0_22)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M32.0371 27.7312H42.5111V26.3722H32.0371V27.7312Z"
                    fill="#0F1012"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M37.7309 35.9347C37.7309 37.5037 36.4589 38.7767 34.8889 38.7767C33.3189 38.7767 32.0469 37.5037 32.0469 35.9347C32.0469 34.3657 33.3189 33.0927 34.8889 33.0927C36.4589 33.0927 37.7309 34.3657 37.7309 35.9347"
                    fill="#0F1012"
                  />
                </g>
              </svg>
            ) : (
              <svg
                width="52"
                height="53"
                viewBox="0 0 52 53"
                fill="none"
                className={scrolled ? "fill-main" : "fill-white"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_0_22"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="1"
                  width="52"
                  height="52"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 1.0002H51.3295V52.3416H0V1.0002Z"
                  />
                </mask>
                <g mask="url(#mask0_0_22)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M25.665 2.6896C19.521 2.6896 13.382 5.0266 8.704 9.7036C-0.648 19.0556 -0.648 34.2736 8.704 43.6256C13.235 48.1556 19.259 50.6516 25.665 50.6516C32.072 50.6516 38.097 48.1556 42.626 43.6256C51.978 34.2736 51.978 19.0556 42.626 9.7036C37.951 5.0276 31.808 2.6896 25.665 2.6896M25.665 52.3416C18.807 52.3416 12.359 49.6706 7.509 44.8206C-2.503 34.8096 -2.503 18.5196 7.509 8.5076C17.523 -1.5034 33.813 -1.5014 43.822 8.5076C53.832 18.5196 53.832 34.8096 43.822 44.8206C38.972 49.6706 32.525 52.3416 25.665 52.3416"
                  />
                </g>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.0215 17.6511V28.0341H18.5295C22.6765 28.0341 23.5495 24.8471 23.5495 21.2671C23.5495 16.8461 22.3845 14.6361 19.1975 14.6361C17.3975 14.6361 17.0215 15.2361 17.0215 17.6511V17.6511ZM19.4595 13.9681C25.9875 13.9681 29.3755 16.8121 29.3755 20.8901C29.3755 24.2821 27.1645 28.7361 18.8895 28.7361H17.0215V34.8531C17.0215 37.5941 17.6555 37.9721 20.7735 38.0061V38.7761H8.81445V38.0741C11.0425 37.9721 11.4365 37.6111 11.4365 35.0591V17.6511C11.4365 15.0991 11.0255 14.7391 8.81445 14.6361V13.9761L19.4595 13.9681Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M36.2598 16.2878L34.6878 20.3738H37.7648L36.2598 16.2878ZM37.8768 13.9678L41.5608 23.4728C41.8428 24.1988 42.2288 24.4288 42.5168 24.4438V24.7468H37.8988V24.4438C38.6248 24.4138 38.9668 24.3028 38.9668 23.8878C38.9668 23.7098 38.9068 23.4728 38.7878 23.1678L37.8768 20.6768H34.5768L34.1688 21.7298C33.8798 22.4718 33.7538 23.0128 33.7538 23.4128C33.7538 24.2138 34.2728 24.4208 35.1028 24.4438V24.7468H32.0488V24.4438C32.4938 24.3618 32.9388 23.9688 33.3688 22.8498L36.8228 13.9678H37.8768Z"
                />
                <mask
                  id="mask1_0_22"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="1"
                  width="52"
                  height="52"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 52.3422H51.33V1.0002H0V52.3422Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask1_0_22)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M32.0371 27.7312H42.5111V26.3722H32.0371V27.7312Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M37.7309 35.9347C37.7309 37.5037 36.4589 38.7767 34.8889 38.7767C33.3189 38.7767 32.0469 37.5037 32.0469 35.9347C32.0469 34.3657 33.3189 33.0927 34.8889 33.0927C36.4589 33.0927 37.7309 34.3657 37.7309 35.9347"
                  />
                </g>
              </svg>
            )}
          </Link>
          <nav className="ml-12 flex items-center text-lg max-md:hidden lg:space-x-6 xl:space-x-8">
            <NavItems
              links={getArray(header.navigation)}
              setHoveredItem={setHoveredItem}
            />
          </nav>
          <nav className="ml-auto flex items-center space-x-4 max-md:hidden lg:space-x-6 xl:space-x-8">
            {defaultItems.map((item) => (
              <Link
                href={item.pathname}
                key={item.name}
                className="whitespace-nowrap p-3 underline"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <>
            <div className="relative z-10 ml-auto md:hidden">
              <HamburgerMenu
                isOpen={mobileMenuOpen}
                menuClicked={() => setMobileMenuOpen((prev: boolean) => !prev)}
                width={28}
                height={18}
                strokeWidth={2}
                rotate={0}
                color="#9F9F9F"
                borderRadius={99}
                animationDuration={0.5}
              />
            </div>
          </>
        </div>
      </header>
      <div
        className={cn(
          `max-w-screen fixed bottom-0 right-0 top-0 z-[99] h-screen w-screen overflow-y-auto bg-accent px-6 py-6 pt-[6.25rem] shadow-md transition-all duration-500 md:hidden`,
          mobileMenuOpen
            ? "translate-x-0"
            : "right-[150vw] -translate-x-[150vw]",
        )}
      >
        <div className="flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {!!navigation.length &&
                [
                  ...navigation.slice(0, navigation.length - 1),
                  ...defaultItems,
                ].map((item, i) => (
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
                  className="w-full"
                  href={navigation[navigation.length - 1].pathname}
                  size="lg"
                  variant="main"
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
      <div
        onMouseLeave={() => setHoveredItem(null)}
        className={cn(
          "fixed left-0 top-0 z-50 w-screen overflow-hidden border-b border-gray-300 bg-accent pt-[6.25rem] shadow-sm transition-all duration-500",
          hoveredItem ? "h-[14.25rem] " : "h-0 ",
        )}
      >
        <div className="relative h-28 w-full max-w-[100vw] px-[calc(1.875rem+max((100vw-(1300rem/16))/2,0px))]">
          <div className="absolute left-0 top-1/2 flex h-full min-w-[50%] -translate-y-1/2 items-center space-x-10">
            {hoveredItem?.map(({ pathname, name }, i) => (
              <Link
                href={pathname}
                key={name}
                style={{ animationDelay: 50 * i + "ms" }}
                className="text-main/0.3 hover:text-main animate-moveUp p-10 text-2xl opacity-0 transition-all hover:underline"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
