import React from "react";

import { cn } from "@acme/ui";

import type { ImageType } from "~/lib/types";
import NextImage from "../NextImage";

interface Item {
  image: ImageType;
  cols: number;
}

const images = ({ items }: { items: Item[] }) => {
  return (
    <div className="flex w-full justify-between max-md:flex-col max-md:space-y-4">
      {items.map(({ image, cols }, i) => {
        return (
          <div
            className={cn(
              "relative min-h-[26rem] overflow-hidden max-md:min-w-full",
            )}
            style={{ width: cols / 0.12 + "%" }}
            key={i}
          >
            <NextImage
              image={image}
              className="h-full w-full object-contain"
              alt={"grid_item_" + i}
            />
          </div>
        );
      })}
    </div>
  );
};

export default images;
