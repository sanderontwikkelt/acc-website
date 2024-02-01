import React, { ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const TooltipWrapper = ({
  children,
  disabled,
  message,
}: {
  children: ReactNode;
  disabled?: boolean;
  message: ReactNode;
}) => {
  return (
    <TooltipProvider disableHoverableContent={disabled}>
      <Tooltip>
        <TooltipTrigger className="flex h-full items-center">
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
