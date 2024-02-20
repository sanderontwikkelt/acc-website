"use client";

import Link from "next/link";

import type { Course, Media } from "@acme/db";
import { NextImage } from "@acme/ui";

const Courses = ({ courses }: { courses: (Course & { media: Media })[] }) => {
  return (
    <>
      <div className="grid w-full gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 md:gap-y-12 lg:grid-cols-4">
        {courses.map(({ id, title, media, slug }) => (
          <Link key={id} className="group" href={`/cursussen/${slug}`}>
            <NextImage
              alt={title}
              image={{ ...media, src: media.url }}
              className="mb-5 aspect-square object-cover"
            />
            <h3 className="mb-2 text-lg font-semibold group-hover:underline md:text-2xl">
              {title}
            </h3>
            <svg
              width="40"
              height="29"
              viewBox="0 0 40 29"
              className="transition-all group-hover:scale-90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.5 16.227H32.4258L21.9074 26.0571L24.521 28.5L36.8872 16.942L38.5761 15.3626L39.5 14.4991L24.521 0.5L21.9074 2.94199L32.4258 12.7721L0.5 12.7721L0.5 16.227Z"
                fill="#0F1012"
              />
            </svg>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Courses;
