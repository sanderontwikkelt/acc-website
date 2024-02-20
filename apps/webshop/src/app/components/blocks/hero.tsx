import React from "react";
import Link from "next/link";

import { cn } from "@acme/ui";

import type { ImageType, LinksType } from "~/lib/types";
import { setHtml } from "~/lib/setHtml";
import Breadcrumbs from "../breadcrumbs";
import NextImage from "../NextImage";
import Section from "../section";

export type ContentVariant =
  | "side-image"
  | "full-width"
  | "blog"
  | "default"
  | "arrow";

const hero = ({
  title,
  description,
  image,
  variant = "side-image",
  links,
  breadcrumbs,
  icon,
  background,
}: {
  title: string;
  subtitle?: string;
  description: string;
  image: ImageType;
  background?: string;
  icon?: ImageType;
  variant?: ContentVariant;
  links?: LinksType[];
  breadcrumbs?: LinksType[];
}) => {
  const isSideImage = variant === "side-image";
  const isBlog = variant === "blog";
  const isDefault = variant === "default";
  const isArrow = variant === "arrow";
  const dark = background === "#0F1012";

  if (isDefault)
    return (
      <article className="w-full py-[10.625rem]">
        <h1
          {...setHtml(title)}
          className="animate-moveToRight mb-4 text-[2.125rem] font-medium leading-[2.5rem] md:text-[3.5rem] md:leading-[4.2rem]"
        />
        <p
          className="animate-moveToRight text-2xl duration-1000"
          {...setHtml(description)}
        />
      </article>
    );

  const arrow = (
    <Link href="#next-section" className=" animate-moveToDown md:ml-16">
      <svg
        width="51"
        height="67"
        viewBox="0 0 51 67"
        className={cn(
          "transition-all duration-300 hover:scale-110",
          dark ? "fill-white" : "fill-main",
        )}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fillRule="evenodd" clipRule="evenodd" d="M23 63H29V0H23V63Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 40.5472L23.6124 65L28 60.4528L4.39067 36L0 40.5472Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21 62.5446L25.4572 67L51 41.457L46.5459 37L21 62.5446Z"
        />
      </svg>
    </Link>
  );

  return (
    <>
      <div
        className={cn(
          isSideImage || isBlog || isArrow ? "" : "md:pb-[29rem]",
          dark ? "text-white" : "",
        )}
      >
        <article
          className={cn(
            "w-full py-10 md:py-[10.625rem] md:pr-[9rem]",
            isSideImage ? "md:max-w-[60%]" : "pb-[6.25rem] md:pr-0",
          )}
        >
          {isBlog && !!breadcrumbs && (
            <div className="relative h-0">
              <Breadcrumbs dark={dark} breadcrumbs={breadcrumbs} />
            </div>
          )}
          <div
            className={cn(
              "mb-4",
              isBlog ? "mb-10" : "flex justify-between",
              isSideImage ? "items-center" : "items-end",
            )}
          >
            <h1
              {...setHtml(title)}
              className={cn(
                "animate-moveToRight text-[2.125rem] font-medium leading-[2.5rem] md:text-[3.5rem] md:leading-[4.2rem]",
                isArrow ? "mb-7" : "",
              )}
            />
            {isSideImage ? (
              icon ? (
                <NextImage image={icon} alt="Hero icon" />
              ) : null
            ) : isBlog || isArrow ? null : (
              arrow
            )}
          </div>
          {!!description && (
            <p
              className="animate-moveToRight duration-[1500ms] text-4xl"
              {...setHtml(description)}
            />
          )}
          {isArrow && <div className="flex justify-end">{arrow}</div>}
        </article>

        {!isArrow && (
          <div
            className={
              isSideImage
                ? "absolute right-0 top-0 z-10 mt-[11rem] h-[calc(100%-11rem)] w-full md:right-20 md:w-[40%]"
                : isBlog
                  ? "h-[40.625rem] w-full"
                  : "bottom-0 left-0 w-screen max-md:-ml-5 md:absolute md:h-[35rem]"
            }
          >
            <NextImage
              image={image}
              alt="Hero"
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
      {!!links && isSideImage && !isArrow && (
        <Section
          id="hero-links"
          className="absolute bottom-0 left-0 w-full bg-white"
          innerClassName="md:py-16 space-x-10 flex items-center"
        >
          {links.map(({ title, href }) => (
            <Link
              href={href}
              key={title}
              className="flex items-center text-base text-[#0F1012]/50"
            >
              {title}
              <svg
                width="8"
                className="ml-1"
                height="11"
                viewBox="0 0 8 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.5"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.50657 0V9.00471L0.697958 6.03797L0 6.77516L3.30229 10.2631L3.75353 10.7394L4.00025 11L8 6.77516L7.30229 6.03797L4.49368 9.00471V0H3.50657Z"
                  fill="#0F1012"
                />
              </svg>
            </Link>
          ))}
        </Section>
      )}
      <div id="next-section" />
    </>
  );
};

export default hero;
