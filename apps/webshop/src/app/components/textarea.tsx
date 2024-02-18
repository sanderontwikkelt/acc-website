import * as React from "react";

import { cn } from "@acme/ui";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col", className)}>
        {!!label && <label className="mb-2">{label}</label>}
        <textarea
          className={cn(
            "placeholder:text-description flex h-24 w-full border-b border-transparent border-b-border bg-background px-3 py-2 text-[1.0625rem] font-normal transition-all focus:border-border focus-visible:border-border disabled:cursor-not-allowed disabled:opacity-50",
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
