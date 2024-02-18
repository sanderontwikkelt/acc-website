import * as React from "react";

import { cn } from "@acme/ui";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col", className)}>
        {!!label && <label className="mb-2">{label}</label>}
        <input
          type={type}
          className={cn(
            "placeholder:text-description flex h-12 w-full border-b border-transparent border-b-border bg-background px-3 py-2 text-[1.0625rem] font-normal transition-all focus:border-border focus-visible:border-border disabled:cursor-not-allowed disabled:opacity-50",
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
