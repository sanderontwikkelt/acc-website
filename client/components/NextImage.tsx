import { ImageType } from "@/lib/types";
import Image, { ImageProps } from "next/image";
import React from "react";

type NextImageProps = {
  image: ImageType;
  alt: string;
  className?: string;
  priority?: boolean;
  loading?: "eager";
};

const NextImage = ({
  image: { objectPosition, ...image },
  alt = "",
  ...props
}: NextImageProps) => {
  return (
    <Image
      {...image}
      {...props}
      alt={alt}
      {...(!!(objectPosition && props.className?.includes("object-cover")) && {
        style: {
          objectPosition: `${objectPosition.x}% ${objectPosition.y}%`,
        },
      })}
    />
  );
};

export default NextImage;
