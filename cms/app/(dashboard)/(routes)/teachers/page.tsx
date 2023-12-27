import { format } from "date-fns"

import prismadb from "@/lib/prismadb"

import { TeacherClient } from "./components/client"
import { TeacherColumn } from "./components/columns"

export const dynamic = "force-dynamic"

const TeachersPage = async () => {
  const teachers = await prismadb.teacher.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedTeachers: TeacherColumn[] = teachers.map((item) => ({
    id: item.id,
    name: item.name,
    title: item.title,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <TeacherClient data={formattedTeachers} />
      </div>
    </div>
  )
}

export default TeachersPage
