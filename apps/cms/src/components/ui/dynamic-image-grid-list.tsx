import React, { useCallback } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import DragList from "./drag-list";
import MediaSelect, { MediaValue } from "./media-select";

type Item = { cols: number; image?: MediaValue };

const DynamicImageGridList = ({
  values,
  onChange,
}: {
  values: Item[];
  onChange: (value: Item[]) => void;
}) => {
  const handleChange = useCallback(
    (
      value: Item,
      field: "cols" | "image",
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
        <Select
          value={value.cols.toString()}
          onValueChange={(cols) => handleChange(value, "cols", cols, index)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecteer target" />
          </SelectTrigger>
          <SelectContent>
            {Array(12)
              .fill(0)
              .map((_, i: number) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        {!!value.image && (
          <MediaSelect
            values={[value.image]}
            onChange={([media]) => handleChange(value, "image", media, index)}
          />
        )}
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

export default DynamicImageGridList;
