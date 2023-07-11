import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
} /* have to add prisma to global */

const prismadb = globalThis.prisma || new PrismaClient()
if(process.env.NODE_ENV !== "production") globalThis.prisma = prismadb // only in dev mode

export default prismadb