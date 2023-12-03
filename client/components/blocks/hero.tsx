import React from 'react'
import HeroWatchVideo from '../hero-watch-video'
import { Button, ButtonProps } from '../button'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import { ImageType, LinksType } from '@/lib/types'
import NextImage from '../NextImage'
import { setHtml } from '@/lib/setHtml'
import Link from 'next/link'
import Section from '../section'

export type ContentVariant = 'side-image' | 'full-width'

const hero = ({
  title,
  description,
  image,
  variant = 'side-image',
  links,
  icon,
}: {
  title: string
  subtitle?: string
  description: string
  image: ImageType
  background?: string
  icon: ImageType
  variant?: ContentVariant
  links?: LinksType[]
}) => {
  const isSideImage = variant === 'side-image'
  return (
    <>
      <div className={cn('', isSideImage ? '' : 'md:pb-[29rem]')}>
        <article
          className={cn(
            'w-full py-[10.625rem] md:pr-[9rem]',
            isSideImage ? 'md:max-w-[60%]' : 'pb-[6.25rem] md:pr-0'
          )}
        >
          <div
            className={cn(
              'mb-4 flex  justify-between',
              isSideImage ? 'items-center' : 'items-end'
            )}
          >
            <h1
              {...setHtml(title)}
              className={isSideImage ? '' : 'text-6xl font-normal'}
            />
            {isSideImage ? (
              <NextImage image={icon} alt='Hero icon' />
            ) : (
              <Link href='#next-section'>
                <svg
                  width='51'
                  height='67'
                  viewBox='0 0 51 67'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M23 63H29V0H23V63Z'
                    fill='#0F1012'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M0 40.5472L23.6124 65L28 60.4528L4.39067 36L0 40.5472Z'
                    fill='#0F1012'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M21 62.5446L25.4572 67L51 41.457L46.5459 37L21 62.5446Z'
                    fill='#0F1012'
                  />
                </svg>
              </Link>
            )}
          </div>
          {!!description && (
            <p className='text-4xl' {...setHtml(description)} />
          )}
        </article>

        <div
          className={
            isSideImage
              ? 'absolute right-0 top-0 z-10 mt-[11rem] h-[calc(100%-11rem)] w-full md:w-[40%]'
              : 'absolute bottom-0 left-0 h-[35rem] w-screen'
          }
        >
          <NextImage
            image={image}
            alt='Hero'
            className='h-full w-full object-cover'
          />
        </div>
      </div>
      {!!links && isSideImage && (
        <Section
          id='hero-links'
          className='absolute bottom-0 left-0 w-full bg-white'
          innerClassName='md:py-16 space-x-10 flex items-center'
        >
          {links.map(({ title, href }) => (
            <Link
              href={href}
              key={title}
              className='flex items-center text-base text-[#0F1012]/50'
            >
              {title}
              <svg
                width='8'
                className='ml-1'
                height='11'
                viewBox='0 0 8 11'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  opacity='0.5'
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M3.50657 0V9.00471L0.697958 6.03797L0 6.77516L3.30229 10.2631L3.75353 10.7394L4.00025 11L8 6.77516L7.30229 6.03797L4.49368 9.00471V0H3.50657Z'
                  fill='#0F1012'
                />
              </svg>
            </Link>
          ))}
        </Section>
      )}
      <div id='next-section' />
    </>
  )
}

export default hero
