"use client";

import React, { useRef, useState } from "react";
import WatchButton from "./watch-button";
import { cn } from "@/lib/cn";
import { ImageType } from "@/lib/types";

const HeroWatchVideo = ({
  video,
  preview,
}: {
  preview?: ImageType;
  video: ImageType;
}) => {
  const [hovering, setHovering] = useState(false);
  const [play, setPlay] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  const handlePlay = (playing: boolean) => {
    setPlay(playing);
    if (ref.current && playing) {
      ref.current.currentTime = 0;
      ref.current.play();
    }
  };

  const handleHover = (hover: boolean) => {
    setHovering(hover);
  };
  return (
    <div className="max-md:absolute max-md:-top-[6.25rem] max-md:left-0 max-md:h-[100vh] max-md:w-screen">
      <div className="group relative h-full w-full max-md:h-[100vh] max-md:after:absolute max-md:after:inset-0 max-md:after:bg-black/40 md:absolute md:right-0 md:top-0 md:w-[40%]">
        <div
          className="absolute z-50 max-md:bottom-0 max-md:right-0  md:bottom-32 md:left-0"
          onMouseEnter={() => handleHover(true)}
          onFocus={() => handleHover(true)}
          onMouseLeave={() => !play && handleHover(false)}
        >
          <WatchButton playing={play} onClick={() => handlePlay(!play)} />
        </div>
        {play ? (
          <video
            className={cn(
              "duration-[2000ms] absolute right-0 top-0 z-10 h-full w-screen min-w-[100vw] bg-black object-cover transition-all max-md:object-contain md:ml-20 md:translate-x-0 md:scale-100"
            )}
            ref={ref}
            controls
            onClick={(e) => e.stopPropagation()}
          >
            <source src={video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <video
            className={cn(
              "absolute right-0 top-0 h-full w-full min-w-full bg-black object-cover transition-all duration-500 md:-right-12 md:ml-20",
              hovering
                ? "md:-translate-x-6 md:scale-[1.02]"
                : "md:translate-x-0 md:scale-100"
            )}
            ref={ref}
            muted
            loop
            autoPlay
            onClick={(e) => e.stopPropagation()}
          >
            <source src={(preview || video).src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default HeroWatchVideo;
