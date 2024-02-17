"use client";

import type { z } from "zod";
import React, { useEffect, useState, useTransition } from "react";
import { notFound, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardList, PlusIcon, SaveIcon, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { ActionEnum, EntityEnum } from "types/permissions";

import { Button, Input } from "@acme/ui";
import { libraryCategoryFormSchema } from "@acme/validators";

import { AlertModal } from "~/components/modals/alert-modal";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Heading } from "~/components/ui/heading";
import { useMutation } from "~/hooks/use-mutation";
import { useHasPermissions } from "~/lib/utils";
import { api } from "~/trpc/react";

type LibraryCategoryFormValues = z.infer<typeof libraryCategoryFormSchema>;

const LibraryCategoryDetailPage = () => {
  const { libraryCategoryId } = useParams();
  const isDetails = !!(libraryCategoryId && libraryCategoryId !== "new");
  const [isDeleting, setIsDeleting] = useState(false);

  const [loading, startTransition] = useTransition();

  const [canCreate, canDelete, canUpdate] = useHasPermissions(
    [EntityEnum.LIBRARYCATEGORY, ActionEnum.CREATE],
    [EntityEnum.LIBRARYCATEGORY, ActionEnum.DELETE],
    [EntityEnum.LIBRARYCATEGORY, ActionEnum.UPDATE],
  );

  const deleteLibraryCategory = useMutation(
    EntityEnum.LIBRARYCATEGORY,
    "delete",
    "/library-categories",
  );
  const updateLibraryCategory = useMutation(
    EntityEnum.LIBRARYCATEGORY,
    "update",
  );
  const createLibraryCategory = useMutation(
    EntityEnum.LIBRARYCATEGORY,
    "create",
    "/library-categories",
  );

  const { data: libraryCategory, isLoading } =
    api.libraryCategory.byId.useQuery({
      id: isDetails ? +libraryCategoryId : 0,
    });

  if (isDetails && !isLoading && !libraryCategory) notFound();

  const action = isDetails ? "Opslaan" : "Toevoegen";

  const form = useForm<LibraryCategoryFormValues>({
    resolver: zodResolver(libraryCategoryFormSchema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    if (libraryCategory) {
      form.reset(libraryCategory);
    }
  }, [libraryCategory, form]);

  const onSubmit = async (data: LibraryCategoryFormValues) => {
    startTransition(async () => {
      if (isDetails && canUpdate) {
        await updateLibraryCategory({ ...data, id: +libraryCategoryId });
      } else if (canCreate) {
        await createLibraryCategory(data);
      }
    });
  };

  const title = form.watch('title')

useEffect(() => {
  form.setValue('slug', title.toLocaleLowerCase().replaceAll(" ", "-"))
}, [title, form])

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <Heading
            title={
              isDetails
                ? "Librarycategorie aanpassen"
                : "Librarycategorie toevoegen"
            }
            description={
              isDetails
                ? "Bekijk librarycategorie gegevens en pas eventueel aan"
                : "Voeg een nieuw librarycategorie toe"
            }
          >
            <div className="flex space-x-2">
              {canDelete && (
                <Button
                  variant="outline"
                  disabled={isLoading || loading}
                  type="button"
                  onClick={() => setIsDeleting(true)}
                >
                  <Trash className="mr-1 w-4" />
                  <span className="max-md:hidden">Verwijderen</span>
                </Button>
              )}
              <Button disabled={isLoading || loading}>
                {isDetails ? (
                  <SaveIcon className="mr-1 w-4" />
                ) : (
                  <PlusIcon className="mr-1 w-4" />
                )}
                <span className="max-md:hidden">{action}</span>
              </Button>
            </div>
          </Heading>
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ClipboardList className="mr-2 w-5" />
                  Algemene informatie
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titel</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Titel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Item slug"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
      <AlertModal
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={() => deleteLibraryCategory(+libraryCategoryId)}
        loading={false}
      />
    </>
  );
};

export default LibraryCategoryDetailPage;
