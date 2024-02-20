import React from "react";
import Image from "next/image";

export interface ImageType {
  src?: string;
  width: number;
  height: number;
  objectPosition?: { x: number; y: number };
}

interface NextImageProps {
  image: ImageType;
  alt: string;
  className?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  style?: React.CSSProperties;
}

export const NextImage = ({
  image: { objectPosition, ...image },
  alt = "",
  ...props
}: NextImageProps) => {
  const { width, height, url } = image;
  return (
    <Image
      width={width}
      height={height}
      src={url}
      {...props}
      alt={alt}
      {...(!!(objectPosition && props.className?.includes("object-cover")) && {
        style: {
          objectPosition: `${objectPosition.x}% ${objectPosition.y}%`,
          ...props.style,
        },
      })}
    />
  );
};
