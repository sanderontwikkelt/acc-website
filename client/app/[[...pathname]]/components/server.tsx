import React from 'react'
import BlocksRenderer from './blocks-renderer'
import { getArray } from '@/lib/getArray'
import { API_URL } from '@/lib/constants'
import Header from '@/components/header'
import Footer from '@/components/footer'

async function getPage(pathname: string) {
  const tags = [pathname.replaceAll('/', '') || 'index']
  try {
    const res = await fetch(
      `${API_URL}/api/pages?pathname=/${pathname}&mode=server`,
      {
        next: { tags },
      }
    )

    if (!res.ok) {
      throw new Error('Failed to fetch page')
    }

    return res.json()
  } catch (e) {
    console.log({ e, url: `${API_URL}/api/pages?pathname=${pathname}` })
  }
}

const getHeader = async () => {
  try {
    const res = await fetch(`${API_URL}/api/header`, {
      next: { tags: ['header'] },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch page')
    }

    return res.json()
  } catch (e) {
    console.log({ e, url: `${API_URL}/api/header` })
  }
}

const getFooter = async () => {
  try {
    const res = await fetch(`${API_URL}/api/footer`, {
      next: { tags: ['footer'] },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch page')
    }

    return res.json()
  } catch (e) {
    console.log({ e, url: `${API_URL}/api/footer` })
  }
}

const Server = async ({ pathname }: { pathname: string }) => {
  const pages = await getPage(pathname === 'index' ? '' : pathname)
  if (!pages?.[0]) throw new Error(`Not found: ${pathname}`)
  const blocks = getArray(pages[0].blocks)
  const header = await getHeader()
  const footer = await getFooter()

  return (
    <>
      <Header header={header} />
      <main className='min-h-screen w-full'>
        <BlocksRenderer
          blocks={blocks.map((block) => ({
            ...block,
            fields: Object.entries(block.fields).reduce(
              (a, [field, { value }]: any) => ({ ...a, [field]: value }),
              {}
            ),
          }))}
        />
      </main>
      <Footer footer={footer} />
    </>
  )
}

export default Server
