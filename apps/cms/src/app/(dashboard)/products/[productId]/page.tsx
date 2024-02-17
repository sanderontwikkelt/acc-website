"use client";

import type { z } from "zod";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import { notFound, useParams } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ClipboardList,
  ImagePlusIcon,
  ListFilter,
  PlusIcon,
  SaveIcon,
  SearchCode,
  Trash,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { ActionEnum, EntityEnum } from "types/permissions";

import type { Media } from "@acme/db";
import { Button, cn, Input, Textarea } from "@acme/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";
import { productFormSchema } from "@acme/validators";

import { AlertModal } from "~/components/modals/alert-modal";
import { MediaModal } from "~/components/modals/media-modal";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import DynamicVariants from "~/components/ui/dynamic-variants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Heading } from "~/components/ui/heading";
import { ImageGallary } from "~/components/ui/image-gallary";
import RichText from "~/components/ui/rich-text";
import { useMutation } from "~/hooks/use-mutation";
import { useHasPermissions } from "~/lib/utils";
import { api } from "~/trpc/react";

type ProductFormValues = z.infer<typeof productFormSchema>;

const ProductDetailPage = () => {
  const { productId } = useParams();
  const isDetails = !!(productId && productId !== "new");
  const [isOpenMedia, setIsOpenMedia] = useState(false);
  const [images, setImages] = useState<Media[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const [loading, startTransition] = useTransition();

  const [canCreate, canDelete, canUpdate] = useHasPermissions(
    [EntityEnum.PRODUCT, ActionEnum.CREATE],
    [EntityEnum.PRODUCT, ActionEnum.DELETE],
    [EntityEnum.PRODUCT, ActionEnum.UPDATE],
  );

  const deleteProduct = useMutation(EntityEnum.PRODUCT, "delete", "/products");
  const updateProduct = useMutation(EntityEnum.PRODUCT, "update");
  const createProduct = useMutation(EntityEnum.PRODUCT, "create", "/products");

  const { data: product, isLoading } = api.product.byId.useQuery({
    id: isDetails ? +productId : 0,
  });

  if (isDetails && !isLoading && !product) notFound();

  const [categories] = api.productCategory.all.useSuspenseQuery();

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

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      description: "",
      slug: "",
      price: "",
    },
  });

  useEffect(() => {
    if (product) {
      form.reset(product);
      if (product.images) {
        setImages(
          product.images.map(
            ({ media }) =>
              ({
                ...media,
                createdAt: new Date(media.createdAt),
                updatedAt: new Date(media.updatedAt),
              }) as Media,
          ),
        );
        form.setValue(
          "mediaIds",
          product.images.map(({ mediaId }) => mediaId),
        );
      }
    }
  }, [product, form]);

  const onSubmit = async (data: ProductFormValues) => {
    if (data.description) data.description = sanitizeHtml(data.description)

    startTransition(async () => {
      if (isDetails && canUpdate) {
        await updateProduct({ ...data, id: +productId });
      } else if (canCreate) {
        await createProduct(data);
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
            title={isDetails ? "Product aanpassen" : "Product toevoegen"}
            description={
              isDetails
                ? "Bekijk product gegevens en pas eventueel aan"
                : "Voeg een nieuw product toe"
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
                          placeholder="Product titel"
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
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Beschrijving</FormLabel>
                      <FormControl>
                        <RichText
                          disabled={loading}
                          id="description"
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
                          placeholder="Product slug"
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
                    <FormItem className="md:col-span-2">
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
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ListFilter className="mr-2 w-5" />
                  Varianten
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prijs</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          type="number"
                          min={0}
                          max={50_000}
                          step={0.01}
                          placeholder="Product prijs"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Standaard voorraad</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          type="number"
                          min={0}
                          max={1_000}
                          step={1}
                          placeholder="Product voorraad"
                          {...field}
                          onChange={(e) => field.onChange(+e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="variants"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Varianten</FormLabel>
                      <FormControl>
                        <DynamicVariants
                          values={field.value}
                          onChange={field.onChange}
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
                        <ImageGallary
                          selected={images}
                          onChange={(media) => {
                            setImages(media);
                            field.onChange(media.map(({ id }) => id));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div
                  className={cn(
                    "flex w-full justify-center",
                    images.length
                      ? "mt-5"
                      : "h-40 items-center rounded-md bg-gray-100",
                  )}
                >
                  <Button
                    className="mx-auto"
                    size="sm"
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpenMedia(true)}
                  >
                    <ImagePlusIcon className="mr-1 w-4" />
                    Selecteren
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
      <MediaModal
        isOpen={isOpenMedia}
        onClose={() => setIsOpenMedia(false)}
        selected={images}
        onSelect={(media) => {
          setImages(media);
          form.setValue(
            "mediaIds",
            media.map(({ id }) => id),
          );
        }}
        type="image"
        multiple
      />
      <AlertModal
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={() => deleteProduct(+productId)}
        loading={false}
      />
    </>
  );
};

export default ProductDetailPage;
