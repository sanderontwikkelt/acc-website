import React from "react";
import Link from "next/link";

import type { Media, Product, ProductCategory } from "@acme/db";
import { NextImage } from "@acme/ui";

import { formatter } from "~/lib/utils";

const Products = ({
  products,
}: {
  products: (Product & {
    images: { media: Media };
    category: ProductCategory;
  })[];
}) => {
  return (
    <>
      <div className="grid w-full gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 md:gap-y-12">
        {products.map(({ id, title, images, price, slug, category }) => {
          const media = images[0]?.media;
          return (
            <Link
              key={id}
              className=""
              href={`/product/${category?.slug || "geen-categorie"}/${slug}`}
            >
              {!!media && (
                <NextImage
                  alt={title}
                  image={{ ...media, src: media.url }}
                  className="mb-5 h-60 object-cover"
                />
              )}
              <h3 className="mb-2 text-lg font-semibold md:text-2xl">
                {title}
              </h3>
              <p className="text-sm font-medium text-[#2ADC84]">
                {formatter.format(price)}
              </p>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Products;
