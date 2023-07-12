'use client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Store } from '@prisma/client'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Form, useForm } from 'react-hook-form'
import * as z from 'zod'

interface SettingsFormProps {
    initialData: Store
}

const formSchema = z.object({
    name : z.string().min(1)
})

type SettingsFormValues = z.infer<typeof formSchema>

const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const onSubmit = async (data: SettingsFormValues) => {
        console.log(data)
    }

    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading
                    title='Settings'
                    description='Manage store preferences'
                />
                <Button
                    variant={'destructive'}
                    size={'icon'}
                    onClick={() => { }}
                >
                    <Trash className='h-4 w-4' />
                </Button>
            </div>
            <Separator  />
            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='spacey0'>

        </form>
            </Form>
        </>
    )
}

export default SettingsForm