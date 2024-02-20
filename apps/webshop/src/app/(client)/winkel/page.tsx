import type { Media, Product, ProductCategory } from "@acme/db";

import Products from "~/components/products";
import Section from "~/components/section";
import ServerWrapper from "~/components/server-wrapper";
import { API_URL } from "~/lib/constants";

async function getProducts(id: string) {
  const tags = ["products/" + id];
  const url = `${API_URL}/api/products?slug=${id}`;
  try {
    const res = await fetch(url, {
      next: { tags, revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    return res.json() as Promise<
      (Product & {
        images: { media: Media };
        category: ProductCategory;
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
  const products = await getProducts("");
  return (
    <ServerWrapper>
      <Section id="winkel" className="py-20 md:py-40">
        <Products products={products} />
      </Section>
    </ServerWrapper>
  );
}
