"use client";

import React, { useEffect, useMemo, useTransition } from "react";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ActionEnum, EntityEnum } from "types/permissions";
import { z } from "zod";

import { Button, Input } from "@acme/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";
import { productFormSchema } from "@acme/validators";

import { TypeEnum } from "~/app/_components/detail-page";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useMutation } from "~/hooks/use-mutation";
import { useHasPermissions } from "~/lib/utils";
import { api } from "~/trpc/react";

type ProductFormValues = z.infer<typeof productFormSchema>;

const ProductDetailPage = () => {
  const { productId } = useParams();
  const isDetails = !!(productId && productId !== "new");

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
      stock: 0,
    },
  });

  useEffect(() => {
    if (product) form.reset(product);
  }, [product, form]);

  const onSubmit = async (data: ProductFormValues) => {
    startTransition(async () => {
      if (isDetails && canUpdate) {
        await updateProduct({ ...data, id: +productId });
      } else if (canCreate) {
        await createProduct(data);
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beschrijving</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product beschrijving"
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
                  <FormLabel>Voorraad</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      min={0}
                      max={1_000}
                      step={1}
                      placeholder="Product voorraad"
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
                  <FormLabel>Categorie</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(v) => field.onChange(+v)}
                      defaultValue={
                        field.value ? field.value.toString() : undefined
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="" />
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
          </div>
          <Button
            disabled={isLoading || loading}
            className="ml-auto"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProductDetailPage;
