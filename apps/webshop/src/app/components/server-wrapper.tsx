import React, { ReactNode } from "react";

import Footer from "~/components/footer";
import Header from "~/components/header";
import { WEB_URL } from "~/lib/constants";

const getHeader = async () => {
  try {
    const res = await fetch(`${WEB_URL}/api/header`, {
      next: {
        tags: ["header"],
        revalidate: process.env.NODE_ENV === "production" ? undefined : 0,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch page");
    }

    return res.json();
  } catch (e) {
    console.log({ e, url: `${WEB_URL}/api/header` });
  }
};

const getFooter = async () => {
  try {
    const res = await fetch(`${WEB_URL}/api/footer`, {
      next: { tags: ["footer"] },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch page");
    }

    return res.json();
  } catch (e) {
    console.log({ e, url: `${WEB_URL}/api/footer` });
  }
};

const ServerWrapper = async ({ children }: { children: ReactNode }) => {
  const header = await getHeader();
  const footer = await getFooter();

  return (
    <>
      <Header header={header} />
      <main className="min-h-screen w-full">{children}</main>
      <Footer footer={footer} />
    </>
  );
};

export default ServerWrapper;
