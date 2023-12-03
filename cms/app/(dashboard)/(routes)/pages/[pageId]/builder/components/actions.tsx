'use client'

import { PageForm } from '../../components/page-form'
import { SEOForm } from '@/components/seo-form'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { BlockType } from '@/lib/html-blocks'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { Page, SEO } from '@prisma/client'
import { Dialog } from '@radix-ui/react-dialog'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'react-hot-toast'

export function PresetActions({
  blocks,
  pageIds,
  seo,
  page,
}: {
  blocks: BlockType[]
  page: Page
  seo: SEO
  pageIds: string[]
}) {
  const [loading, setLoading] = React.useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = React.useState(false)
  const [showSEODialog, setShowSEODialog] = React.useState(false)
  const params = useParams()
  const router = useRouter()

  const deletePage = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/pages/${params.pageId}`)
      toast.success('Pagina verwijderd.')
      setShowDeleteDialog(false)
      setLoading(false)
      router.refresh()
      router.push(
        `/pages/${
          pageIds.length > 1
            ? `/${
                pageIds[pageIds.indexOf(params.pageId as string) > 0 ? 0 : 1]
              }/builder`
            : ''
        }`
      )
    } catch (error: any) {
      toast.error('Er is iets mis gegaan.')
    }
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className='focus-visible:ring-0'
          disabled={loading}
        >
          <Button variant='outline' className='py-2 px-0 w-8 h-8 ml-2'>
            <span className='sr-only'>Acties</span>
            <EllipsisHorizontalIcon className='h-3 w-3' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuItem onSelect={() => setShowSettingsDialog(true)}>
            Pagina instellingen
          </DropdownMenuItem>
          {!!seo && (
            <DropdownMenuItem onSelect={() => setShowSEODialog(true)}>
              SEO instellingen
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className='text-red-600'
          >
            Pagina verwijderen
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Weet je het zeker?</AlertDialogTitle>
            <AlertDialogDescription>
              Dit kan niet ongedaan gemaakt worden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant='destructive'
              onClick={() => {
                deletePage()
              }}
            >
              Verwijderen
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pagina aanpassen</DialogTitle>
            <DialogDescription>Stel je pagina in.</DialogDescription>
          </DialogHeader>
          <PageForm initialData={page} />
        </DialogContent>
      </Dialog>
      {!!seo && (
        <Dialog open={showSEODialog} onOpenChange={setShowSEODialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pagina SEO</DialogTitle>
              <DialogDescription>
                SEO optimaliseert websites voor betere vindbaarheid in
                zoekmachines.
              </DialogDescription>
            </DialogHeader>
            <div className='py-6'>
              <SEOForm
                initialData={seo}
                seoId={seo.id}
                pathname={page.pathname}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
