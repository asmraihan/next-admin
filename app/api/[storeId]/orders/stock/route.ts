import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

// get all stock items for a store
export async function GET(
    req: Request,
    { params }: { params: { storeId: string }}
) {
    try {
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }

        const stockCount = await prismadb.product.count({
            where: {
                storeId: params.storeId,
                isArchived: false
            }
        })
        return NextResponse.json(stockCount)
    }
    catch (error) {
        console.log('[StockCount_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}