import type { ReactNode } from "react";
import React from "react";
import { QuestionMarkIcon } from "@radix-ui/react-icons";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const InfoTooltip = ({ children }: { children: ReactNode }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="ml-2 rounded-sm bg-accent px-1 py-0.5">
          <QuestionMarkIcon className="w-3" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{children}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InfoTooltip;
