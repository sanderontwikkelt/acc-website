import Image from "next/image";

import type { ImageType } from "~/lib/types";

interface NextImageProps {
  image: ImageType;
  alt: string;
  className?: string;
  priority?: boolean;
  loading?: "eager";
}

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
      src={image.url || image.src}
      {...(!!(objectPosition && props.className?.includes("object-cover")) && {
        style: {
          objectPosition: `${objectPosition.x}% ${objectPosition.y}%`,
        },
      })}
    />
  );
};

export default NextImage;
