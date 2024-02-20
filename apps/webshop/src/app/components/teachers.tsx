"use client";

import React, { useEffect, useState } from "react";

import type { ImageType } from "~/lib/types";
import { API_URL } from "~/lib/constants";
import Teacher from "./teacher";

export interface Teacher {
  image: ImageType;
  name: string;
  title: string;
  description: string;
}

async function fetchTeachers(ids: string[]) {
  const tags = ["teachers"];
  const url = `${API_URL}/api/teachers?ids=${ids.join(",")}`;
  try {
    const res = await fetch(url, {
      next: { tags },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch teacher");
    }

    return res.json();
  } catch (e) {
    console.log({ e, url });
  }
}

async function getTeachers(ids: string[], setTeachers: (t: Teacher[]) => void) {
  const teachers = await fetchTeachers(ids);
  if (teachers)
    setTeachers(
      teachers.map(({ name, title, media, description }) => ({
        name,
        image: { ...media, src: media.url },
        title,
        description,
      })) as Teacher[],
    );
}

const Teachers = ({ ids }: { ids: string[] }) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (ids?.length) getTeachers(ids, setTeachers);
  }, [ids]);

  return (
    <>
      {teachers.map((teacher) => (
        <Teacher key={teacher.name} {...teacher} />
      ))}
    </>
  );
};

export default Teachers;
