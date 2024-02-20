"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const Builder = () => {
  const search = useSearchParams();
  const builder = search.get("mode") === "builder";

  useEffect(() => {
    const clickEvent = (event: MouseEvent) => {
      // Check if the click event occurred within a section
      if ((event.target as HTMLElement).closest("section")) {
        // Get the ID of the clicked section
        if (
          !["BUTTON", "A"].includes((event.target as HTMLElement).nodeName) &&
          !["BUTTON", "A"].includes(
            (event.target as HTMLElement).parentNode?.nodeName,
          )
        ) {
          const sectionId = (event.target as HTMLElement).closest(
            "section",
          )?.id;

          parent.postMessage(sectionId, "*");
        }
      }
    };

    if (builder) document.addEventListener("click", clickEvent);
    return () =>
      builder ? document.removeEventListener("click", clickEvent) : undefined;
  }, [builder]);
  return null;
};
