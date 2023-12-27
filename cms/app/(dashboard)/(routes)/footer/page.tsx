import { redirect } from "next/navigation"

import prismadb from "@/lib/prismadb"

import { FooterForm } from "./components/footer-form"

const FooterPage = async () => {
  const footer = await prismadb.footer.findFirst()

  if (!footer) {
    redirect("/")
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <FooterForm initialData={footer} />
      </div>
    </div>
  )
}

export default FooterPage
