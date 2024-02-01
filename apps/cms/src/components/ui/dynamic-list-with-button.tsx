import React, { useCallback } from "react";

import {
  ButtonValue,
  CollapsibleButton,
} from "~/app/(dashboard)/(routes)/pages/[pageId]/builder/components/collapsable-button";
import DragList from "./drag-list";
import { Input } from "./input";
import RichText from "./rich-text";
import { Textarea } from "./textarea";

type Item = {
  title: string;
  description: string;
  button?: ButtonValue;
  hasButton?: boolean;
};

const DynamicListWithButton = ({
  values,
  onChange,
}: {
  values: Item[];
  onChange: (value: Item[]) => void;
}) => {
  const handleChange = useCallback(
    (
      value: Item,
      field: "title" | "description" | "button",
      fieldValue: string | ButtonValue,
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
        <Input
          value={value.title}
          onChange={(e) => handleChange(value, "title", e.target.value, index)}
        />
        <RichText
          id={"list-with-button" + index}
          value={value.description}
          onChange={(e) => handleChange(value, "description", e, index)}
        />
        {!!value.hasButton && !!value.button && (
          <CollapsibleButton
            value={value.button}
            setValue={(v) => handleChange(value, "button", v, index)}
          >
            {value.button.title}
          </CollapsibleButton>
        )}
      </div>
    ),
    [values],
  );

  return (
    <DragList values={values || []} onChange={onChange} dragItem={dragItem} />
  );
};

export default DynamicListWithButton;
