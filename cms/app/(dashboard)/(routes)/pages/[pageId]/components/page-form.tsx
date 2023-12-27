"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Page } from "@prisma/client"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  name: z.string().min(1),
  pathname: z.string().min(1),
  concept: z.boolean().default(true).optional(),
})

type PageFormValues = z.infer<typeof formSchema>

interface PageFormProps {
  initialData: Page | null
  withRedirect?: boolean
}

export const PageForm: React.FC<PageFormProps> = ({
  initialData,
  withRedirect,
}) => {
  const params = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const toastMessage = initialData ? "Pagina opgeslagen." : "Pagina toegevoegd."
  const action = initialData ? "Opslaan" : "Toevoegen"

  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        name: "",
        pathname: "",
        concept: true,
      }

  const form = useForm<PageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: PageFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/pages/${params.pageId}`, data)
      } else {
        const page = await axios.post(`/api/pages`, data)
        if (!withRedirect) {
          router.refresh()
          router.push(`/pages/${page.data.id}/builder`)
        }
      }
      router.refresh()
      if (withRedirect) {
        router.push(`/pages`)
      }
      toast.success(toastMessage)
    } catch (error: any) {
      toast.error("Er is iets mis gegaan.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div
            className={cn(
              withRedirect
                ? "grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8"
                : "space-y-4"
            )}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Naam</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Pagina naam"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pathname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Padnaam (staat achter domein)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Pagina padnaam"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="concept"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Concept</FormLabel>
                    <FormDescription>
                      De pagina is niet zichtbaar op je website als het in
                      concept staat
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
