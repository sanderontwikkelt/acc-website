import React from "react";

import type {
  Media,
  Product,
  ProductPaymentPlan,
  ProductVariant,
} from "@acme/db";
import { NextImage } from "@acme/ui";

import { setHtml } from "~/lib/setHtml";
import { formatter } from "~/lib/utils";
import PageHeader from "./page-header";
import ProductForm from "./product-form";
import ProductImages from "./product-images";

const ProductDetails = ({
  product,
}: {
  product: Product & {
    images: Media[];
    variants: ProductVariant[];
    paymentPlans: ProductPaymentPlan[];
  };
}) => {
  const { images, title, price, description, variants, paymentPlans, id } =
    product;
  return (
    <div>
      <PageHeader>Details</PageHeader>
      <div className="grid gap-10 md:grid-cols-2 md:gap-32">
        <ProductImages images={images} alt={title} />
        <div>
          <h3 className="mb-4">{title}</h3>
          <div className="mb-7 flex items-end text-[#2ADC84]">
            <span className="mr-1 text-xl font-semibold">
              {formatter.format(+price)}
            </span>
            <span className="text-base">Excl BTW</span>
          </div>
          <p className="text-md mb-7 md:text-lg" {...setHtml(description)} />
          <ProductForm
            variants={variants}
            id={id}
            paymentPlans={paymentPlans}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
