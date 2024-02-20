"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Library, LibraryCategory, Media } from "@acme/db";
import { cn, NextImage } from "@acme/ui";

function formatDate(dateString: Date) {
  const months = [
    "januari",
    "februari",
    "maart",
    "april",
    "mei",
    "juni",
    "juli",
    "augustus",
    "september",
    "oktober",
    "november",
    "december",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${day} ${month} ${year} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  return formattedDate;
}

const Libraries = ({
  libraries,
}: {
  libraries: (Library & { category: LibraryCategory; media: Media })[];
}) => {
  const [tab, setTab] = useState("all");
  return (
    <>
      <div className="my-5 flex items-center space-x-6 md:mb-10 md:mt-8">
        {[
          { key: "all", label: "Alles" },
          { key: "read", label: "Lees" },
          { key: "watch", label: "Kijk" },
          { key: "listen", label: "Luister" },
        ].map(({ key, label }) => (
          <button
            className={cn(
              "text-lg font-normal md:text-2xl",
              key === tab
                ? "underline"
                : "opacity-60 transition-opacity hover:opacity-100",
            )}
            key={key}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid w-full gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 md:gap-y-12">
        {libraries
          .filter((library) => tab === "all" || tab === library.type)
          .map(({ id, title, media, createdAt, slug, category }) => (
            <Link
              key={id}
              className=""
              href={`/${category?.slug || "geen-categorie"}/${slug}`}
            >
              <NextImage
                alt={title}
                image={{ ...media, src: media.url }}
                className="mb-5 h-60 object-cover"
              />
              <h3 className="mb-2 text-lg font-semibold md:text-2xl">
                {title}
              </h3>
              <p className="text-sm opacity-60">{formatDate(createdAt)}</p>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Libraries;
