"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Permission, Role } from "@prisma/client"
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
import { Textarea } from "@/components/ui/textarea"

import { PermissionsField } from "../../components/permissions-field"

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2).nullable(),
  permissionIds: z.array(z.string()),
})

type RoleFormValues = z.infer<typeof formSchema>

type Data = Role & { permissionIds?: string[] }

interface RoleFormProps {
  initialData: Data | null
  permissions: Permission[]
}

export const RoleForm: React.FC<RoleFormProps> = ({
  initialData,
  permissions,
}) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [canDelete] = useHasPermissions([EntityEnum.ROLE, ActionEnum.DELETE])

  const title = initialData ? "Rol bewerken" : "Rol toevoegen"
  const description = initialData
    ? "Bewerk een rol."
    : "Voeg een nieuwe rol toe"
  const toastMessage = initialData ? "Rol opgeslagen." : "Rol toegevoegd."
  const action = initialData ? "Opslaan" : "Toevoegen"

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      permissionIds: [],
    },
  })

  const onSubmit = async (data: RoleFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/roles/${params.roleId}`, data)
      } else {
        await axios.post(`/api/roles`, data)
      }
      router.refresh()
      router.push(`/roles`)
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
      await axios.delete(`/api/roles/${params.roleId}`)
      router.refresh()
      router.push(`/roles`)
      toast.success("Role verwijderd.")
    } catch (error: any) {
      toast.error("Zorg dat je eerst deze rol van alle gebruikers verwijderd.")
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
                      placeholder="Rol naam"
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
                      placeholder="Rol beschrijving"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PermissionsField
              form={form}
              permissions={permissions}
              value={initialData?.permissionIds || []}
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
