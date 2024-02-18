"use client";

import React from "react";

import { setHtml } from "~/lib/setHtml";
import { Button as ButtonType, ImageType } from "~/lib/types";
import { Button } from "../button";
import NextImage from "../NextImage";

export type ContentVariant = "image" | "heading" | "slider";

const content = ({
  title,
  description,
  image,
  links,
}: {
  title: string;
  description: string;
  articleDescription: string;
  links: { href: string; title: string }[];
  image: ImageType;
}) => {
  return (
    <div className="flex items-center gap-36 max-md:flex-col">
      <NextImage image={image} alt={title} />
      <article>
        <h1 className="mb-10" {...setHtml(title)} />
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
