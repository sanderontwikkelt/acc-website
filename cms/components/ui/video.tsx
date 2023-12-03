import React from 'react'

export const Video = ({ src }: { src: string }) => {
  return (
    <video className='object-contain w-full h-full'>
      <source src={src} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  )
}
