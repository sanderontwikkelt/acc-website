"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { Teacher } from "@acme/db";

import DynamicSelect, { Item } from "./dynamic-select";

const DynamicTeachers = ({
  values,
  onChange,
  items,
}: {
  values: Teacher[];
  onChange: (value: Teacher[]) => void;
  items: any;
}) => {
  return (
    <DynamicSelect
      values={values.map(({ id, name }) => ({ key: String(id), name }))}
      onChange={(newItems) =>
        onChange(
          items.filter((i: any) => newItems.some((n) => +n.key === +i.id)),
        )
      }
      items={items}
    />
  );
};

export default DynamicTeachers;
