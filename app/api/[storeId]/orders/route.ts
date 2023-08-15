import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

// get count of all orders for a store
export async function GET(
    req: Request,
    { params }: { params: { storeId: string }}
) {
    try {
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }

        const orders = await prismadb.order.findMany({
            where: {
                storeId: params.storeId,
                isPaid: true
            }
        })
        return NextResponse.json(orders)
    }
    catch (error) {
        console.log('[ORDERS_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}