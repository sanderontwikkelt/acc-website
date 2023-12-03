'use client'

import { ApiAlert } from '@/components/ui/api-alert'
import { Button } from '@/components/ui/button'
import DynamicButtonList from '@/components/ui/dynamic-button-list'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import SingleImageSelect from '@/components/ui/single-image-select'
import { useOrigin } from '@/hooks/use-origin'
import { zodResolver } from '@hookform/resolvers/zod'
import { Header } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'

const formSchema = z.object({
  mediaId: z.string().min(2).nullable(),
  links: z.any(),
})

type HeaderFormValues = z.infer<typeof formSchema>

interface HeaderFormProps {
  initialData: Header
}

export const HeaderForm: React.FC<HeaderFormProps> = ({ initialData }) => {
  const router = useRouter()
  const origin = useOrigin()

  const [loading, setLoading] = useState(false)

  const form = useForm<HeaderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: HeaderFormValues) => {
    try {
      setLoading(true)
      await axios.patch(`/api/header`, data)
      router.refresh()
      toast.success('Header aangepast.')
    } catch (error: any) {
      toast.error('Er is iets mis gegaan.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title='Header' description='Beheer website Header' />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-8'
        >
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='links'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Links</FormLabel>
                    <FormControl>
                      <DynamicButtonList
                        disabled={loading}
                        {...field}
                        value={
                          typeof field.value === 'string'
                            ? JSON.parse(field.value)
                            : field.value
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name='mediaId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Afbeelding</FormLabel>
                  <FormControl>
                    <SingleImageSelect
                      value={field.value || ''}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            Opslaan
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title='NEXT_PUBLIC_API_URL'
        variant='public'
        description={`${origin}/api`}
      />
    </>
  )
}
