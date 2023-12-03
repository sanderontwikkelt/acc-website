'use client'
import React from 'react'
import { Button as ButtonType, ImageType } from '@/lib/types'
import { Button } from '../button'
import NextImage from '../NextImage'
import { setHtml } from '@/lib/setHtml'
import Author from '../author'

export type ContentVariant = 'image' | 'heading' | 'slider'

const CtaContent = ({
  title,
  subtitle,
  articleTitle,
  description,
  image,
  button,
  authorImage,
  author,
  authorDescription,
}: {
  title: string
  articleTitle: string
  subtitle: string
  description: string
  button: ButtonType
  image: ImageType
  authorImage: ImageType
  author: string
  authorDescription: string
}) => {
  return (
    <div className='w-full'>
      <h2 className='mb-32' {...setHtml(title)} />
      <div className='grid grid-cols-1 gap-9 md:grid-cols-2'>
        <article>
          <div className='ratio-[3/2] mb-4 w-full overflow-hidden'>
            <NextImage
              className='h-full w-full object-cover'
              image={image}
              alt={title}
            />
          </div>
          <h3 className='mb-8' {...setHtml(articleTitle)} />
          <p className='mb-10 text-lg' {...setHtml(description)} />
          <Button {...button}>{button.title}</Button>
        </article>
        <div>
          <h3 className='mb-16 text-2xl' {...setHtml(subtitle)} />
          <Author
            image={authorImage}
            author={author}
            subtitle={authorDescription}
          />
        </div>
      </div>
    </div>
  )
}

export default CtaContent
