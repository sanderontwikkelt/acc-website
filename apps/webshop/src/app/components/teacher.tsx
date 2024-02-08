import React from "react";

import { setHtml } from "~/lib/setHtml";
import { ImageType } from "~/lib/types";
import Expandable from "./expandable";
import NextImage from "./NextImage";

const Teacher = ({
  image,
  name,
  title,
  description,
}: {
  image: ImageType;
  name: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-center space-x-[4.375rem]">
      <div className="relative h-[17.3125rem] w-[15.625rem] min-w-[15.625rem] overflow-hidden">
        <NextImage
          alt="slide"
          image={image}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="text-base md:text-lg">
        <p className="text-base md:text-lg">{name}</p>
        <p className="mb-6 text-base opacity-50">{title}</p>
        <Expandable maxHeight="150px">
          <div {...setHtml(description)} />
        </Expandable>
      </div>
    </div>
  );
};

export default Teacher;
