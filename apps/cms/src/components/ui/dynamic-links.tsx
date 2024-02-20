import React, { useCallback } from "react";

import DragList from "./drag-list";
import { Input } from "./input";

export interface Item {
  title: string;
  href: string;
}

const DynamicLinks = ({
  values,
  onChange,
}: {
  values: Item[];
  onChange: (value: Item[]) => void;
}) => {
  const handleChange = useCallback(
    (
      value: Item,
      field: "title" | "href",
      fieldValue: string,
      index: number,
    ) => {
      onChange(
        values.map((oldValue, idx) =>
          idx === index ? { ...value, [field]: fieldValue } : oldValue,
        ),
      );
    },
    [values, onChange],
  );

  const dragItem = useCallback(
    ({ value, index }: { value: Item; index: number }) => (
      <div className="w-full space-y-2">
        <Input
          value={value.title}
          placeholder="Titel"
          onChange={(e) => handleChange(value, "title", e.target.value, index)}
        />
        <Input
          value={value.href}
          placeholder="Href"
          onChange={(e) => handleChange(value, "href", e.target.value, index)}
        />
      </div>
    ),
    [handleChange],
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

export default DynamicLinks;
