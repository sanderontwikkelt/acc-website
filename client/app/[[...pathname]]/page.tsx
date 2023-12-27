import { metadata } from "../layout";
import Client from "./components/client";
import Server from "./components/server";
import { API_URL, WEB_URL } from "@/lib/constants";

async function getSEO(pathname: string) {
  const tags = ["seo" + (pathname.replaceAll("/", "") || "index")];
  try {
    const res = await fetch(
      `${API_URL}/api/seo?pathname=/${pathname}&mode=server`,
      {
        next: { tags },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch seo");
    }

    return res.json();
  } catch (e) {
    console.log({ e, url: `${API_URL}/api/seo?pathname=${pathname}` });
  }
}

export async function generateMetadata({
  params,
}: {
  params: { pathname: string[] };
}) {
  const pathname = params.pathname?.join("/") || "";
  const seo = (await getSEO(pathname)) || metadata;

  return {
    metadataBase: new URL(WEB_URL),
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `/${pathname}`,
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      url: `${WEB_URL}/${pathname}`,
      siteName: "Physis",
      ...(seo.media && { images: [seo.media] }),
      locale: "nl_NL",
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const pages = await fetch(`${API_URL}/api/pages`, {
    next: { revalidate: 0 },
  }).then((res) => res.json());
  return pages.map(({ pathname }: { pathname: string }) => ({
    pathname: [pathname.replace("/", "")],
  }));
}

export default async function DynamicPage({
  params,
  searchParams,
}: {
  params: { pathname: string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const pathname = params.pathname?.join("/") || "";

  const builder = searchParams?.mode === "builder";
  return builder ? <Client /> : <Server pathname={pathname} />;
}
