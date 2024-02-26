import React from "react";
import Link from "next/link";

const Cta = () => {
  return (
    <section
      className="relative z-10 bg-cover bg-no-repeat py-20 lg:py-[6rem] xl:py-[10rem]"
      style={{
        backgroundImage: `url('https://cdn.tailgrids.com/2.0/image/marketing/images/cta/cta.jpg')`,
      }}
    >
      <span className="absolute left-0 top-0 -z-10 h-full w-full bg-black/20"></span>
      <div className="container mx-auto">
        <div className="mx-auto max-w-[575px] text-center">
          <h4
            className="mb-2.5 text-lg font-medium text-white sm:text-2xl"
            style={{ textShadow: "0px 0px 1px rgba(0, 0, 0, 0.2)" }}
          >
            Extra 30% Off Online
          </h4>
          <h2
            className="mb-3 text-3xl font-bold !leading-tight text-white sm:text-4xl md:text-[44px]"
            style={{ textShadow: "0px 0px 1px rgba(0, 0, 0, 0.2)" }}
          >
            Summer Season Sale
          </h2>
          <p
            className="font-medium text-white"
            style={{ textShadow: "0px 0px 1px rgba(0, 0, 0, 0.2)" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            vel dolor pellentesque, varius elit quis, malesuada quam.
          </p>

          <Link
            href="/products/own-design"
            className="mt-10 inline-flex rounded bg-primary px-8 py-3 font-semibold text-white hover:bg-opacity-90"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cta;
