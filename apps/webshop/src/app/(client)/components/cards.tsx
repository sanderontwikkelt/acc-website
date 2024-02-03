import React from "react";

const Cards = () => {
  return (
    <section className=" dark:bg-dark">
      <div className="container mx-auto">
        <ProductCard
          subtitle="Start From $50"
          title="New Arrival From Creative Clock Collections"
          details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet molestie nunc. Vestibulum tempus justo et venenatis tempus. Nulla tincidunt,"
          link="/#"
          button="View All Items"
          img="https://cdn.tailgrids.com/1.0/assets/images/ecommerce/products/recent-products-03/product-01.jpg"
        />
      </div>
    </section>
  );
};

export default Cards;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductCard = ({ subtitle, title, details, link, button }: any) => {
  return (
    <>
      <div className="group -mx-4 flex flex-row-reverse flex-wrap items-center justify-center py-20 last:mb-5 md:mb-24">
        <div className="w-full px-4 lg:w-1/2 2xl:w-5/12">
          <div className="mb-12 max-w-[465px] lg:mb-0 group-even:lg:ml-auto">
            <span className="mb-4 block text-lg font-semibold text-primary md:text-2xl">
              {subtitle}
            </span>
            <h2 className="text-dark mb-5 text-2xl font-semibold !leading-tight dark:text-white xl:text-4xl">
              {title}
            </h2>
            <p className="text-body-color dark:text-dark-6 mb-9 text-base">
              {details}
            </p>
            <a
              href={link}
              className="hover:bg-blue-dark inline-flex items-center justify-center rounded-md bg-primary px-7 py-[13px] text-center text-base font-medium text-white"
            >
              {button}
            </a>
          </div>
        </div>
        <div className="w-full px-4 lg:w-1/2 2xl:w-5/12">
          <div className="relative z-10 my-20 text-center">
            <img
              src="https://cdn.tailgrids.com/1.0/assets/images/ecommerce/headers/header-05/image-01.png"
              alt="product"
              className="mx-auto max-w-full"
            />
            <span className="absolute left-1/2 top-1/2 -z-10 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 scale-75 rounded-full bg-primary bg-opacity-5 sm:scale-100 lg:scale-75 xl:scale-100"></span>
            <span className="absolute left-1/2 top-1/2 -z-10 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 scale-75 rounded-full bg-primary bg-opacity-[3%] sm:scale-100 lg:scale-75 xl:scale-100"></span>
          </div>
        </div>
      </div>
    </>
  );
};
