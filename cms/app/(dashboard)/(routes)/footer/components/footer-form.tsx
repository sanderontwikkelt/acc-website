"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Footer } from "@prisma/client"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

import { useOrigin } from "@/hooks/use-origin"
import { ApiAlert } from "@/components/ui/api-alert"
import { Button } from "@/components/ui/button"
import DynamicButtonList from "@/components/ui/dynamic-button-list"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
  title: z.string().min(2),
  physisLinks: z.any(),
  contactLinks: z.any(),
})

type FooterFormValues = z.infer<typeof formSchema>

interface FooterFormProps {
  initialData: Footer
}

export const FooterForm: React.FC<FooterFormProps> = ({ initialData }) => {
  const router = useRouter()
  const origin = useOrigin()

  const [loading, setLoading] = useState(false)

  const form = useForm<FooterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: FooterFormValues) => {
    try {
      setLoading(true)
      await axios.patch(`/api/footer`, data)
      router.refresh()
      toast.success("Footer aangepast.")
    } catch (error: any) {
      toast.error("Er is iets mis gegaan.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Footer" description="Beheer website Footer" />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="physisLinks"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Physis Links</FormLabel>
                    <FormControl>
                      <DynamicButtonList
                        disabled={loading}
                        {...field}
                        value={
                          typeof field.value === "string"
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
              name="contactLinks"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Contact Links</FormLabel>
                    <FormControl>
                      <DynamicButtonList
                        disabled={loading}
                        {...field}
                        value={
                          typeof field.value === "string"
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Footer Titel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Opslaan
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        variant="public"
        description={`${origin}/api`}
      />
    </>
  )
}
