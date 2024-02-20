"use client";

import React from "react";

import { Button as ButtonType, ImageType } from "~/lib/types";

import "keen-slider/keen-slider.min.css";

import Link from "next/link";

import { setHtml } from "~/lib/setHtml";
import { Button } from "../button";
import NextImage from "../NextImage";

interface Item {
  title: string;
  description: string;
  subtitle: string;
  href: string;
  image: ImageType;
}

const ContentImages = ({
  title,
  items = [],
  button,
}: {
  title: string;
  items: Item[];
  button: ButtonType;
}) => {
  return (
    <div className="flex flex-col">
      <h2
        className="mb-20 max-w-[21rem] text-2xl md:text-[2.5rem]"
        {...setHtml(title)}
      />
      <div className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mb-24 md:grid-cols-3">
        {items.map(({ title, image, href }, i) => (
          <Link key={i} href={href} className="group relative w-full">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <NextImage
                alt="slide"
                image={image}
                className="h-full w-full scale-100 object-cover transition-transform group-hover:scale-[1.02]"
              />
            </div>
            <p className="mt-3 text-2xl" {...setHtml(title)} />
          </Link>
        ))}
      </div>
      <Button {...button} className="mx-auto">
        {button.title}
      </Button>
    </div>
  );
};

export default ContentImages;
