import * as React from "react";

import { cn } from "@acme/ui";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "placeholder:text-main flex h-12 w-full border-b border-primary bg-accent py-2 text-[1.0625rem] font-medium transition-all focus:px-3 focus:outline-primary focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
