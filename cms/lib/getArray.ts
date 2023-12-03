import { Prisma } from '@prisma/client'

export const getArray = (data: Prisma.JsonValue) => {
  if (data && typeof data === 'object' && Array.isArray(data)) {
    return data as Prisma.JsonArray
  } else {
    return []
  }
}
