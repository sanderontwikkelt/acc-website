"use client";

import React from "react";

import { api } from "~/trpc/react";
import DynamicSelect from "./dynamic-select";

const DynamicCourses = ({
  values,
  onChange,
}: {
  values: number[];
  onChange: (value: number[]) => void;
}) => {
  const { data } = api.course.all.useQuery();
  return (
    <DynamicSelect
      values={values.map((id) => String(id))}
      onChange={(newItems) => onChange(newItems.map((id) => +id))}
      items={data?.map(({ id, title }) => ({ key: String(id), name: title }))}
    />
  );
};

export default DynamicCourses;
