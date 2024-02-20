import React, { useCallback } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import DragList from "./drag-list";
import { Label } from "./label";

export interface NavItem {
  pathname: string;
  name: string;
  values: NavItem[];
}

const DynamicNavs = ({
  values,
  onChange,
  items,
  root,
}: {
  values: NavItem[];
  items: { pathname: string; name: string }[];
  onChange: (value: NavItem[]) => void;
  root?: boolean;
}) => {
  const handleChange = useCallback(
    (value: NavItem, index: number) => {
      onChange(
        values.map((oldValue, idx) => (idx === index ? value : oldValue)),
      );
    },
    [values, onChange],
  );

  const dragItem = useCallback(
    ({ value, index }: { value: NavItem; index: number }) => (
      <div className="w-full space-y-2">
        <Select
          value={value.pathname}
          onValueChange={(v) => {
            const item = items.find(({ pathname }) => pathname === v);
            handleChange(item ? { ...value, ...item } : value, index);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecteer een link" />
          </SelectTrigger>
          <SelectContent>
            {items?.map(({ pathname, name }, i) => (
              <SelectItem key={pathname + i} value={pathname}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {!!root && (
          <div className="pt-2">
            <div className="-translate-y-1">
              <Label>Onderliggende links</Label>
            </div>
            <DynamicNavs
              values={value.values}
              items={items}
              onChange={(v) =>
                onChange(
                  values.map((value, idx) =>
                    idx === index ? { ...value, values: v } : value,
                  ),
                )
              }
            />
          </div>
        )}
      </div>
    ),
    [values, handleChange, items, root, onChange],
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

export default DynamicNavs;
