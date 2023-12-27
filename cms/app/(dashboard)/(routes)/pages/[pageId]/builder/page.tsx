import { BlockBackup, Page, SEO } from "@prisma/client"

import prismadb from "@/lib/prismadb"

import PageEditorClient from "./components/client"

type PageType = Page & { seo: SEO; backups: BlockBackup[] }

const PageEditorPage = async ({ params }: { params: { pageId: string } }) => {
  const pages = await prismadb.page.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      seo: true,
    },
  })

  const page = await prismadb.page.findFirst({
    where: {
      id: params.pageId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      seo: true,
      backups: true,
    },
  })

  const header = await prismadb.header.findFirst()

  const footer = await prismadb.footer.findFirst()

  return page?.seo && header && footer ? (
    <PageEditorClient
      pages={pages as PageType[]}
      seo={page.seo}
      header={header}
      footer={footer}
      page={pages.find(({ id }) => id === params.pageId) as Page}
    />
  ) : null
}

export default PageEditorPage
