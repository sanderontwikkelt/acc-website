import { useCallback } from "react";

import type { Media } from "@acme/db";

import type { MediaType } from "../modals/media-modal";
import DragList from "./drag-list";
import MediaItem from "./media-item";

export interface MediaValue {
  src: string;
  width: number;
  height: number;
  id: number;
  name: string;
  objectFit?: "cover" | "contain";
  objectPosition?: { x: number; y: number };
}

interface MediaSelectProps {
  disabled?: boolean;
  onChange: (value: MediaValue[]) => void;
  values: MediaValue[] | null;
  type?: MediaType;
  multiple?: boolean;
}

const MediaSelect: React.FC<MediaSelectProps> = ({
  onChange,
  values,
  type = "image",
  multiple = false,
}) => {
  const dragItem = useCallback(
    ({ value }: { value: Media }, i: number) => (
      <MediaItem
        type={type}
        value={value}
        onChange={(item) =>
          onChange(
            values?.map((v, idx) => (idx === i ? { ...v, ...item } : v)) || [],
          )
        }
      />
    ),
    [type, values, onChange],
  );
  return (
    <div>
      <DragList
        values={values || []}
        onChange={onChange}
        dragItem={dragItem}
        root={multiple}
      />
    </div>
  );
};

export default MediaSelect;
