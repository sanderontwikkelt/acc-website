"use client";

import { useEffect, useState } from "react";

import type { Course, Media } from "@acme/db";

import { API_URL } from "~/lib/constants";
import { setHtml } from "~/lib/setHtml";
import Courses from "../courses";

interface Lib extends Course {
  media: Media;
}

async function getCourses(ids: number[], setCourses: (n: Lib[]) => void) {
  const tags = ["courses"];
  const url = `${API_URL}/api/courses?ids=${ids.join(",")}`;
  try {
    const res = await fetch(url, {
      next: { tags, revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    setCourses((await res.json()) as Lib[]);
  } catch (e) {
    console.log({ e, url });
  }
}

const CoursePreview = ({ title, ids }: { title: string; ids: number[] }) => {
  const [courses, setCourses] = useState<Lib[]>([]);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getCourses(ids, setCourses);
  }, [ids]);
  console.log({ ids, courses });
  return (
    <div>
      {!!title && (
        <h2
          {...setHtml(title)}
          className="font-primary mb-8 text-2xl max-md:text-center md:mb-12 md:text-[2.125rem] md:leading-[3.2rem]"
        />
      )}
      <Courses courses={courses} />
    </div>
  );
};

export default CoursePreview;
