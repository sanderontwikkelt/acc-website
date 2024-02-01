import React, { useCallback } from "react";

import DragList from "./drag-list";
import { Input } from "./input";

type Value = { id: string; label: string };
const DynamicStringList = ({
  values,
  onChange,
}: {
  values: Value[];
  onChange: (value: Value[]) => void;
}) => {
  const handleChange = useCallback(
    (fieldValue: string, index: number) => {
      onChange(
        values.map((oldValue, idx) => ({
          id: oldValue.id,
          label: idx === index ? fieldValue : oldValue.label,
        })),
      );
    },
    [values],
  );

  const dragItem = useCallback(
    ({ value, index }: { value: Value; index: number }) => (
      <Input
        value={value.label}
        onChange={(e) => handleChange(e.target.value, index)}
      />
    ),
    [values],
  );

  return (
    <div>
      <DragList
        values={values || []}
        onChange={onChange}
        dragItem={dragItem}
        root
      />
    </div>
  );
};

export default DynamicStringList;
