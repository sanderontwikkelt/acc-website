import React from "react";
import NextImage from "./NextImage";
import { ImageType } from "@/lib/types";

const Author = ({
  image,
  author,
  subtitle,
}: {
  image: ImageType;
  author: string;
  subtitle: string;
}) => {
  return (
    <div className="flex items-center space-x-10">
      <div className="ratio-square relative h-[8.5rem] w-[8.5rem] overflow-hidden">
        <NextImage
          alt="slide"
          image={image}
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <p className="">{author}</p>
        <p className="opacity-50">{subtitle}</p>
      </div>
    </div>
  );
};

export default Author;
