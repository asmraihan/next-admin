"use client"

import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { OrderColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

interface OrderClientProps {
    data: OrderColumn[]
}

const OrderClient: React.FC<OrderClientProps> = ({
    data
}) => {
    return (
        <>

            <Heading
                title={`Orders (${data.length})`}
                description='Manage orders'
            />
            <Separator />
            <DataTable searchKey='products' columns={columns} data={data} />

        </>
    )
}

export default OrderClient