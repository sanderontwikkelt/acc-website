import * as React from "react";

import { cn } from "@acme/ui";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
  }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="">
        {!!label && <label className="mb-2">{label}</label>}
      <textarea
        className={cn(
          "placeholder:text-main flex h-24 w-full border-b border-transparent border-b-border bg-transparent py-2 text-[1.0625rem] font-medium transition-all focus:px-3 focus:border-border focus-visible:border-border disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
