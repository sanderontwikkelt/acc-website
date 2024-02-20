"use client";

import React, { useEffect, useState } from "react";

import type { Library, LibraryCategory, Media } from "@acme/db";
import { cn } from "@acme/ui";

import type { Button as ButtonType } from "~/lib/types";
import { API_URL } from "~/lib/constants";
import { setHtml } from "~/lib/setHtml";
import { Button } from "../button";
import Libraries from "../libraries";

interface Lib extends Library {
  category: LibraryCategory;
  media: Media;
}

async function getLibraries(ids: number[], setLibraries: (n: Lib[]) => void) {
  const tags = ["libraries"];
  const url = `${API_URL}/api/libraries?ids=${ids.join(",")}`;
  try {
    const res = await fetch(url, {
      next: { tags, revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    setLibraries((await res.json()) as Lib[]);
  } catch (e) {
    console.log({ e, url });
  }
}

const LibraryPreview = ({
  title,
  ids,
  align,
  description,
  button,
}: {
  button: ButtonType;
  description: string;
  align: string;
  title: string;
  ids: number[];
}) => {
  const [libraries, setLibraries] = useState<Lib[]>([]);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getLibraries(ids, setLibraries);
  }, [ids]);
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "right"
          ? "items-end"
          : align === "center"
            ? "items-center"
            : "items-start",
      )}
    >
      {!!title && (
        <h2
          {...setHtml(title)}
          className="text-[2.125rem] font-medium leading-[2.5rem] max-md:text-center md:text-[3.5rem] md:leading-[4.2rem]"
        />
      )}
      {!!description && <p {...setHtml(description)} />}
      <Libraries libraries={libraries} />
      {button?.title && (
        <Button className="mt-6" {...button}>
          {button.title}
        </Button>
      )}
    </div>
  );
};

export default LibraryPreview;
