'use client'

import { Page } from '@prisma/client'
import React, { useEffect } from 'react'

const Website = ({
  page,
  display,
  setSectionId,
  moveSection,
  onNavigate,
}: {
  page: Page
  display: 'desktop' | 'tablet' | 'mobile'
  moveSection: (sectionId: string, direction: 'UP' | 'DOWN') => void
  setSectionId: (s: string | null) => void
  onNavigate: (s: string) => void
}) => {
  const frontendUrl = process.env.NEXT_PUBLIC_FRONT_URL

  const getMessage = (event: any) => {
    if (event.origin === frontendUrl) {
      if (event.data.action === 'EDIT') {
        setSectionId(event.data.id)
      } else if (event.data.action === 'PATH') {
        onNavigate(event.data.pathname)
      } else {
        moveSection(event.data.id, event.data.action)
      }
    }
  }
  useEffect(() => {
    window.addEventListener('message', getMessage)

    return () => {
      window.removeEventListener('message', getMessage)
    }
  }, [])

  const { width, height, maxHeight, borderRadius } = {
    desktop: {
      width: '100%',
      height: '100%',
      maxHeight: '100vh',
      borderRadius: '8px',
    },
    tablet: {
      width: '768px',
      height: '1024px',
      maxHeight: '100%',
      borderRadius: '6px',
    },
    mobile: {
      width: '360px',
      height: '800px',
      maxHeight: '100%',
      borderRadius: '4px',
    },
  }[display]

  return (
    <div className='flex-grow flex items-center justify-center relative h-full py-5 px-4 bg-background'>
      <div
        className='overflow-hidden bg-secondary border border-input shadow-lg'
        style={{ width, height, maxHeight, borderRadius }}
      >
        <iframe
          id='website-iframe'
          src={frontendUrl + page.pathname + '?mode=builder'}
          frameBorder='0'
          className='h-full w-full flex-grow'
        />
      </div>
    </div>
  )
}

export default Website
