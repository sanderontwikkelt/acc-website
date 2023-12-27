import { metadata } from "../../layout";
import { API_URL, WEB_URL } from "@/lib/constants";

async function getProduct(id: string) {
  const tags = ["product/" + id];
  const url = `${API_URL}/api/product/${id}`;
  try {
    const res = await fetch(url, {
      next: { tags },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch seo");
    }

    return res.json();
  } catch (e) {
    console.log({ e, url });
  }
}

export async function generateMetadata({
  params,
}: {
  params: { pathname: string[] };
}) {
  const id = params.pathname?.[params.pathname.length - 1] || "";
  const pathname = params.pathname?.join("/") || "";
  const product = (await getProduct(id)) || metadata;

  return {
    metadataBase: new URL(WEB_URL),
    title: product.title,
    description: product.description,
    alternates: {
      canonical: `/${pathname}`,
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      title: product.title,
      description: product.description,
      url: `${WEB_URL}/${pathname}`,
      siteName: "Physis",
      ...(product.media && { images: [product.media] }),
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
}: {
  params: { pathname: string[] };
}) {
  const id = params.pathname?.[params.pathname.length - 1] || "";
  const product = (await getProduct(id)) || metadata;

  return <div>product {id}</div>;
}
