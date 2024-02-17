'use client'

import type { Media } from '@acme/db';
import { Dialog, DialogContent, NextImage,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
 } from '@acme/ui';
import React, { useState } from 'react'

const ProductImages = ({ images, alt }: { images: Media[]; alt: string}) => {
    const [firstImage, ...restImages] = images;
    const [isOpen, onChange] = useState(false)

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-min">
        <button className='md:col-span-3' onClick={() => onChange(true)}>

    <NextImage image={{
        src: firstImage.url,
        width: firstImage.width,
        height: firstImage.height,
    }} alt={alt} className='object-cover aspect-[3/2]' />
    </button>
{restImages.slice(0, 3).map((image, i) => <button key={i} onClick={() => onChange(true)}><NextImage className='aspect-square object-cover' image={{
    src: image.url,
    width: image.width,
    height: image.height,
}} alt={alt} /></button>)}
</div>
<Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="w-[90vw] h-screen sm:max-w-screen bg-transparent px-24 border-none shadow-none">
      <Carousel className="w-full h-full">
      <CarouselContent className='max-h-[80vh]'>
        {images.map((image, index) => (
          <CarouselItem key={index} className='flex items-center justify-center max-h-screen'>
            <NextImage className='aspect-square object-contain' key={index} image={{
    src: image.url,
    width: image.width,
    height: image.height,
}} alt={alt} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
      </DialogContent>
    </Dialog>
</>
  )
}

export default ProductImages