import * as React from "react";

import { cn } from "@acme/ui";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "placeholder:text-main flex h-24 w-full border-b border-primary bg-transparent py-2 text-[1.0625rem] font-medium transition-all focus:px-3 focus:outline-primary focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
