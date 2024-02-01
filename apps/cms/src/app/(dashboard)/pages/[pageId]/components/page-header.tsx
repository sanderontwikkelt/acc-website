"use client"

import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { SEO } from "@prisma/client"
import axios from "axios"
import { Trash } from "lucide-react"
import toast from "react-hot-toast"

import { ActionEnum, EntityEnum } from "@/types/permissions"
import { useHasPermissions } from "@/lib/utils"
import { AlertModal } from "@/components/modals/alert-modal"
import { Button, buttonVariants } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { PageActions } from "./page-actions"

const PageHeader = ({
  hasInitialData,
  withRedirect,
  pathname,
  seo,
}: {
  hasInitialData?: boolean
  withRedirect?: boolean
  pathname: string
  seo?: SEO
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()

  const [canDelete] = useHasPermissions([EntityEnum.PAGE, ActionEnum.DELETE])

  const title = hasInitialData ? "Pagina bewerken" : "Pagina toevoegen"
  const description = hasInitialData
    ? "Pas je pagina aan."
    : "Voeg een nieuwe pagina toe."

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/pages/${params.pageId}`)
      router.refresh()
      if (withRedirect) router.push(`/pages`)
      toast.success("Pagina verwijderd.")
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
          {hasInitialData && (
            <div className="flex space-x-2">
              <PageActions seo={seo} pathname={pathname} />
              {canDelete && (
                <Button
                  disabled={loading}
                  variant="destructive"
                  size="icon"
                  onClick={() => setOpen(true)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </Heading>
      </div>
      <Separator />
    </>
  )
}

export default PageHeader
