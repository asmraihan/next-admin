"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { SizeColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'

interface SizeClientProps {
    data: SizeColumn[]
}

const SizeClient: React.FC<SizeClientProps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams()
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`Sizes (${data.length})`}
                    description='Manage sizes for your store'
                />
                <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className='mr-2 h-4 w-4'></Plus>
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable searchKey='name' columns={columns} data={data} />

            <Heading title='API' description='Api endpoints for Sizes' />
            <Separator />
            <ApiList entityName='sizes' entityIdName='sizeId' />
        </>
    )
}

export default SizeClient