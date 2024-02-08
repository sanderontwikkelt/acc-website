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
  button,
}: {
  title: string;
  description: string;
  articleDescription: string;
  button: ButtonType;
  image: ImageType;
}) => {
  return (
    <div className="flex items-center gap-36 max-md:flex-col">
      <NextImage image={image} alt={title} />
      <article>
        <h3 className="mb-10" {...setHtml(title)} />
        <p className="mb-10" {...setHtml(description)} />
        <Button {...button}>{button.title}</Button>
      </article>
    </div>
  );
};

export default content;
