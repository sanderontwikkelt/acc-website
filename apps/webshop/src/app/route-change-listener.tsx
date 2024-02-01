"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function RouteChangeListener() {
  const pathname = usePathname();
  const search = useSearchParams();
  const [builder] = useState(() => search.get("mode") === "builder");

  useEffect(() => {
    if (builder) parent.postMessage({ pathname, action: "PATH" }, "*");
  }, [pathname]);

  return <></>;
}
