"use client";

import { cn } from "@/lib/cn";
import { LinksType } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Breadcrumbs = ({
  breadcrumbs,
  dark,
}: {
  breadcrumbs: LinksType[];
  dark: boolean;
}) => {
  const currentPathname = usePathname().split("?")[0];
  return (
    <div className="absolute bottom-10 left-0 flex items-center space-x-3">
      {breadcrumbs.map(({ title, href }, i) => (
        <div className="flex items-center space-x-3" key={title}>
          {!!i && (
            <svg
              width="8"
              height="12"
              className={dark ? "fill-white" : "fill-main"}
              viewBox="0 0 8 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.51284 0L0 1.4004L4.97316 6L0 10.5997L1.51284 12L8 6L1.51284 0Z"
              />
            </svg>
          )}
          <Link
            href={href}
            className={cn(
              "flex items-center text-base",
              currentPathname === href.replace("#", "").split("?")[0]
                ? ""
                : "opacity-50"
            )}
          >
            {title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
