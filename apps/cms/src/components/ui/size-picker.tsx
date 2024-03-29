import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "./input";

const options = [
  { label: "Pixels", key: "px" },
  { label: "Procent", key: "%" },
  { label: "Viewport Width", key: "vw" },
  { label: "Viewport Height", key: "vh" },
];
function separateNumbersAndChars(input: string) {
  let numbers = "";
  let chars = "";

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < input.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    if (!isNaN(input[i] as any) && input[i] !== " ") {
      // Check if the character is a number (ignoring spaces)
      numbers += input[i];
    } else {
      // If it's not a number, then it's a character
      chars += input[i];
    }
  }

  return { numbers, chars };
}

const SizePicker = ({
  value = "980px",
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const { numbers, chars = "px" } = separateNumbersAndChars(value);
  return (
    <div className="flex space-x-2">
      <Input
        value={numbers}
        type="number"
        placeholder="980"
        onChange={(v) => {
          const { chars = "px" } = separateNumbersAndChars(value);
          onChange(v.target.value + (chars || "px"));
        }}
      />
      <Select value={chars || "px"} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="px" />
        </SelectTrigger>
        <SelectContent>
          {options?.map(({ key, label }: { key: string; label: string }) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SizePicker;
