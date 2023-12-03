'use client'

import { AlertModal } from '@/components/modals/alert-modal'
import { ApiAlert } from '@/components/ui/api-alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useOrigin } from '@/hooks/use-origin'
import { zodResolver } from '@hookform/resolvers/zod'
import { Settings } from '@prisma/client'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().min(2).email(),
})

type SettingsFormValues = z.infer<typeof formSchema>

interface SettingsFormProps {
  initialData: Settings
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const router = useRouter()
  const origin = useOrigin()

  const [loading, setLoading] = useState(false)

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true)
      await axios.patch(`/api/settings`, data)
      router.refresh()
      toast.success('Instellingen aangepast.')
    } catch (error: any) {
      toast.error('Er is iets mis gegaan.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title='Instellingen'
          description='Beheer website Instellingen'
        />
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
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Naam</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='App naam'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Support e-mail</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='E-mail' {...field} />
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
