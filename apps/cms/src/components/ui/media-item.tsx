"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";

import type { Media as DBMedia } from "@acme/db";

import type { MediaType } from "../modals/media-modal";
import { MediaModal } from "../modals/media-modal";
import TooltipWrapper from "../tooltip-wrapper";
import { Button } from "./button";
import DragPercentages from "./drag-percentages";
import { Video } from "./video";

interface Media extends DBMedia {
  objectPosition?: { x: number; y: number };
}
const MediaItem = ({
  type = "image",
  value,
  onChange,
}: {
  type: MediaType;
  value: Media;
  onChange?: (v: Media) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MediaModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selected={[value]}
        onSelect={([media]) => media && onChange?.(media)}
        type={type}
        multiple={false}
      />
      <div className="relative h-12 w-12 min-w-[3rem] overflow-hidden rounded-md bg-gray-200 dark:bg-gray-900">
        {type === "image" ? (
          <Image
            width={value.width}
            height={value.height}
            src={value.url}
            className="h-full w-full object-contain"
            alt="media select"
          />
        ) : (
          <Video src={value.url} />
        )}
      </div>
      <div className="mr-auto max-w-[7rem] px-3">
        <p className="max-w-full truncate whitespace-nowrap text-sm font-medium">
          {value.filename}
        </p>
      </div>
      {!!onChange && (
        <DragPercentages
          className="mr-2"
          position={value.objectPosition || { x: 50, y: 50 }}
          setPosition={(o) => onChange({ ...value, objectPosition: o })}
        />
      )}
      <Button
        type="button"
        variant="outline"
        className="min-w-[2.5rem]"
        size="icon"
        onClick={() => setIsOpen(true)}
      >
        <TooltipWrapper message="Verander">
          <ImagePlus className="h-4 w-4" />
        </TooltipWrapper>
      </Button>
    </>
  );
};

export default MediaItem;
