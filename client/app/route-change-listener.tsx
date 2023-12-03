'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function RouteChangeListener() {
  const pathname = usePathname()
  const search = useSearchParams()
  const [builder] = useState(() => search.get('mode') === 'builder')

  useEffect(() => {
    if (builder) parent.postMessage({ pathname, action: 'PATH' }, '*')
  }, [pathname])

  return <></>
}
