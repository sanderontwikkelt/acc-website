import { redirect } from "next/navigation"

import prismadb from "@/lib/prismadb"

import Client from "./components/client"

const SettingsPage = async () => {
  const media = await prismadb.media.findMany()

  if (!media) {
    redirect("/")
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Client media={media} />
      </div>
    </div>
  )
}

export default SettingsPage
