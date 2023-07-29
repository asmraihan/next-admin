"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import {  ProductColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'

interface ProductClientProps {
    data: ProductColumn[]
}

const BillboardClient: React.FC<ProductClientProps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams()
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`Products (${data.length})`}
                    description='Manage products on your store'
                />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className='mr-2 h-4 w-4'></Plus>
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable searchKey='label' columns={columns} data={data} />

            <Heading title='API' description='Api endpoints for Products' />
            <Separator />
            <ApiList entityName='products' entityIdName='productId' />
        </>
    )
}

export default BillboardClient