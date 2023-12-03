'use client'

import { cn } from '../../lib/utils'
import { buttonVariants } from './button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export type Playlist = string

const SidebarItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-2', className)} {...props} />
))
SidebarItem.displayName = 'SidebarItem'

export interface SidebarItemLinkProps {
  href: string
  disabled?: boolean
}
const SidebarItemLink = React.forwardRef<
  HTMLAnchorElement,
  React.HTMLAttributes<HTMLAnchorElement> & SidebarItemLinkProps
>(({ className, href, disabled, ...props }, ref) => {
  const pathName = usePathname()
  const isActive =
    href === '/'
      ? pathName === '/' || pathName.includes('/?')
      : pathName.includes(href)

  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        buttonVariants({ variant: isActive ? 'secondary' : 'ghost' }),
        'w-full justify-start transition-all',
        className,
        isActive
          ? 'px-2 font-semibold opacity-100'
          : 'font-normal opacity-80 hover:opacity-100 px-1 hover:font-semibold hover:px-2',
        disabled ? 'pointer-events-none opacity-80' : ''
      )}
      {...props}
    />
  )
})
SidebarItemLink.displayName = 'SidebarItemLink'

const SidebarItemContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div className={cn('space-y-1 pt-2', className)} {...props} ref={ref}>
    {children}
  </div>
))
SidebarItemContent.displayName = 'SidebarItemContent'

const SidebarItemLabel = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('text-md font-semibold mx-1 tracking-tight', className)}
    {...props}
  />
))
SidebarItemLabel.displayName = 'SidebarItemLabel'

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      'flex h-full z-50 w-screen md:w-48 flex-col gap-4 border bg-background px-4 py-4 text-card-foreground shadow',
      className
    )}
    ref={ref}
    {...props}
  />
))

Sidebar.displayName = 'Sidebar'

export {
  Sidebar,
  SidebarItem,
  SidebarItemLabel,
  SidebarItemContent,
  SidebarItemLink,
}
