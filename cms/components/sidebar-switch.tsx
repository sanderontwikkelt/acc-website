'use client'

import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SidebarSwitch = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const handleOpen = () => {
    const sidebar = document.getElementById('sidebar')
    if (sidebar) {
      if (open) {
        sidebar.style.transform = 'translateX(-100%)'
        setOpen(false)
      } else {
        sidebar.style.transform = 'translateX(0%)'
        setOpen(true)
      }
    }
  }

  useEffect(() => {
    const sidebar = document.getElementById('sidebar')
    if (sidebar) {
      if (window.innerWidth < 800) {
        setOpen(false)
        sidebar.style.transform = 'translateX(-100%)'
      }
    }
  }, [pathname])
  return (
    <button
      onClick={handleOpen}
      className={cn(
        'fixed md:hidden w-10 h-10 flex items-center justify-center rounded-full top-[calc(100vh-3.75rem)] bg-background border border-input transition-all duration-300',
        open ? 'right-5 rotate-0' : '-right-[3.5rem] rotate-180'
      )}
    >
      <ChevronLeft />
    </button>
  )
}

export default SidebarSwitch
