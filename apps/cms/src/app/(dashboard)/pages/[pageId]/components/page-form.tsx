"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Page } from "@acme/db";
import { cn } from "@acme/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";
import { toast } from "@acme/ui/toast";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

const formSchema = z.object({
  name: z.string().min(1),
  pageId: z.number().optional(),
  pathname: z.string().min(1),
  concept: z.boolean().optional(),
});

type PageFormValues = z.infer<typeof formSchema>;

interface PageFormProps {
  initialData: Page | null;
  withRedirect?: boolean;
  pages: Page[];
}

export const PageForm: React.FC<PageFormProps> = ({
  initialData,
  withRedirect,
  pages,
}) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const toastMessage = initialData
    ? "Pagina opgeslagen."
    : "Pagina toegevoegd.";
  const action = initialData ? "Opslaan" : "Toevoegen";

  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        name: "",
        pathname: "",
        concept: true,
      };

  const form = useForm<PageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
console.log(form.formState.errors)
  const createPage = api.page.create.useMutation();
  const updatePage = api.page.update.useMutation();

  const onSubmit = async ({ pageId, ...data }: PageFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await updatePage.mutateAsync({
          ...initialData,
          ...data,
          blocks: JSON.stringify(initialData.blocks || []),
          concept: !!data.concept,
          id: +params.pageId,
        });
      } else {
        const blocks =
          ((pageId &&
            pages.find(({ id }) => +id === +pageId)?.blocks) as string) || "[]";
        const { insertId } = await createPage.mutateAsync({
          ...data,
          blocks,
          concept: !!data.concept,
        });
        if (!withRedirect) {
          router.refresh();
          router.push(`/pages/${insertId}/builder`);
        }
      }
      router.refresh();
      if (withRedirect) {
        router.push(`/pages`);
      }
      toast.success(toastMessage);
    } catch (error: any) {
      console.log(error);
      toast.error("Er is iets mis gegaan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div
            className={cn(
              withRedirect
                ? "grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8"
                : "space-y-4",
            )}
          >
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
                  <FormLabel>Padnaam (staat achter domein)</FormLabel>
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
              name="pageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pagina dupliceren</FormLabel>
                  <FormControl>
                    <Select
                      value={field.pageId || undefined}
                      onValueChange={(v) => field.onChange(+v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer een pagina" />
                      </SelectTrigger>
                      <SelectContent>
                        {pages.map(({ id, name }) => (
                          <SelectItem key={id} value={String(id)}>
                            {name}
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
              name="concept"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Concept</FormLabel>
                    <FormDescription>
                      De pagina is niet zichtbaar op je website als het in
                      concept staat
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
