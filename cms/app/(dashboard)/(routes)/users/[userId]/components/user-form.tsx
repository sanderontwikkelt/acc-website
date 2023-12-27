"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Role, User } from "@prisma/client"
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

import { RolesField } from "../../components/roles-field"

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().min(4).email(),
  password: z.string().min(8),
  roleIds: z.array(z.string()),
})

type UserFormValues = z.infer<typeof formSchema>

type Data = User & { roleIds?: string[] }

interface UserFormProps {
  initialData: Data | null
  roles: Role[]
}

export const UserForm: React.FC<UserFormProps> = ({ initialData, roles }) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [canDelete] = useHasPermissions([EntityEnum.USER, ActionEnum.DELETE])

  const title = initialData ? "Gebruiker bewerken" : "Gebruiker toevoegen"
  const description = initialData
    ? "Bewerk een gebruiker."
    : "Voeg een nieuwe gebruiker toe"
  const toastMessage = initialData
    ? "Gebruiker opgeslagen."
    : "Gebruiker toegevoegd."
  const action = initialData ? "Opslaan" : "Toevoegen"

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      password: "",
      roleIds: [],
    },
  })

  const onSubmit = async (data: UserFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/users/${params.userId}`, data)
      } else {
        await axios.post(`/api/users`, data)
      }
      router.refresh()
      router.push(`/users`)
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
      await axios.delete(`/api/users/${params.userId}`)
      router.refresh()
      router.push(`/users`)
      toast.success("Gebruiker verwijderd.")
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
                      placeholder="User name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="info@physis.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wachtwoord</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="***********"
                      autoComplete="password"
                      autoCorrect="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <RolesField
              form={form}
              roles={roles}
              value={initialData?.roleIds || []}
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
