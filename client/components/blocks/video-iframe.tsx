import React from 'react'

const VideoIframe = ({ src }: { src: string }) => {
  return (
    <iframe
      className='aspect-[16/9] w-full'
      frameBorder='0'
      allowFullScreen
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      title='Physis Academy Ondernemersdag #1 Aftermovie'
      src={src}
    ></iframe>
  )
}

export default VideoIframe
