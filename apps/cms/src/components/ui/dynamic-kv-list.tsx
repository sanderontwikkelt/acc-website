import React, { useCallback } from "react";

import DragList from "./drag-list";
import { Input } from "./input";
import RichText from "./rich-text";
import { Label } from "./label";

interface Item {
  title?: string;
  description?: string;
};

const DynamicKVList = ({
  values,
  onChange,
}: {
  values: Item[];
  onChange: (value: Item[]) => void;
}) => {
  const handleChange = useCallback(
    (
      value: Item,
      field: "title" | "description",
      fieldValue: string,
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
      <div className="w-full space-y-2">
        <Label>Titel</Label>
          <Input
            value={value.title}
            onChange={(e) =>
              handleChange(value, "title", e.target.value, index)
            }
          />
          </div>
          <div className="w-full space-y-2">
        <Label>Beschrijving</Label>
        <RichText
          id={"drag-list" + index}
          value={value.description}
          onChange={(e) => handleChange(value, "description", e, index)}
        />
      </div>
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

export default DynamicKVList;
