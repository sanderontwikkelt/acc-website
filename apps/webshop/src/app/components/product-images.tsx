"use client";

import React, { useState } from "react";

import type { Media } from "@acme/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Dialog,
  DialogContent,
  NextImage,
} from "@acme/ui";

const ProductImages = ({ images, alt }: { images: Media[]; alt: string }) => {
  const [firstImage, ...restImages] = images;
  const [isOpen, onChange] = useState(false);

  return (
    <>
      <div className="grid h-min grid-cols-1 gap-5 md:grid-cols-3">
        <button className="md:col-span-3" onClick={() => onChange(true)}>
          <NextImage
            image={{
              src: firstImage.url,
              width: firstImage.width,
              height: firstImage.height,
            }}
            alt={alt}
            className="aspect-[3/2] object-cover"
          />
        </button>
        {restImages.slice(0, 3).map((image, i) => (
          <button key={i} onClick={() => onChange(true)}>
            <NextImage
              className="aspect-square object-cover"
              image={{
                src: image.url,
                width: image.width,
                height: image.height,
              }}
              alt={alt}
            />
          </button>
        ))}
      </div>
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent className="sm:max-w-screen h-screen w-[90vw] border-none bg-transparent px-24 shadow-none">
          <Carousel className="h-full w-full">
            <CarouselContent className="max-h-[80vh]">
              {images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="flex max-h-screen items-center justify-center"
                >
                  <NextImage
                    className="aspect-square object-contain"
                    key={index}
                    image={{
                      src: image.url,
                      width: image.width,
                      height: image.height,
                    }}
                    alt={alt}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductImages;
