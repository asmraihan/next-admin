import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

// get revenue for a store
export async function GET(
    req: Request,
    { params }: { params: { storeId: string }}
) {
    try {
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }

        const paidOrders = await prismadb.order.findMany({
            where: {
                storeId: params.storeId,
                isPaid: true
            },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                }
            }
        })

        const monthlyRevenue: { [key: number]: number } = {}

        for (const order of paidOrders) {
            const month = order.createdAt.getMonth()
            let revenueForOrder = 0
    
            for (const item of order.orderItems) {
                revenueForOrder += item.product.price.toNumber()
            }
            monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder
            // access 
        }

        return NextResponse.json(monthlyRevenue)
    }
    catch (error) {
        console.log('[REVENUE_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}