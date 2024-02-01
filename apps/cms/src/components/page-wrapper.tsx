import React from "react";

import { cn } from "@acme/ui";

const PageWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "h-full flex-1 space-y-4 overflow-auto p-4 md:p-4",
        className,
      )}
      {...props}
    />
  );
});

PageWrapper.displayName = "PageWrapper";
export default PageWrapper;
