import type { Media, Teacher } from "@acme/db";

import GoogleMaps from "~/components/blocks/google-map";
import ServerWrapper from "~/components/server-wrapper";
import { API_URL } from "~/lib/constants";

async function getTeachers(id: string) {
  const tags = ["teachers"];
  const url = `${API_URL}/api/teachers?slug=${id}`;
  try {
    const res = await fetch(url, {
      next: { tags, revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    return res.json() as Promise<
      (Teacher & {
        media: Media;
      })[]
    >;
  } catch (e) {
    console.log({ e, url });
  }
}

export const metadata = {
  title: "Physis specialisten",
};

export default async function Page() {
  const teachers = await getTeachers("");
  return (
    <ServerWrapper>
      <div className="bg-main h-[6.25rem] w-full" />

      <GoogleMaps
        title="Een overzicht van Physis specialisten."
        placeholder="Zoek op locatie"
        teachers={[...teachers, ...teachers, ...teachers, ...teachers]}
      />
    </ServerWrapper>
  );
}
