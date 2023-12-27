import { redirect } from "next/navigation"

import prismadb from "@/lib/prismadb"

import { HeaderForm } from "./components/header-form"

const HeaderPage = async () => {
  const header = await prismadb.header.findFirst()

  if (!header) {
    redirect("/")
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <HeaderForm initialData={header} />
      </div>
    </div>
  )
}

export default HeaderPage
