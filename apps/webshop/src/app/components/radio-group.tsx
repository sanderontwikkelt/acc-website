import { RadioGroup } from "@headlessui/react";

import { cn } from "@acme/ui";

export default function RadioGroupForm({
  value,
  onChange,
  options,
  noGap,
}: {
  noGap?: boolean;
  value: number | null;
  onChange: (r: number) => void;
  options: { id: number; name: string; description: string }[];
}) {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <RadioGroup.Label className="sr-only">Privacy setting</RadioGroup.Label>
      <div className={noGap ? "" : "space-y-4"}>
        {options.map((setting, settingIdx) => (
          <RadioGroup.Option
            key={setting.id}
            value={setting.id}
            className={({ checked }) =>
              cn(
                "border-main border",
                settingIdx === 0 ? "" : "",
                settingIdx === options.length - 1 ? "" : "",
                checked ? "border-main z-10 bg-gray-100" : "",
                "relative flex cursor-pointer border p-4 focus:outline-none",
                noGap ? "border-t-0" : "",
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={cn(
                    checked
                      ? "border-transparent bg-gray-600"
                      : "border-gray-300 bg-white",
                    active ? "ring-2 ring-gray-600 ring-offset-2" : "",
                    "mt-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border",
                  )}
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <span className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className={cn(
                      checked ? "text-gray-900" : "text-gray-900",
                      "block text-sm font-medium",
                    )}
                  >
                    {setting.name}
                  </RadioGroup.Label>
                  <RadioGroup.Description
                    as="span"
                    className={cn(
                      checked ? "text-gray-700" : "text-gray-500",
                      "block text-sm",
                    )}
                  >
                    {setting.description}
                  </RadioGroup.Description>
                </span>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
