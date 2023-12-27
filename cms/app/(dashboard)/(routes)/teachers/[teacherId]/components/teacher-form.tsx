"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Role, Teacher } from "@prisma/client"
import axios from "axios"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

import { ActionEnum, EntityEnum } from "@/types/permissions"
import { useHasPermissions } from "@/lib/utils"
import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
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
import SingleImageSelect from "@/components/ui/single-image-select"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(2),
  title: z.string().min(2),
  description: z.string().min(8),
  mediaId: z.string().min(2).nullable(),
})

type TeacherFormValues = z.infer<typeof formSchema>

type Data = Teacher & { roleIds?: string[] }

interface TeacherFormProps {
  initialData: Data | null
}

export const TeacherForm: React.FC<TeacherFormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [canDelete] = useHasPermissions([EntityEnum.TEACHER, ActionEnum.DELETE])

  const title = initialData ? "Docent bewerken" : "Docent toevoegen"
  const description = initialData
    ? "Bewerk een docent."
    : "Voeg een nieuwe docent toe"
  const toastMessage = initialData ? "Docent opgeslagen." : "Docent toegevoegd."
  const action = initialData ? "Opslaan" : "Toevoegen"

  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      title: "",
      description: "",
      mediaId: "",
    },
  })

  const onSubmit = async (data: TeacherFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/teachers/${params.teacherId}`, data)
      } else {
        await axios.post(`/api/teachers`, data)
      }
      router.refresh()
      router.push(`/teachers`)
      toast.success(toastMessage)
    } catch (error: any) {
      toast.error("Er is iets mis gegaan.")
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/teachers/${params.teacherId}`)
      router.refresh()
      router.push(`/teachers`)
      toast.success("Docent verwijderd.")
    } catch (error: any) {
      toast.error("Er is iets mis gegaan.")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description}>
          {initialData && canDelete && (
            <Button
              disabled={loading}
              variant="destructive"
              size="icon"
              onClick={() => setOpen(true)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </Heading>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Naam</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Teacher name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel/beroep</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Personal trainer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beschrijving</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Geef een korte beschrijving over deze docent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mediaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Afbeelding</FormLabel>
                  <FormControl>
                    <SingleImageSelect
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
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
