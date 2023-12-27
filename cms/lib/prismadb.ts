import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

const { GOOGLE_APPLICATION_CREDENTIALS_BASE64 } = process.env

if (GOOGLE_APPLICATION_CREDENTIALS_BASE64) {
  const serviceAccount = Buffer.from(
    GOOGLE_APPLICATION_CREDENTIALS_BASE64,
    "base64"
  ).toString()
  process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON = serviceAccount
}

const prismadb = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb

export default prismadb
