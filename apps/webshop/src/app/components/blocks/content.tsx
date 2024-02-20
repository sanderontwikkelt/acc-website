"use client";

import type { ImageType } from "~/lib/types";
import { setHtml } from "~/lib/setHtml";
import { Button } from "../button";
import NextImage from "../NextImage";

export type ContentVariant = "image" | "heading" | "slider";

const content = ({
  title,
  description,
  image,
  icon,
  links,
}: {
  title: string;
  description: string;
  articleDescription: string;
  links: { href: string; title: string }[];
  image: ImageType;
  icon: ImageType;
}) => {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      <div className="w-full pr-20">
        <NextImage image={image} alt={title} className="w-full object-cover" />
      </div>
      <article>
        <div className="mb-10 flex items-center justify-between">
          <h3
            className="text-[2.125rem] font-medium leading-[2.5rem] md:text-[3.5rem] md:leading-[4.2rem]"
            {...setHtml(title)}
          />
          {!!icon && (
            <NextImage
              image={icon}
              alt="icon"
              className="w-15 h-auto object-contain"
            />
          )}
        </div>
        <p className="mb-10" {...setHtml(description)} />
        <div className="flex space-x-5">
          {links.map(({ href, title }) => (
            <Button className="font-bold" key={href} variant="link">
              {title}
            </Button>
          ))}
        </div>
      </article>
    </div>
  );
};

export default content;
