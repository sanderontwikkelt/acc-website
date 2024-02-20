import React, { useCallback } from "react";

import type { MediaValue } from "./media-select";
import DragList from "./drag-list";
import { Input } from "./input";
import MediaSelect from "./media-select";

interface Item {
  href: string;
  image: MediaValue;
}

const DynamicLinkImages = ({
  values,
  onChange,
}: {
  values: Item[];
  onChange: (value: Item[]) => void;
}) => {
  const handleChange = useCallback(
    (
      value: Item,
      field: "href" | "image",
      fieldValue: string | MediaValue,
      index: number,
    ) => {
      onChange(
        values.map((oldValue, idx) =>
          idx === index ? { ...value, [field]: fieldValue } : oldValue,
        ),
      );
    },
    [values],
  );

  const dragItem = useCallback(
    ({ value, index }: { value: Item; index: number }) => (
      <div className="w-full space-y-2">
        <MediaSelect
          values={[value.image]}
          onChange={([media]) => handleChange(value, "image", media, index)}
        />
        <Input
          value={value.href}
          placeholder="Href"
          onChange={(e) => handleChange(value, "href", e.target.value, index)}
        />
      </div>
    ),
    [values],
  );
  return (
    <DragList
      values={values || []}
      onChange={onChange}
      dragItem={dragItem}
      root
    />
  );
};

export default DynamicLinkImages;
