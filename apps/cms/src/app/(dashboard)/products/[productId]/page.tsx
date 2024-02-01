"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EntityEnum } from "types/permissions";

import type { InferSelectModel, schema } from "@acme/db";
import { toast } from "@acme/ui/toast";
import { productFormSchema } from "@acme/validators";

import DetailButton from "~/components/detail-button";
import DetailHeader from "~/components/detail-header";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useMutation } from "~/hooks/use-mutation";
import { api } from "~/trpc/react";

type ProductFormValues = InferSelectModel<typeof schema.product>;

interface PageProps {
  params: { productId: string };
}

const ProductPage: React.FC<PageProps> = ({ params }) => {
  const [loading, setLoading] = useState(false);

  const { mutate: onDelete } = useMutation(
    EntityEnum.PRODUCT,
    "delete",
    "/products",
  );
  const { mutate: onCreate } = useMutation(
    EntityEnum.PRODUCT,
    "create",
    "/products",
  );
  const { mutate: onUpdate } = useMutation(
    EntityEnum.PRODUCT,
    "update",
    "/products",
  );
  const id = +params.productId || 0;

  const [product] = api.product.byId.useSuspenseQuery({ id });
  const hasInitialData = !!product;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: product || {
      title: "",
      slug: "",
      price: "0",
      stock: 10,
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (hasInitialData) {
        onUpdate({ ...data, id });
      } else {
        onCreate(data);
      }
    } catch (error) {
      toast.error("Er is iets mis gegaan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DetailHeader
        onDelete={() => onDelete(id)}
        title="Product"
        entity={EntityEnum.PRODUCT}
        hasInitialData={hasInitialData}
      />
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
                  <FormLabel>Title</FormLabel>
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
                      step="1"
                      placeholder="Product voorraad"
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                      value={field.value || 0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DetailButton hasInitialData={hasInitialData} loading={loading} />
        </form>
      </Form>
    </>
  );
};

export default ProductPage;
