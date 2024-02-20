/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";

export const Video = ({ src }: { src: string }) => {
  return (
    <video className="h-full w-full object-contain">
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};
