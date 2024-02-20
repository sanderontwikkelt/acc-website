import React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@acme/ui";

import { API_URL } from "~/lib/constants";
import { Button } from "./button";
import MobileMenu from "./mobile-menu";
import NavItems from "./nav-items";

const getHeader = async () => {
  try {
    const res = await fetch(`${API_URL}/api/header`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch page");
    }

    return res.json();
  } catch (e) {
    console.log({ e, url: `${API_URL}/api/header` });
  }
};

const HeaderServer = async () => {
  const header = await getHeader();

  const cta = header.links?.[header.links.length - 1];
  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-[99999] flex h-[6.25rem] w-full max-w-[100vw] items-center px-[calc(1.875rem+max((100vw-(1040rem/16))/2,0px))] transition-colors duration-300",
        "bg-accent max-md:bg-transparent",
      )}
    >
      <Link href="/" className="h-8 md:h-11" aria-label="Physis">
        {header.media?.url ? (
          <Image
            src={header.media.url}
            width={header.media.width}
            height={header.media.height}
            alt="Logo"
          />
        ) : (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 149 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M118.774 2.42042C118.774 3.75676 117.688 4.84084 116.35 4.84084C115.012 4.84084 113.926 3.75676 113.926 2.42042C113.926 1.08408 115.012 0 116.35 0C117.688 0 118.774 1.08408 118.774 2.42042ZM26.5909 0.399414H23.193V34.1892H26.5909V0.399414ZM110.192 0.399414H106.794V34.1892H110.192V0.399414ZM114.654 9.58258H118.052V34.1892H114.654V9.58258ZM91.6505 13.1021V9.58256H88.2525V34.1892H91.6505V21.8829C91.6505 16.5105 96.0286 12.1381 101.408 12.1381H103.107V8.74472H101.408C97.5351 8.74472 94.0591 10.4354 91.6505 13.1021ZM119.459 39.3994C121.302 37.5586 122.319 35.1111 122.319 32.5075H122.316V9.58258H125.714V32.5105C125.714 36.021 124.346 39.3213 121.862 41.8018L120.662 43L118.259 40.6006L119.459 39.3994ZM135.844 20.1862C141.224 20.1862 145.602 15.8168 145.602 10.4415V9.5826H149V10.4415C149 15.2252 146.417 19.4084 142.577 21.7057C146.465 23.8709 149 28.1592 149 33.3243V34.1862H145.602V33.3243C145.602 27.6787 141.822 23.5796 136.614 23.5796H133.21V34.1892H129.812V0.399414H133.21V20.1862H135.844ZM15.7898 10.4415C15.7898 15.8168 11.4116 20.1862 6.03205 20.1862H3.39791V0.399414H0V34.1892H3.39791V23.5796H6.80184C12.01 23.5796 15.7898 27.6787 15.7898 33.3243V34.1862H19.1877V33.3243C19.1877 28.1592 16.6558 23.8709 12.7647 21.7057C16.6047 19.4084 19.1877 15.2252 19.1877 10.4415V9.5826H15.7898V10.4415ZM124.081 4.84084C125.419 4.84084 126.505 3.75676 126.505 2.42042C126.505 1.08408 125.419 0 124.081 0C122.743 0 121.657 1.08408 121.657 2.42042C121.657 3.75676 122.743 4.84084 124.081 4.84084ZM33.2635 20.1862C34.0693 15.6186 38.0717 12.1351 42.8738 12.1351C47.676 12.1351 51.6783 15.6156 52.4842 20.1862H33.2635ZM42.8738 8.74472C35.6209 8.74472 29.7182 14.6396 29.7182 21.8829C29.7182 29.1261 35.6209 35.021 42.8738 35.021C46.389 35.021 49.6907 33.6546 52.1775 31.1742L53.3773 29.976L50.9747 27.5766L49.7749 28.7748C47.9316 30.6156 45.4809 31.6306 42.8738 31.6306C38.0717 31.6306 34.0693 28.1501 33.2635 23.5796H56.0295V21.8829C56.0295 14.6396 50.1267 8.74472 42.8738 8.74472ZM71.6238 12.1592C66.8216 12.1592 62.8193 15.6426 62.0134 20.2102H81.2342C80.4283 15.6396 76.426 12.1592 71.6238 12.1592ZM58.4681 21.9069C58.4681 14.6637 64.3709 8.76877 71.6238 8.76877C78.8767 8.76877 84.7794 14.6637 84.7794 21.9069V23.6036H62.0134C62.8193 28.1742 66.8216 31.6547 71.6238 31.6547C74.2309 31.6547 76.6816 30.6396 78.5248 28.7988L79.7246 27.6006L82.1272 30L80.9274 31.1982C78.4407 33.6787 75.139 35.0451 71.6238 35.0451C64.9422 35.0451 59.4123 30.0511 58.5764 23.6036C58.5042 23.0481 58.4681 22.4835 58.4681 21.9069Z"
              fill="#64BD6E"
            />
          </svg>
        )}
      </Link>
      <nav className="ml-auto flex items-center max-md:hidden lg:space-x-3 xl:space-x-6">
        <NavItems links={header.links} setHoveredItem={console.log} />
        {!!cta && (
          <Button className="ml-6" href={cta.pathname} aria-label={cta.name}>
            {cta.name}
          </Button>
        )}
      </nav>
      <MobileMenu navigation={header.links} />
    </header>
  );
};

export default HeaderServer;
