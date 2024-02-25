import type { Media, Specialist } from "@acme/db";

import GoogleMaps from "~/components/blocks/google-map";
import ServerWrapper from "~/components/server-wrapper";
import { API_URL } from "~/lib/constants";

async function getSpecialists(id: string) {
  const tags = ["specialists"];
  const url = `${API_URL}/api/specialists?slug=${id}`;
  try {
    const res = await fetch(url, {
      next: { tags, revalidate: 0 },
    } as RequestInit);

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    return res.json() as Promise<
      (Specialist & {
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
  const specialists = await getSpecialists("");
  return (
    <ServerWrapper>
      <div className="bg-main h-[6.25rem] w-full" />

      <GoogleMaps
        title="Een overzicht van Physis specialisten."
        placeholder="Zoek op locatie"
        specialists={specialists}
      />
    </ServerWrapper>
  );
}
