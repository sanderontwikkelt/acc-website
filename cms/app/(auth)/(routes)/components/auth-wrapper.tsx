import Image from 'next/image'
import React, { ReactNode } from 'react'

const AuthWrapper = ({
  children,
  title,
  description,
}: {
  children: ReactNode
  title: string
  description: string
}) => {
  return (
    <div className='container relative min-h-screen px-5 flex-col flex items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted max-h-screen overflow-hidden text-white lg:flex'>
        <Image
          src='/images/login.jpg'
          width={510}
          height={852}
          alt='login hero'
          className='object-cover w-full h-full opacity-60'
        />
        <div className='absolute inset-0 bg-gradient-to-r from-transparent to-background' />
      </div>
      <div className='lg:p-8 max-md:w-full'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[24rem]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>{title}</h1>
            <p className='text-sm text-muted-foreground'>{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthWrapper
