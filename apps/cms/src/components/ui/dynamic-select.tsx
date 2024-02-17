"use client";

import React, { useCallback } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import DragList from "./drag-list";

export interface Item { key: string; name: string };

const DynamicSelect = ({
  values,
  onChange,
  items,
}: {
  values: string[];
  items: Item[];
  onChange: (value: string[]) => void;
}) => {
  const handleChange = useCallback(
    (value: Item, index: number) => {
      onChange(
        values.map((oldValue, idx) => (idx === index ? value.key : oldValue)),
      );
    },
    [values],
  );

  const dragItem = useCallback(
    ({ value, index }: { value: Item; index: number }) => (
      <div className="w-full space-y-2">
        <Select
          value={value.key}
          onValueChange={(v) => {
            const item = items.find(({ key }) => key === v);
            handleChange(item ? { ...value, ...item } : value, index);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecteer een link" />
          </SelectTrigger>
          <SelectContent>
            {items?.map(({ key, name }, i) => (
              <SelectItem key={key + i} value={key}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ),
    [values],
  );

  return (
    <DragList
      values={values?.length ? values.map((key) => ({ key, name: key })) : []}
      onChange={(items) => onChange(items.map((i) => i.key))}
      dragItem={dragItem}
      root
    />
  );
};

export default DynamicSelect;
