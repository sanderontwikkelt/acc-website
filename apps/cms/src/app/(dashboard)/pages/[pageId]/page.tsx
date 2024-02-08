"use client";

import type { z } from "zod";
import React, { useEffect, useState, useTransition } from "react";
import { notFound, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ClipboardList,
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
import { pageFormSchema } from "@acme/validators";

import { AlertModal } from "~/components/modals/alert-modal";
import { MediaModal } from "~/components/modals/media-modal";
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
import SingleImageSelect from "~/components/ui/single-image-select";
import { useMutation } from "~/hooks/use-mutation";
import { useHasPermissions } from "~/lib/utils";
import { api } from "~/trpc/react";

type PageFormValues = z.infer<typeof pageFormSchema>;

const PageDetailPage = () => {
  const { pageId } = useParams();
  const isDetails = !!(pageId && pageId !== "new");
  const [isOpenMedia, setIsOpenMedia] = useState(false);
  const [image, setImage] = useState<Media | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [loading, startTransition] = useTransition();

  const [canCreate, canDelete, canUpdate] = useHasPermissions(
    [EntityEnum.PAGE, ActionEnum.CREATE],
    [EntityEnum.PAGE, ActionEnum.DELETE],
    [EntityEnum.PAGE, ActionEnum.UPDATE],
  );

  const deletePage = useMutation(EntityEnum.PAGE, "delete", "/pages");
  const updatePage = useMutation(EntityEnum.PAGE, "update");
  const createPage = useMutation(EntityEnum.PAGE, "create", "/pages");

  const { data: page, isLoading } = api.page.byId.useQuery({
    id: isDetails ? +pageId : 0,
  });

  if (isDetails && !isLoading && !page) notFound();

  const action = isDetails ? "Opslaan" : "Toevoegen";

  const form = useForm<PageFormValues>({
    resolver: zodResolver(pageFormSchema),
    defaultValues: {
      name: "",
      pathname: "",
      blocks: "{}",
    },
  });

  useEffect(() => {
    if (page) {
      form.reset({
        ...page,
        blocks: typeof page.blocks === "string" ? page.blocks : "{}",
      });
      if (page.media) {
        setImage({
          ...page.media,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Media);
      }
    }
  }, [page, form]);

  const onSubmit = async (data: PageFormValues) => {
    startTransition(async () => {
      try {
        if (isDetails && canUpdate) {
          await updatePage({ ...data, id: +pageId });
        } else if (canCreate) {
          await createPage(data);
        }
      } catch (e) {
        console.log(e);
        form.setError("pathname", { message: "Kies een unieke padnaam" });
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
            title={isDetails ? "Pagina aanpassen" : "Pagina toevoegen"}
            description={
              isDetails
                ? "Bekijk pagina gegevens en pas eventueel aan"
                : "Voeg een nieuw pagina toe"
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Naam</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Pagina naam"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pathname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Padnaam</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Pagina padnaam"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="concept"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
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
                            <SelectItem value="0">Concept</SelectItem>
                            <SelectItem value="1">Geplubliseerd</SelectItem>
                          </SelectContent>
                        </Select>
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
                    <FormItem className="md:col-span-2">
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
                  name="seoDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO beschrijving</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={loading}
                          className="h-36"
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
                      <FormLabel>SEO afbeelding</FormLabel>
                      <FormControl>
                        <SingleImageSelect
                          value={image}
                          onChange={(media) => {
                            field.onChange(media.id);
                            setImage(media);
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
      <MediaModal
        isOpen={isOpenMedia}
        onClose={() => setIsOpenMedia(false)}
        selected={[image]}
        onSelect={([media]) => {
          setImage(media), form.setValue("seoMediaId", media.id);
        }}
        type="image"
        multiple={false}
      />
      <AlertModal
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={() => deletePage(+pageId)}
        loading={false}
      />
    </>
  );
};

export default PageDetailPage;
