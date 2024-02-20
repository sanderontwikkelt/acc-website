import React, { useCallback } from "react";

import type { ButtonValue } from "~/app/(dashboard)/pages/[pageId]/builder/components/collapsable-button";
import { CollapsibleButton } from "~/app/(dashboard)/pages/[pageId]/builder/components/collapsable-button";
import DragList from "./drag-list";

const DynamicButtonList = ({
  values,
  onChange,
  disabled,
}: {
  disabled?: boolean;
  values: ButtonValue[];
  onChange: (value: ButtonValue[]) => void;
}) => {
  const dragItem = useCallback(
    ({ value: buttonValue, index }: { value: ButtonValue; index: number }) => (
      <div className="w-full space-y-2">
        <CollapsibleButton
          value={buttonValue}
          setValue={(v) =>
            onChange(
              values.map((oldValue, idx) => (idx === index ? v : oldValue)),
            )
          }
        >
          {null}
        </CollapsibleButton>
      </div>
    ),
    [values, onChange],
  );

  return (
    <div className="space-y-4">
      <DragList
        className="mb-0 p-0"
        disabled={disabled}
        values={values || []}
        onChange={onChange}
        dragItem={dragItem}
        root
      />
    </div>
  );
};

export default DynamicButtonList;
