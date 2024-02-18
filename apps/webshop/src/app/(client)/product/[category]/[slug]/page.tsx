import { WEB_URL } from "~/lib/constants";
import { metadata } from "../../../../layout";
import type { Product, Media, ProductCategory, ProductVariant, ProductPaymentPlan } from "@acme/db";
import { db } from "@acme/db";
import { notFound } from "next/navigation";
import ServerWrapper from "~/components/server-wrapper";
import Section from "~/components/section";
import ProductDetails from "~/components/product-details";

async function getProduct(id: string) {
  const tags = ["product/" + id];
  const url = `${WEB_URL}/api/products?slug=${id}`;
  try {
    const res = await fetch(url, {
      next: { tags, revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    return res.json() as Promise<Product & { images: {media:Media}[], variants: ProductVariant[], paymentPlans: ProductPaymentPlan[] }>;
  } catch (e) {
    console.log({ e, url });
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; category: string };
}) {
  const {slug, category} = params;
  const product = await getProduct(slug);
  if (!product) return metadata;

  const title = product.seoTitle || product.title
  const description = product.seoDescription || product.description

  return {
    metadataBase: new URL(WEB_URL),
    title,
    description,
    alternates: {
      canonical: `/product/${category||'geen-categorie'}/${slug}`,
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      title,
      description,
      url: `${WEB_URL}/${slug}`,
      siteName: "Physis",
      ...(product.images?.length && { images: product.images.map((image) => image.media.url) }),
      locale: "nl_NL",
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const products = await db.query.product.findMany({
    columns: {
        slug: true,
        categoryId: true,
    },
    with: {
      category: true
    }
  });
  return products.map(({ slug, category }: { slug: string; category: ProductCategory | null }) => ({
    pathname: ["product", category?.slug || 'geen-categorie', slug],
    slug,
  }));
}

export default async function DynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);
  if (!product?.id) return notFound();
return <ServerWrapper>
  <Section id="product-details" className="py-10 md:py-20">
    <ProductDetails product={{...product, images: product.images.map((image) => image.media)}} />
  </Section>
  </ServerWrapper>;
}
