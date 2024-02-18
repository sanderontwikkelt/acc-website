import React, { useCallback } from "react";

import type { PaymentPlan } from "./collapsable-payment-plan";
import { CollapsiblePaymentPlan } from "./collapsable-payment-plan";
import DragList from "./drag-list";

const DynamicPaymentPlanList = ({
  values,
  onChange,
  disabled,
}: {
  disabled?: boolean;
  values: PaymentPlan[];
  onChange: (value: PaymentPlan[]) => void;
}) => {
  const dragItem = useCallback(
    ({ value, index }: { value: PaymentPlan; index: number }) => (
      <div className="w-full space-y-2">
        <CollapsiblePaymentPlan
          value={value}
          setValue={(v) =>
            onChange(
              values.map((oldValue, idx) => (idx === index ? v : oldValue)),
            )
          }
        />
      </div>
    ),
    [values],
  );

  return (
    <div className="space-y-4">
      <DragList
        className="mb-0"
        disabled={disabled}
        values={values || []}
        onChange={onChange}
        dragItem={dragItem}
        root
      />
    </div>
  );
};

export default DynamicPaymentPlanList;
