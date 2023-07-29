import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth()
        const body = await req.json()

        const {
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isArchived
        } = body

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }
        if (!images || !images.length) {
            return new NextResponse("Images are required", { status: 400 })
        }
        if (!price) {
            return new NextResponse("Price is required", { status: 400 })
        }
        if (!categoryId) {
            return new NextResponse("Category id is required", { status: 400 })
        }
        if (!colorId) {
            return new NextResponse("Color Id is required", { status: 400 })
        }
        if (!sizeId) {
            return new NextResponse("Size Id is required", { status: 400 })
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                storeId: params.storeId,
                isFeatured,
                isArchived,
                images: { /* cz images are separate model in prisma */
                createMany: {
                    data: [
                        ...images.map((image : { url: string})=> image)
                    ]
                }
                }
            }
        })
        return NextResponse.json(product)
    }
    catch (error) {
        console.log('[PRODUCTS_POST]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


// get all products
export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get('categoryId') || undefined
        const colorId = searchParams.get('colorId') || undefined
        const sizeId = searchParams.get('sizeId') || undefined
        const isFeatured = searchParams.get('isFeatured') 

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }

        
        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured ? true : undefined, // to ignore if isFeatured is undefined
                isArchived: false // cz we dont want to show archived products
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(products)
    }
    catch (error) {
        console.log('[PRODUCTS_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}