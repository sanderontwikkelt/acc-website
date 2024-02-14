"use client";

import { notFound, useParams } from "next/navigation";

import { Footer, Header, Page } from "@acme/db";

import { api } from "~/trpc/react";
import PageEditorClient from "./components/client";

const PageEditorPage = () => {
  const { pageId } = useParams();

  const [pages] = api.page.all.useSuspenseQuery();

  const [page] = api.page.byId.useSuspenseQuery({
    id: +pageId,
  });
  console.log({ page });

  const [header] = api.header.get.useSuspenseQuery();

  const [footer] = api.footer.get.useSuspenseQuery();

  if (!page) notFound();

  return page && header && footer ? (
    <PageEditorClient
      pages={
        pages.map((p) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        })) as Page[]
      }
      header={
        {
          ...header,
          createdAt: new Date(header.createdAt),
          updatedAt: new Date(header.updatedAt),
        } as Header
      }
      footer={
        {
          ...footer,
          createdAt: new Date(footer.createdAt),
          updatedAt: new Date(footer.updatedAt),
        } as Footer
      }
      page={
        {
          ...page,
          blocks: JSON.parse(page.blocks),
          createdAt: new Date(page.createdAt),
          updatedAt: new Date(page.updatedAt),
        } as Page
      }
    />
  ) : null;
};

export default PageEditorPage;
