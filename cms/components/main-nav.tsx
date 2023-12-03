'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const params = useParams()

  const routes = [
    {
      href: ``,
      label: 'Overview',
      active: pathname === ``,
    },
    {
      href: `/pages`,
      label: 'Pages',
      active: pathname === `/pages`,
    },
    {
      href: `/plates`,
      label: 'Plates',
      active: pathname === `/plates`,
    },
    {
      href: `/products`,
      label: 'Products',
      active: pathname === `/products`,
    },
    {
      href: `/orders`,
      label: 'Orders',
      active: pathname === `/orders`,
    },
    {
      href: `/settings`,
      label: 'Settings',
      active: pathname === `/settings`,
    },
  ]

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
