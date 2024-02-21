import { notFound } from "next/navigation";

import type { Library, LibraryCategory, Media } from "@acme/db";
import { db } from "@acme/db";

import Hero from "~/components/blocks/hero";
import ProductDescription from "~/components/blocks/product-description";
import Section from "~/components/section";
import ServerWrapper from "~/components/server-wrapper";
import { API_URL, WEB_URL } from "~/lib/constants";
import { metadata } from "../../../../layout";

async function getLibrary(id: string) {
  const tags = ["library/" + id];
  const url = `${API_URL}/api/libraries/${id}`;
  try {
    const res = await fetch(url, {
      next: { tags, revalidate: 0 },
    } as RequestInit);

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    return res.json() as Promise<
      Library & {
        images: { media: Media }[];
        variants: LibraryVariant[];
        paymentPlans: LibraryPaymentPlan[];
      }
    >;
  } catch (e) {
    console.log({ e, url });
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; category: string };
}) {
  const { slug, category } = params;
  const library = await getLibrary(slug);
  if (!library) return metadata;

  const title = library.seoTitle || library.title;
  const description = library.seoDescription || library.description;

  return {
    metadataBase: new URL(WEB_URL),
    title,
    description,
    alternates: {
      canonical: `/library/${category || "geen-categorie"}/${slug}`,
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      title,
      description,
      url: `${WEB_URL}/${slug}`,
      siteName: "Physis",
      ...(library.images?.length && {
        images: library.images.map((image) => image.media.url),
      }),
      locale: "nl_NL",
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const libraries = await db.query.library.findMany({
    columns: {
      slug: true,
      categoryId: true,
    },
    with: {
      category: true,
    },
  });
  return libraries.map(
    ({
      slug,
      category,
    }: {
      slug: string;
      category: LibraryCategory | null;
    }) => ({
      pathname: ["library", category?.slug || "geen-categorie", slug],
      slug,
    }),
  );
}

export default async function DynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const library = await getLibrary(params.slug);
  if (!library?.id) return notFound();
  return (
    <ServerWrapper>
      <Section id="library-hero" className="bg-accent">
        <Hero
          title={library.title}
          description={library.description}
          image={{ ...library.media, src: library.media.url }}
          variant="blog"
          breadcrumbs={[
            { title: "Home", href: "/" },
            { title: library.title, href: "#", active: true },
          ]}
        />
      </Section>
      <Section id="library-details" className="py-10 md:py-20">
        <ProductDescription
          library={{
            ...library,
            images: library.images.map((image) => image.media),
          }}
        />
      </Section>
    </ServerWrapper>
  );
}
