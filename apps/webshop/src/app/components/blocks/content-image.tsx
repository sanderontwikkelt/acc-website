"use client";

import type { Button as ButtonType, ImageType } from "~/lib/types";
import { setHtml } from "~/lib/setHtml";
import { Button } from "../button";
import NextImage from "../NextImage";

export type ContentVariant = "image" | "heading" | "slider";

const contentImage = ({
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
    <div className="grid items-center gap-10 md:grid-cols-2">
      <div className="w-full md:pr-24">
        <NextImage image={image} alt={title} className="w-full object-cover" />
      </div>
      <article>
        <h3
          className="mb-10 text-2xl font-medium md:text-[2.215rem] md:leading-[3.2rem]"
          {...setHtml(title)}
        />
        <p className="mb-10 text-lg" {...setHtml(description)} />
        <div className="flex space-x-7">
          <Button className="font-bold" {...button}>
            {button.title}
          </Button>
        </div>
      </article>
    </div>
  );
};

export default contentImage;
