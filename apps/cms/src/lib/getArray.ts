import { Prisma } from "@acme/db";

export const getArray = (data: Prisma.JsonValue) => {
  if (data && typeof data === "object" && Array.isArray(data)) {
    return data as Prisma.JsonArray;
  } else {
    return [];
  }
};
