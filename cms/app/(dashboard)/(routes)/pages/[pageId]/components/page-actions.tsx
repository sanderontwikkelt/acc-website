'use client'

import { SEOForm } from '@/components/seo-form'
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useHasPermissions } from '@/lib/utils'
import { ActionEnum, EntityEnum } from '@/types/permissions'
import { SEO } from '@prisma/client'
import { Dialog } from '@radix-ui/react-dialog'
import { ActivityLogIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import { SearchIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import * as React from 'react'

export function PageActions({
  seo,
  pathname,
}: {
  seo?: SEO
  pathname: string
}) {
  const [open, setIsOpen] = React.useState(false)
  const router = useRouter()
  const params = useParams()

  const [canUpdate] = useHasPermissions([EntityEnum.PAGE, ActionEnum.UPDATE])

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>
            <span className='sr-only'>Acties</span>
            <DotsHorizontalIcon className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onSelect={() => router.push(`/pages/${params.pageId}/builder`)}
          >
            <ActivityLogIcon className='mr-2 h-4 w-4' />
            Content Builder
          </DropdownMenuItem>
          {!!seo && canUpdate && (
            <DropdownMenuItem onSelect={() => setIsOpen(true)}>
              <SearchIcon className='mr-2 h-4 w-4' />
              Pagina SEO
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {!!seo && (
        <Dialog open={open} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pagina SEO</DialogTitle>
              <DialogDescription>
                SEO optimaliseert websites voor betere vindbaarheid in
                zoekmachines.
              </DialogDescription>
            </DialogHeader>
            <div className='py-6'>
              <SEOForm initialData={seo} seoId={seo.id} pathname={pathname} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
