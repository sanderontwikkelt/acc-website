import React from "react";
import Image from "next/image";
import Link from "next/link";

import MobileMenu from "./mobile-menu";

const links = [
  { pathname: "/", name: "Home" },
  { pathname: "/products", name: "Assortiment" },
  {
    pathname: "/products/own-design",
    name: "Upload jouw logo",
  },
];

const Header = () => {
  return (
    <>
      <header className="fixed left-0 top-0 z-[9999] w-full bg-white">
        <div className="hidden border-b border-[#e7e7e7] sm:block">
          <div className="container mx-auto">
            <div className="-mx-4 flex flex-wrap items-center">
              <div className="w-full px-4 md:w-2/3 lg:w-1/2">
                <ul className="-mx-3 flex items-center">
                  {[
                    { href: "/about", label: "About us" },
                    { href: "/orders/234", label: "Order Tracking" },
                    { href: "/contact", label: "Contact us" },
                    { href: "/faq", label: "FAQs" },
                  ].map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-body-color inline-block px-3 py-4 text-sm font-medium hover:text-primary"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative ml-auto">
                <select className="text-body-color w-full appearance-none rounded-lg bg-transparent py-3 pr-4 text-end text-sm font-medium outline-none transition">
                  <option value="">Nederlands</option>
                  <option value="">English</option>
                </select>
                <span className="border-body-color absolute right-0 top-1/2 mt-[-2px] h-2 w-2 -translate-y-1/2 rotate-45 border-b border-r"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-[#e7e7e7]">
          <div className="container mx-auto max-md:h-20">
            <div className="relative flex items-center justify-center sm:justify-between md:-mx-4">
              <div className="max-w-full md:w-60 md:px-4 lg:w-48">
                <Link href="/" className="block w-full py-5 lg:py-3">
                  <Image
                    src="/icons/logo.svg"
                    width={71}
                    height={31}
                    alt="logo"
                    className="w-full pr-10 max-md:w-52"
                  />
                </Link>
              </div>
              <div className="flex items-center justify-end max-md:ml-auto md:px-4 lg:justify-between">
                <div className="flex w-full items-center justify-between px-4 max-md:hidden">
                  <div className="w-full">
                    <nav
                      id="navbarCollapse"
                      className="flex w-full max-w-[250px] justify-center rounded-lg bg-white px-6 py-5 shadow lg:static lg:w-full lg:max-w-full lg:justify-end lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none"
                    >
                      <ul className="block items-center lg:flex">
                        {links.map(({ pathname, name }) => (
                          <li key={pathname}>
                            <Link
                              href={pathname}
                              className="text-dark flex whitespace-nowrap justify-between py-2 text-base font-medium hover:text-primary lg:mx-5 lg:inline-flex lg:py-6 2xl:mx-6"
                            >
                              {name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="flex w-full items-center justify-end space-x-2 md:pr-[70px] lg:pr-0">
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-[.5px] border-[#e7e7e7] bg-[#f4f7ff] md:mr-3">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.8343 12.6844C19.7655 11.8938 19.1124 11.3438 18.3218 11.3438H3.67804C2.88742 11.3438 2.26867 11.9281 2.16554 12.6844L1.44367 19.9031C1.40929 20.3156 1.54679 20.7625 1.82179 21.0719C2.09679 21.3812 2.50929 21.5531 2.95617 21.5531H19.078C19.4905 21.5531 19.903 21.3812 20.2124 21.0719C20.4874 20.7625 20.6249 20.35 20.5905 19.9031L19.8343 12.6844ZM19.2843 20.2812C19.2499 20.3156 19.1812 20.3844 19.0437 20.3844H2.95617C2.85304 20.3844 2.74992 20.3156 2.71554 20.2812C2.68117 20.2469 2.61242 20.1781 2.64679 20.0406L3.36867 12.7875C3.36867 12.6156 3.50617 12.5125 3.67804 12.5125H18.3562C18.528 12.5125 18.6312 12.6156 18.6655 12.7875L19.3874 20.0406C19.353 20.1438 19.3187 20.2469 19.2843 20.2812Z"
                          fill="#212B36"
                        />
                        <path
                          d="M11 14.0254C9.65937 14.0254 8.59375 15.091 8.59375 16.4316C8.59375 17.7723 9.65937 18.8379 11 18.8379C12.3406 18.8379 13.4062 17.7723 13.4062 16.4316C13.4062 15.091 12.3406 14.0254 11 14.0254ZM11 17.6348C10.3469 17.6348 9.79688 17.0848 9.79688 16.4316C9.79688 15.7785 10.3469 15.2285 11 15.2285C11.6531 15.2285 12.2031 15.7785 12.2031 16.4316C12.2031 17.0848 11.6531 17.6348 11 17.6348Z"
                          fill="#212B36"
                        />
                        <path
                          d="M2.26875 6.73769C2.3375 8.25019 3.67812 8.86894 4.36562 8.86894H6.77188C6.80625 8.86894 6.80625 8.86894 6.80625 8.86894C7.8375 8.80019 8.86875 8.11269 8.86875 6.73769V5.91269C10.0031 5.91269 12.6156 5.91269 13.75 5.91269V6.73769C13.75 8.11269 14.7812 8.80019 15.8125 8.86894H15.8469H18.2188C18.9062 8.86894 20.2469 8.25019 20.3156 6.73769C20.3156 6.63457 20.3156 6.25644 20.3156 5.91269C20.3156 5.63769 20.3156 5.39707 20.3156 5.36269C20.3156 5.32832 20.3156 5.29394 20.3156 5.29394C20.2125 4.33144 19.8687 3.54082 19.2844 2.92207L19.25 2.88769C18.3906 2.09707 17.3594 1.6502 16.5688 1.3752C14.2656 0.481445 11.3781 0.481445 11.2406 0.481445C9.2125 0.51582 7.90625 0.687695 5.94687 1.3752C5.19062 1.61582 4.15938 2.06269 3.3 2.85332L3.26562 2.88769C2.68125 3.50644 2.3375 4.29707 2.23438 5.25957C2.23438 5.29394 2.23438 5.32832 2.23438 5.32832C2.23438 5.39707 2.23438 5.60332 2.23438 5.87832C2.26875 6.18769 2.26875 6.60019 2.26875 6.73769ZM4.125 3.71269C4.8125 3.09394 5.67188 2.71582 6.39375 2.44082C8.18125 1.78769 9.35 1.65019 11.3094 1.61582C11.4469 1.61582 14.1281 1.6502 16.1906 2.44082C16.9125 2.71582 17.7719 3.05957 18.4594 3.71269C18.8375 4.12519 19.0781 4.67519 19.1469 5.32832C19.1469 5.43144 19.1469 5.60332 19.1469 5.87832C19.1469 6.22207 19.1469 6.60019 19.1469 6.70332C19.1125 7.49394 18.3562 7.66582 18.2531 7.66582H15.8813C15.5375 7.63144 14.9875 7.49394 14.9875 6.73769V5.32832C14.9875 5.05332 14.8156 4.84707 14.575 4.74394C14.3688 4.67519 8.35313 4.67519 8.14688 4.74394C7.90625 4.81269 7.73438 5.05332 7.73438 5.32832V6.73769C7.73438 7.49394 7.18437 7.63144 6.84062 7.66582H4.46875C4.36562 7.66582 3.60937 7.49394 3.575 6.70332C3.575 6.60019 3.575 6.22207 3.575 5.87832C3.575 5.60332 3.575 5.46582 3.575 5.36269C3.50625 4.67519 3.74688 4.12519 4.125 3.71269Z"
                          fill="#212B36"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-black max-md:hidden">
                      Hulp nodig?
                      <br />
                      +001 123 456 789
                    </p>
                  </div>
                  <div>
                    <Link
                      href="/account"
                      className="text-dark relative flex h-10 w-10 items-center justify-center rounded-full border-[.5px] border-[#e7e7e7] bg-[#f4f7ff]"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.9998 12.5125C13.8186 12.5125 16.1217 10.2094 16.1217 7.39062C16.1217 4.57188 13.8186 2.23438 10.9998 2.23438C8.18105 2.23438 5.87793 4.5375 5.87793 7.35625C5.87793 10.175 8.18105 12.5125 10.9998 12.5125ZM10.9998 3.4375C13.1654 3.4375 14.9186 5.19062 14.9186 7.35625C14.9186 9.52187 13.1654 11.275 10.9998 11.275C8.83418 11.275 7.08105 9.52187 7.08105 7.35625C7.08105 5.225 8.83418 3.4375 10.9998 3.4375Z"
                          fill="#212B36"
                        />
                        <path
                          d="M21.3467 18.7002C18.4936 16.2596 14.8155 14.9189 10.9999 14.9189C7.18425 14.9189 3.50613 16.2596 0.653003 18.7002C0.378004 18.9064 0.343629 19.2846 0.584254 19.5596C0.790503 19.8002 1.16863 19.8346 1.44363 19.6283C4.0905 17.3939 7.49363 16.1564 11.0343 16.1564C14.5749 16.1564 17.978 17.3939 20.6249 19.6283C20.728 19.7314 20.8655 19.7658 21.003 19.7658C21.1749 19.7658 21.3467 19.6971 21.4499 19.5596C21.6561 19.2846 21.6217 18.9064 21.3467 18.7002Z"
                          fill="#212B36"
                        />
                      </svg>
                    </Link>
                  </div>
                  <div className="relative z-20">
                    <div className="flex max-w-[200px] justify-end">
                      <Link
                        href="/cart"
                        className="text-dark relative flex h-10 w-10 items-center justify-center rounded-full border-[.5px] border-[#e7e7e7] bg-[#f4f7ff]"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.2783 8.00273H22.0596L19.2971 0.974601C19.1346 0.608976 18.7283 0.446476 18.3627 0.568351C17.9971 0.730851 17.8346 1.1371 17.9564 1.50273L20.5158 8.04335H5.44395L8.00332 1.50273C8.16582 1.1371 7.9627 0.730851 7.59707 0.568351C7.23145 0.405851 6.8252 0.608976 6.6627 0.974601L3.9002 8.00273H2.68145C2.07207 8.00273 1.54395 8.49023 1.54395 9.14023V12.5934C1.54395 13.2027 2.03145 13.7309 2.68145 13.7309H2.72207L3.77832 22.9934C3.94082 24.4152 5.15957 25.5121 6.62207 25.5121H19.2971C20.7596 25.5121 21.9783 24.4152 22.1408 22.9934L23.1971 13.7309H23.2377C23.8471 13.7309 24.3752 13.2434 24.3752 12.5934V9.14023C24.4158 8.53085 23.9283 8.00273 23.2783 8.00273ZM3.00645 9.4246H22.9939V12.2684H3.00645V9.4246ZM20.7596 22.7902C20.6783 23.5215 20.0689 24.0496 19.3377 24.0496H6.6627C5.93145 24.0496 5.32207 23.5215 5.24082 22.7902L4.18457 13.6902H21.8158L20.7596 22.7902Z"
                            fill="#212B36"
                          />
                          <path
                            d="M8.73467 20.6375C9.14092 20.6375 9.46592 20.3125 9.46592 19.9062V16.7781C9.46592 16.3719 9.14092 16.0469 8.73467 16.0469C8.32842 16.0469 8.00342 16.3719 8.00342 16.7781V19.9062C8.00342 20.3125 8.32842 20.6375 8.73467 20.6375Z"
                            fill="#212B36"
                          />
                          <path
                            d="M17.2659 20.6375C17.6722 20.6375 17.9972 20.3125 17.9972 19.9062V16.7781C17.9972 16.3719 17.6722 16.0469 17.2659 16.0469C16.8597 16.0469 16.5347 16.3719 16.5347 16.7781V19.9062C16.5753 20.3125 16.9003 20.6375 17.2659 20.6375Z"
                            fill="#212B36"
                          />
                        </svg>

                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
                          1
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-[.5px] border-[#e7e7e7] bg-[#f4f7ff] md:hidden">
                    <MobileMenu
                      navigation={[
                        ...links,
                        { name: "Contact", pathname: "/contact" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
