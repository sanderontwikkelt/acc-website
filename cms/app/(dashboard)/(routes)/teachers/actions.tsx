"use server"

import { Teacher } from "@prisma/client"

import prismadb from "@/lib/prismadb"

export const getTeachers = async (setTeachers: (t: Teacher[]) => void) => {
  const teachers = await prismadb.teacher.findMany()
  setTeachers(teachers)
}
