"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const BillboardClient = () => {

    const router = useRouter()
    const params = useParams()
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading
                    title='Billboards (0)'
                    description='Manage your billboards'
                />
                <Button onClick={()=> router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className='mr-2 h-4 w-4'></Plus>
                    Add new
                </Button>
            </div>
            <Separator />
        </>
    )
}

export default BillboardClient