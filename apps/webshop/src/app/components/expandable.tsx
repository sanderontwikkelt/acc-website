"use client";

import type { ReactNode } from "react";
import React, { useRef, useState } from "react";

import { cn } from "@acme/ui";

const Expandable = ({
  children,
  maxHeight = "20rem",
}: {
  children: ReactNode;
  maxHeight: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => {
    setIsExpanded(!isExpanded);
    if (parentRef.current && ref.current)
      parentRef.current.style.height = !isExpanded
        ? +ref.current.getBoundingClientRect().height + "px"
        : maxHeight;
  };
  return (
    <div>
      <div
        ref={parentRef}
        style={{ height: maxHeight }}
        className={cn(
          `relative overflow-hidden transition-[height] duration-300`,
          isExpanded
            ? ""
            : "after:absolute after:bottom-0 after:left-0 after:z-10 after:h-24 after:w-full after:bg-gradient-to-t after:from-white after:to-white/0",
        )}
      >
        <div ref={ref}>{children}</div>
      </div>
      <button onClick={toggle} className="mt-4 underline">
        {isExpanded ? "Minder tonen" : "Meer tonen"}
      </button>
    </div>
  );
};

export default Expandable;
