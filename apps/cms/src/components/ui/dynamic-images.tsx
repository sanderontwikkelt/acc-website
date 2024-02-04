import { useCallback } from "react";

import type { Media } from "@acme/db";

import type { MediaType } from "../modals/media-modal";
import DragList from "./drag-list";
import MediaItem from "./media-item";

interface DynamicImagesProps {
  disabled?: boolean;
  onChange: (value: Media[]) => void;
  values: Media[] | null;
  type?: MediaType;
  multiple?: boolean;
}

const DynamicImages: React.FC<DynamicImagesProps> = ({
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

export default DynamicImages;
