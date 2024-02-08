"use client";

import * as React from "react";
import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";

import { cn } from "@acme/ui";

import { ImageType } from "~/lib/types";
import NextImage from "./NextImage";

const sliderOptions = {
  slides: { perView: 2, spacing: 20 },
  loop: true,
  breakpoints: {
    "(max-width: 768px)": {
      slides: { perView: 1 },
    },
  },
};

export default function ImageSlider({ images = [] }: { images: ImageType[] }) {
  const [idx, setIdx] = React.useState(0);
  const [internalSliderRef, internalSlider] = useKeenSlider({
    ...sliderOptions,
    slideChanged: ({ track }) => setIdx(track.details.abs),
  });

  return (
    <div className="relative h-full">
      <div ref={internalSliderRef} className="keen-slider h-full min-h-[30rem]">
        {images.map((image, i) => (
          <div className="keen-slider__slide flex items-center" key={i}>
            <div
              className={cn(
                "relative flex h-full w-full items-center overflow-hidden rounded-lg transition-all duration-300",
                i === Math.abs(idx) % images.length
                  ? // ? 'h-full md:h-[22.5rem] md:w-[calc(100%-0.625rem)]'
                    "h-full"
                  : "h-full",
              )}
            >
              <NextImage
                alt="slide"
                image={image}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="left-0 z-10 flex max-md:mt-2 max-md:w-full max-md:justify-between md:absolute md:bottom-0">
        <button
          className="flex items-center justify-center bg-accent p-2"
          aria-label="Vorige"
          onClick={() => internalSlider.current?.prev()}
        >
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.152501 7.92255L6.0779 14.7969C6.19577 14.9336 6.38864 15 6.51722 15C6.65958 15 6.80252 14.9463 6.91582 14.8377C7.15772 14.6057 7.17565 14.2104 6.95575 13.9553L1.93119 8.12565H15.4075C15.735 8.12565 16 7.84619 16 7.53586C16 7.22554 15.7349 6.87577 15.4075 6.87577H1.93155L6.95689 1.04429C7.1768 0.789202 7.15887 0.393576 6.91696 0.161957C6.67448 -0.0687243 6.30013 -0.0516555 6.0794 0.204687L0.154002 7.07903C-0.0510826 7.31714 -0.0510845 7.68429 0.152501 7.92255Z"
              fill="#64BD6E"
            />
          </svg>
        </button>
        <button
          className="flex items-center justify-center bg-accent p-2"
          aria-label="next"
          onClick={() => internalSlider.current?.next()}
        >
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8475 7.92255L9.9221 14.7969C9.80423 14.9336 9.61136 15 9.48278 15C9.34042 15 9.19748 14.9463 9.08418 14.8377C8.84228 14.6057 8.82435 14.2104 9.04425 13.9553L14.0688 8.12565H0.59254C0.264982 8.12565 0 7.84619 0 7.53586C0 7.22554 0.265054 6.87577 0.59254 6.87577H14.0685L9.04311 1.04429C8.8232 0.789202 8.84113 0.393576 9.08304 0.161957C9.32552 -0.0687243 9.69987 -0.0516555 9.9206 0.204687L15.846 7.07903C16.0511 7.31714 16.0511 7.68429 15.8475 7.92255Z"
              fill="#64BD6E"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
