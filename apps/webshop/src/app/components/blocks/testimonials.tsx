"use client";

import { useKeenSlider } from "keen-slider/react";

import type { ImageType } from "~/lib/types";

import "keen-slider/keen-slider.min.css";

import { setHtml } from "~/lib/setHtml";
import Author from "../author";

interface Item {
  description: string;
  subtitle: string;
  author: string;
  image: ImageType;
}

const sliderOptions = {
  slides: { perView: 2, spacing: 100 },
  loop: true,
  breakpoints: {
    "(max-width: 968px)": {
      slides: { perView: 2, spacing: 15 },
    },
    "(max-width: 768px)": {
      slides: { perView: 1, spacing: 10 },
    },
  },
};

const Testimonials = ({
  title,
  items = [],
}: {
  title: string;
  items: Item[];
}) => {
  const [internalSliderRef, internalSlider] = useKeenSlider({
    ...sliderOptions,
  });
  return (
    <div className="flex w-full flex-col">
      <h2
        className="text-2m mb-16 max-w-[30rem] text-4xl font-semibold md:text-[2.5rem]"
        {...setHtml(title)}
      />
      <div className="relative ml-auto h-full max-w-full md:w-[80%]">
        <div ref={internalSliderRef} className="keen-slider">
          {items.map((item, i) => (
            <div
              key={i}
              className="keen-slider__slide group relative w-full overflow-hidden"
            >
              <p
                className="font-heading mb-10 text-lg font-bold md:text-2xl md:leading-[1.5]"
                {...setHtml(item.description)}
              />
              <Author
                image={item.image}
                subtitle={item.subtitle}
                author={item.author}
              />
            </div>
          ))}
        </div>
        <div className="mt-12 flex items-center space-x-8 md:mt-28">
          <button
            className="flex items-center justify-center bg-accent p-2"
            aria-label="Vorige"
            onClick={() => internalSlider.current?.prev()}
          >
            <svg
              width="35"
              height="26"
              viewBox="0 0 35 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.5 11.5V14.5L34.5 14.5V11.5L2.5 11.5Z"
                  fill="#0F1012"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.148 0.5L0.5 12.3062L2.85201 14.5L15.5 2.69533L13.148 0.5Z"
                  fill="#0F1012"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.22771 11L0 13.2286L12.7715 26L15 23.773L2.22771 11Z"
                  fill="#0F1012"
                />
              </g>
            </svg>
          </button>
          <button
            className="flex items-center justify-center bg-accent p-2"
            aria-label="next"
            onClick={() => internalSlider.current?.next()}
          >
            <svg
              width="35"
              height="26"
              viewBox="0 0 35 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M32.5 14.5V11.5L0.5 11.5L0.5 14.5L32.5 14.5Z"
                fill="#0F1012"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.852 25.5L34.5 13.6938L32.148 11.5L19.5 23.3047L21.852 25.5Z"
                fill="#0F1012"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M32.7723 15L35 12.7714L22.2285 0L20 2.22704L32.7723 15Z"
                fill="#0F1012"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
