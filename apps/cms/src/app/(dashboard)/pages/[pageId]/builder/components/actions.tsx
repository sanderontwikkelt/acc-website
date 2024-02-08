"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { Dialog } from "@radix-ui/react-dialog";

import { Page } from "@acme/db";
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@acme/ui";
import { toast } from "@acme/ui/toast";

import { SEOForm } from "~/components/seo-form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { api } from "~/trpc/react";
import { PageForm } from "../../components/page-form";

export function PresetActions({
  pageIds,
  page,
}: {
  page: Page;
  pageIds: number[];
}) {
  const [loading, setLoading] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = React.useState(false);
  const [showSEODialog, setShowSEODialog] = React.useState(false);
  const params = useParams();
  const router = useRouter();

  const deletePage = api.page.delete.useMutation();

  const onDelete = async () => {
    try {
      setLoading(true);
      await deletePage.mutateAsync(+params.pageId);
      toast.success("Pagina verwijderd.");
      setShowDeleteDialog(false);
      setLoading(false);
      router.refresh();
      router.push(
        `/pages/${
          pageIds.length > 1
            ? `/${
                pageIds[pageIds.indexOf(params.pageId as string) > 0 ? 0 : 1]
              }/builder`
            : ""
        }`,
      );
    } catch (error: unknown) {
      toast.error("Er is iets mis gegaan.");
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="focus-visible:ring-0"
          disabled={loading}
        >
          <Button variant="outline" className="ml-2 h-8 w-8 px-0 py-2">
            <span className="sr-only">Acties</span>
            <EllipsisHorizontalIcon className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setShowSettingsDialog(true)}>
            Pagina instellingen
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setShowSEODialog(true)}>
            SEO instellingen
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600"
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
            <Button variant="destructive" onClick={onDelete}>
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
      <Dialog open={showSEODialog} onOpenChange={setShowSEODialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pagina SEO</DialogTitle>
            <DialogDescription>
              SEO optimaliseert websites voor betere vindbaarheid in
              zoekmachines.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <SEOForm pageId={page.id} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
