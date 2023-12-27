import prismadb from "@/lib/prismadb"

import { TeacherForm } from "./components/teacher-form"

const TeacherPage = async ({ params }: { params: { teacherId: string } }) => {
  const teacher = await prismadb.teacher.findUnique({
    where: {
      id: params.teacherId,
    },
    include: {
      media: true,
    },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <TeacherForm initialData={teacher || null} />
      </div>
    </div>
  )
}

export default TeacherPage
