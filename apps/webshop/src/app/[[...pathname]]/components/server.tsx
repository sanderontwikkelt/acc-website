import React from "react";

import Footer from "~/components/footer";
import Header from "~/components/header";
import { WEB_URL } from "~/lib/constants";
import { getArray } from "~/lib/getArray";
import BlocksRenderer from "./blocks-renderer";

async function getPage(pathname: string) {
  const tags = [pathname.replaceAll("/", "") || "index"];
  try {
    const res = await fetch(
      `${WEB_URL}/api/pages?pathname=${pathname}&mode=server`,
      {
        next: { tags },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch page");
    }

    return res.json();
  } catch (e) {
    console.log({ e, url: `${WEB_URL}/api/pages?${pathname}` });
  }
}

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

const Server = async ({ pathname }: { pathname: string }) => {
  const page = await getPage(pathname === "index" ? "" : pathname);
  if (!page) throw new Error(`Not found: ${pathname}`);
  const blocks = getArray(page.blocks);
  const header = await getHeader();
  const footer = await getFooter();

  return (
    <>
      <Header header={header} />
      <main className="min-h-screen w-full">
        <BlocksRenderer
          blocks={blocks.map((block) => ({
            ...block,
            fields: Object.entries(block.fields).reduce(
              (a, [field, { value }]: any) => ({ ...a, [field]: value }),
              {},
            ),
          }))}
        />
      </main>
      <Footer footer={footer} />
    </>
  );
};

export default Server;
