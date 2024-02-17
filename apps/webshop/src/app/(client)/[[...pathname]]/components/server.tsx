import React from "react";

import { WEB_URL } from "~/lib/constants";
import { getArray } from "~/lib/getArray";
import BlocksRenderer from "./blocks-renderer";
import ServerWrapper from "~/components/server-wrapper";
import { Block } from "~/lib/blocks";

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

const Server = async ({ pathname }: { pathname: string }) => {
  const page = await getPage(pathname === "index" ? "" : pathname);
  if (!page) throw new Error(`Not found: ${pathname}`);
  const blocks = getArray(page.blocks);

  return (
    <ServerWrapper>

        <BlocksRenderer
          blocks={blocks.map((block) => ({
            ...block,
            fields: Object.entries(block.fields as Block).reduce(
              (a, [field, { value }]) => ({ ...a, [field]: value }),
              {},
              ),
            } as Block))}
            />
          </ServerWrapper>
  );
};

export default Server;
