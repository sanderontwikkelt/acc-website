import React, { useCallback } from "react";

import DragList from "./drag-list";
import type { KV } from "~/app/(dashboard)/pages/[pageId]/builder/components/collapsable-kv";
import { CollapsibleKV } from "~/app/(dashboard)/pages/[pageId]/builder/components/collapsable-kv";
import type { ButtonValue } from "~/app/(dashboard)/pages/[pageId]/builder/components/collapsable-button";

const DynamicKVList = ({
  values,
  onChange,
}: {
  values: KV[];
  onChange: (value: KV[]) => void;
}) => {
  const dragItem = useCallback(
    ({ value: buttonValue, index }: { value: ButtonValue; index: number }) => (
      <div className="w-full space-y-2">
        <CollapsibleKV
          value={buttonValue}
          setValue={(v) =>
            onChange(
              values.map((oldValue, idx) => (idx === index ? v : oldValue)),
            )
          }
        >
          {null}
        </CollapsibleKV>
      </div>
    ),
    [values],
  );

  return (
    <DragList
      values={values as Record<string, string>[] || []}
      onChange={onChange}
      dragItem={dragItem}
      root
    />
  );
};

export default DynamicKVList;
