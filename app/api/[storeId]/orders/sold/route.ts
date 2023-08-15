import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

// get count of all sold items for a store
export async function GET(
    req: Request,
    { params }: { params: { storeId: string }}
) {
    try {
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }

        const salesCount = await prismadb.order.count({
            where: {
                storeId: params.storeId,
                isPaid: true
            }
        })
        return NextResponse.json(salesCount)
    }
    catch (error) {
        console.log('[salesCount_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}