"use client";

import type { z } from "zod";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import { notFound, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ClipboardList,
  ListFilter,
  PlusIcon,
  SaveIcon,
  SearchCode,
  Trash,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { ActionEnum, EntityEnum } from "types/permissions";

import type { Media } from "@acme/db";
import { Button, Input, Textarea } from "@acme/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";
import { libraryFormSchema } from "@acme/validators";

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
import RichText from "~/components/ui/rich-text";
import { useMutation } from "~/hooks/use-mutation";
import { useHasPermissions } from "~/lib/utils";
import { api } from "~/trpc/react";
import SingleImageSelect from "~/components/ui/single-image-select";

type LibraryFormValues = z.infer<typeof libraryFormSchema>;

const LibraryDetailPage = () => {
  const { libraryId } = useParams();
  const isDetails = !!(libraryId && libraryId !== "new");
  const [image, setImage] = useState<Media | null>(null);
  const [seoImage, setSeoImage] = useState<Media | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [loading, startTransition] = useTransition();

  const [canCreate, canDelete, canUpdate] = useHasPermissions(
    [EntityEnum.LIBRARY, ActionEnum.CREATE],
    [EntityEnum.LIBRARY, ActionEnum.DELETE],
    [EntityEnum.LIBRARY, ActionEnum.UPDATE],
  );

  const deleteLibrary = useMutation(EntityEnum.LIBRARY, "delete", "/librarys");
  const updateLibrary = useMutation(EntityEnum.LIBRARY, "update");
  const createLibrary = useMutation(EntityEnum.LIBRARY, "create", "/librarys");

  const { data: library, isLoading } = api.library.byId.useQuery({
    id: isDetails ? +libraryId : 0,
  });

  if (isDetails && !isLoading && !library) notFound();

  const [categories] = api.libraryCategory.all.useSuspenseQuery();

  const categoryOptions = useMemo(
    () =>
      (categories?.map(({ id, title }) => ({
        label: title,
        value: String(id),
      })) || []) as {
        label: string;
        value: string;
      }[],
    [categories],
  );

  const action = isDetails ? "Opslaan" : "Toevoegen";

  const form = useForm<LibraryFormValues>({
    resolver: zodResolver(libraryFormSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  useEffect(() => {
    if (library) {
      form.reset(library);
      if (library.media) {
        setImage({
                ...library.media,
                createdAt: new Date(library.media.createdAt),
                updatedAt: new Date(library.media.updatedAt),
              } as Media)
        // form.setValue(
        //   "mediaIds",
        //   library.images.map(({ mediaId }) => mediaId),
        // );
      }
    }
  }, [library, form]);

  const onSubmit = async (data: LibraryFormValues) => {
    startTransition(async () => {
      if (isDetails && canUpdate) {
        await updateLibrary({ ...data, id: +libraryId });
      } else if (canCreate) {
        await createLibrary(data);
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <Heading
            title={isDetails ? "Library aanpassen" : "Library toevoegen"}
            description={
              isDetails
                ? "Bekijk library gegevens en pas eventueel aan"
                : "Voeg een nieuw library toe"
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
                          placeholder="Item titel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categorie</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(v) => v && field.onChange(+v)}
                          value={
                            field.value ? field.value.toString() : undefined
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecteer een categorie" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoryOptions?.map(({ value, label }) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mediaLink"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Media link</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Media link"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SearchCode className="mr-2 w-5" />
                  SEO
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="seoTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO titel</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="SEO titel"
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
                <FormField
                  control={form.control}
                  name="seoDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO beschrijving</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={loading}
                          placeholder="SEO beschrijving"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seoMediaId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SingleImageSelect
                          value={seoImage}
                          onChange={(media) => {
                            setSeoImage(media);
                            field.onChange(media.id);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ListFilter className="mr-2 w-5" />
                  Uitebreide beschrijving
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RichText
                          disabled={loading}
                          id="library-body"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SearchCode className="mr-2 w-5" />
                  Afbeeldingen
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <FormField
                  control={form.control}
                  name="seoTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SingleImageSelect
                          value={image}
                          onChange={(media) => {
                            setImage(media);
                            field.onChange(media.id);
                          }}
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
        onConfirm={() => deleteLibrary(+libraryId)}
        loading={false}
      />
    </>
  );
};

export default LibraryDetailPage;
