import React from "react";
import Link from "next/link";

const FeaturedProducts = () => {
  return (
    <section className="bg-gray-2 dark:bg-dark pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex">
          <div className="w-full px-4">
            <div className="mb-[60px] max-w-[575px]">
              <h2 className="sm:ledaing-[45px] text-dark mb-4 text-3xl font-bold dark:text-white sm:text-[36px]">
                Uit het assortiment
              </h2>
              <p className="text-body-color dark:text-dark-6 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit
                amet molestie nunc. Vestibulum tempus justo.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <SingleFeaturedProduct
            newItem
            img="https://cdn.tailgrids.com/1.0/assets/images/ecommerce/products/featured-products-03/image-01.jpg"
            link="/products/own-design"
            title="Apple Watch Series 7"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit enim luctus et lorem."
            prevPrice="£120.00 "
            price="£60.00"
          />
          <SingleFeaturedProduct
            img="https://cdn.tailgrids.com/1.0/assets/images/ecommerce/products/featured-products-03/image-02.jpg"
            link="/#"
            title="iPhone 13 Pro Max"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit enim luctus et lorem."
            price="£889.00"
          />
          <SingleFeaturedProduct
            hotItem
            img="https://cdn.tailgrids.com/1.0/assets/images/ecommerce/products/featured-products-03/image-03.jpg"
            link="/#"
            title="Macbook Pro 13” M1 2020"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit enim luctus et lorem."
            price="£1459.00"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

const SingleFeaturedProduct = ({
  img,
  link,
  subtitle,
  title,
  price,
  prevPrice,
  newItem,
  hotItem,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="hover:shadow-card-2 dark:border-dark-3 dark:bg-dark-2 mb-10 overflow-hidden rounded-lg border border-border bg-white">
        <div className="relative">
          <img src={img} alt="product" className="w-full" />

          {newItem && (
            <span className="absolute left-5 top-5 inline-block rounded bg-secondary px-[10px] py-1 text-sm font-medium text-white">
              New
            </span>
          )}
          {hotItem && (
            <span className="absolute left-5 top-5 inline-block rounded bg-red-600 px-[10px] py-1 text-sm font-medium text-white">
              Hot
            </span>
          )}
        </div>

        <div className="p-6">
          <h3>
            <Link
              href={link}
              className="text-dark mb-4 block text-lg font-semibold hover:text-primary dark:text-white xl:text-xl"
            >
              {title}
            </Link>
          </h3>
          <p className="text-body-color dark:text-dark-6 mb-5 text-base">
            {subtitle}
          </p>
          <p className="text-dark text-lg font-medium dark:text-white">
            {prevPrice && (
              <span className="text-body-color dark:text-dark-6 mr-[10px] line-through">
                {prevPrice}
              </span>
            )}
            <span>{price}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
