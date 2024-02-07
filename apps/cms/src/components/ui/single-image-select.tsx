"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";

import { Media } from "@acme/db";

import { MediaModal } from "../modals/media-modal";
import { Loader } from "./loader";

interface SingleImageSelectProps {
  disabled?: boolean;
  onChange: (value: Media | null) => void;
  value: Media;
  multiple?: boolean;
}

const SingleImageSelect: React.FC<SingleImageSelectProps> = ({
  onChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState<Media | null>(null);

  useEffect(() => {
    if (value) {
      setImage(value);
    }
  }, [value]);

  return (
    <div>
      <MediaModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selected={image ? [image] : []}
        onSelect={([media]) => onChange(media || null)}
        type="image"
      />
      <button
        type="button"
        className="relative h-36 w-full overflow-hidden rounded-md border border-input bg-secondary"
        onClick={() => setIsOpen(true)}
      >
        {image ? (
          <Image
            fill
            className="object-contain px-5"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            alt={image.filename}
            src={image.url}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {image && isLoading ? <Loader /> : <ImagePlus />}
          </div>
        )}
      </button>
    </div>
  );
};

export default SingleImageSelect;
