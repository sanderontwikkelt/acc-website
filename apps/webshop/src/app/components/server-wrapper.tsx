import type { ReactNode } from "react";
import React from "react";

import Footer from "~/components/footer";
import Header from "~/components/header";
import { API_URL } from "~/lib/constants";

const getHeader = async () => {
  try {
    const res = await fetch(`${API_URL}/api/header`, {
      next: {
        tags: ["header"],
        revalidate: process.env.NODE_ENV === "production" ? undefined : 0,
      },
    } as RequestInit);

    if (!res.ok) {
      throw new Error("Failed to fetch page");
    }

    return res.json();
  } catch (e) {
    console.log({ e, url: `${API_URL}/api/header` });
  }
};

const getFooter = async () => {
  try {
    const res = await fetch(`${API_URL}/api/footer`, {
      next: { tags: ["footer"] },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch page");
    }

    return res.json();
  } catch (e) {
    console.log({ e, url: `${API_URL}/api/footer` });
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
