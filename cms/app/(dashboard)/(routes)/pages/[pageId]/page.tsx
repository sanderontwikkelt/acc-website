import prismadb from "@/lib/prismadb"

import { PageForm } from "./components/page-form"
import PageHeader from "./components/page-header"

const PagePage = async ({ params }: { params: { pageId: string } }) => {
  const page = await prismadb.page.findUnique({
    where: {
      id: params.pageId,
    },
    include: {
      seo: true,
    },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <PageHeader
          hasInitialData={!!page}
          withRedirect
          pathname={page?.pathname || ""}
          seo={page?.seo || undefined}
        />
        <PageForm initialData={page} withRedirect />
      </div>
    </div>
  )
}

export default PagePage