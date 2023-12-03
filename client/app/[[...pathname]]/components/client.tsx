'use client'

import React, { useEffect, useState } from 'react'
import BlocksRenderer from './blocks-renderer'
import { Block } from '@/lib/blocks'
import { API_URL } from '@/lib/constants'
import { FooterType, HeaderType } from '@/lib/types'
import Header from '@/components/header'
import Footer from '@/components/footer'

const Client = () => {
  const [data, setData] = useState<{
    header: HeaderType
    blocks: Block[]
    footer: FooterType
  } | null>(null)

  const getMessage = (event: any) => {
    if (event.origin === API_URL) {
      setData(event.data)
    }
  }
  useEffect(() => {
    window.addEventListener('message', getMessage)

    return () => {
      window.removeEventListener('message', getMessage)
    }
  }, [])
  return data ? (
    <>
      <Header header={data.header} />
      <main className='min-h-screen w-full'>
        <BlocksRenderer blocks={data.blocks} client />
      </main>
      <Footer footer={data.footer} />
    </>
  ) : null
}

export default Client
