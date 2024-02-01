"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "../../lib/utils";
import { buttonVariants } from "./button";

export type Playlist = string;

const SidebarItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-2", className)} {...props} />
));
SidebarItem.displayName = "SidebarItem";

export interface SidebarItemLinkProps {
  href: string;
  disabled?: boolean;
}
const SidebarItemLink = React.forwardRef<
  HTMLAnchorElement,
  React.HTMLAttributes<HTMLAnchorElement> & SidebarItemLinkProps
>(({ className, href, disabled, ...props }, ref) => {
  const pathName = usePathname();
  const isActive =
    href === "/"
      ? pathName === "/" || pathName.includes("/?")
      : pathName.includes(href);

  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        buttonVariants({ variant: isActive ? "secondary" : "ghost" }),
        "w-full justify-start transition-all",
        className,
        isActive
          ? "px-2 font-semibold opacity-100"
          : "px-1 font-normal opacity-80 hover:px-2 hover:font-semibold hover:opacity-100",
        disabled ? "pointer-events-none opacity-80" : "",
      )}
      {...props}
    />
  );
});
SidebarItemLink.displayName = "SidebarItemLink";

const SidebarItemContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div className={cn("space-y-1 pt-2", className)} {...props} ref={ref}>
    {children}
  </div>
));
SidebarItemContent.displayName = "SidebarItemContent";

const SidebarItemLabel = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-md mx-1 font-semibold tracking-tight", className)}
    {...props}
  >
    {children}
  </h2>
));
SidebarItemLabel.displayName = "SidebarItemLabel";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      "z-50 m-4 mr-0 flex h-full max-h-[calc(100vh-2rem)] w-screen flex-col gap-4 rounded-lg border border-border bg-background p-4 text-card-foreground md:w-60 md:min-w-[15rem]",
      className,
    )}
    ref={ref}
    {...props}
  />
));

Sidebar.displayName = "Sidebar";

export {
  Sidebar,
  SidebarItem,
  SidebarItemLabel,
  SidebarItemContent,
  SidebarItemLink,
};
