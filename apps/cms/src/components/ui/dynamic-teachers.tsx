"use client";

import React, { useEffect, useState } from "react";
import { Teacher } from "@prisma/client";
import axios from "axios";

import DynamicSelect, { Item } from "./dynamic-select";

export const getTeachers = async (setTeachers: (t: Teacher[]) => void) => {
  const { data } = await axios.get("/api/teachers");
  setTeachers(data);
};

const DynamicTeachers = ({
  values,
  onChange,
}: {
  values: string[];
  onChange: (value: string[]) => void;
}) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    getTeachers((i) => setItems(i.map(({ name, id }) => ({ key: id, name }))));
  }, []);
  return (
    <DynamicSelect
      values={
        values.map(
          (id) => items.find(({ key }) => key === id) || { id },
        ) as Item[]
      }
      onChange={(newItems) => onChange(newItems.map(({ key }) => key))}
      items={items}
    />
  );
};

export default DynamicTeachers;
