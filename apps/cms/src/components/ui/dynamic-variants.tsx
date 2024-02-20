import React, { useCallback } from "react";

import DragList from "./drag-list";
import { Input } from "./input";

interface Value {
  stock?: number;
  title?: string;
}
const DynamicVariants = ({
  values,
  onChange,
}: {
  values: Value[];
  onChange: (value: Value[]) => void;
}) => {
  const dragItem = useCallback(
    ({ value, index }: { value: Value; index: number }) => (
      <div className="grid w-full grid-cols-2 gap-2">
        <Input
          value={value.title}
          placeholder="Titel"
          onChange={(e) =>
            onChange(
              values.map((oldValue, idx) => ({
                ...oldValue,
                title: idx === index ? e.target.value : oldValue.title,
              })),
            )
          }
        />
        <Input
          value={value.stock}
          type="number"
          placeholder="Voorraad"
          onChange={(e) =>
            onChange(
              values.map((oldValue, idx) => ({
                ...oldValue,
                stock: idx === index ? +e.target.value : +oldValue.stock,
              })),
            )
          }
        />
      </div>
    ),
    [values, onChange],
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

export default DynamicVariants;
