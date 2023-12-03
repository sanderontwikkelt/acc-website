import React from 'react'
import { cn } from '@/lib/cn'
import { ImageType, LinksType } from '@/lib/types'
import NextImage from '../NextImage'
import { setHtml } from '@/lib/setHtml'
import Link from 'next/link'

const card = ({
  title,
  description,
  image,
  links,
  icon,
}: {
  title: string
  description: string
  image: ImageType
  icon: ImageType
  links?: LinksType[]
}) => {
  return (
    <>
      <div className='grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center'>
        <div className='mr-20 aspect-[5/4]'>
          <NextImage image={image} alt={title} />
        </div>
        <article className=''>
          <div className={cn('mb-8 flex items-end justify-between')}>
            <h2 {...setHtml(title)} className='mb-0' />
            <NextImage image={icon} alt='Hero icon' />
          </div>
          <p className='mb-10 text-lg' {...setHtml(description)} />
          {!!links && (
            <div className='flex items-center space-x-12'>
              {links.map(({ title, href }) => (
                <Link href={href} key={title} className='text-lg underline'>
                  {title}
                </Link>
              ))}
            </div>
          )}
        </article>
      </div>
    </>
  )
}

export default card
