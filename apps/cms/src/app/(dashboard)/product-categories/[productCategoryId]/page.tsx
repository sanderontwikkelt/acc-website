"use client";

import type { z } from "zod";
import React, { useEffect, useState, useTransition } from "react";
import { notFound, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardList, PlusIcon, SaveIcon, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { ActionEnum, EntityEnum } from "types/permissions";

import { Button, Input } from "@acme/ui";
import { productCategoryFormSchema } from "@acme/validators";

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

type ProductCategoryFormValues = z.infer<typeof productCategoryFormSchema>;

const ProductCategoryDetailPage = () => {
  const { productCategoryId } = useParams();
  const isDetails = !!(productCategoryId && productCategoryId !== "new");
  const [isDeleting, setIsDeleting] = useState(false);

  const [loading, startTransition] = useTransition();

  const [canCreate, canDelete, canUpdate] = useHasPermissions(
    [EntityEnum.PRODUCTCATEGORY, ActionEnum.CREATE],
    [EntityEnum.PRODUCTCATEGORY, ActionEnum.DELETE],
    [EntityEnum.PRODUCTCATEGORY, ActionEnum.UPDATE],
  );

  const deleteProductCategory = useMutation(
    EntityEnum.PRODUCTCATEGORY,
    "delete",
    "/product-categories",
  );
  const updateProductCategory = useMutation(
    EntityEnum.PRODUCTCATEGORY,
    "update",
  );
  const createProductCategory = useMutation(
    EntityEnum.PRODUCTCATEGORY,
    "create",
    "/product-categories",
  );

  const { data: productCategory, isLoading } =
    api.productCategory.byId.useQuery({
      id: isDetails ? +productCategoryId : 0,
    });

  if (isDetails && !isLoading && !productCategory) notFound();

  const action = isDetails ? "Opslaan" : "Toevoegen";

  const form = useForm<ProductCategoryFormValues>({
    resolver: zodResolver(productCategoryFormSchema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    if (productCategory) {
      form.reset(productCategory);
    }
  }, [productCategory, form]);

  const onSubmit = async (data: ProductCategoryFormValues) => {
    startTransition(async () => {
      if (isDetails && canUpdate) {
        await updateProductCategory({ ...data, id: +productCategoryId });
      } else if (canCreate) {
        await createProductCategory(data);
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
            title={
              isDetails
                ? "Productcategorie aanpassen"
                : "Productcategorie toevoegen"
            }
            description={
              isDetails
                ? "Bekijk productcategorie gegevens en pas eventueel aan"
                : "Voeg een nieuw productcategorie toe"
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
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
      <AlertModal
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={() => deleteProductCategory(+productCategoryId)}
        loading={false}
      />
    </>
  );
};

export default ProductCategoryDetailPage;
