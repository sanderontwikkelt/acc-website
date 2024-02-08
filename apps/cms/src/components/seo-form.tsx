"use client";

import type * as z from "zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { Media } from "@acme/db";
import { toast } from "@acme/ui/toast";
import { seoFormSchema } from "@acme/validators";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { revalidateClientTag } from "~/lib/revalidate-client-tag";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { Loader } from "./ui/loader";
import { Separator } from "./ui/separator";
import SingleImageSelect from "./ui/single-image-select";
import { Textarea } from "./ui/textarea";

type SEOFormValues = z.infer<typeof seoFormSchema>;

interface SEOFormProps {
  pageId: number;
}

export const SEOForm: React.FC<SEOFormProps> = ({ pageId }) => {
  const [image, setImage] = useState<Media | null>(null);

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { data: seo, isLoading } = api.seo.byPageId.useQuery({
    pageId,
  });

  const form = useForm<SEOFormValues>({
    resolver: zodResolver(seoFormSchema),
  });

  const updateSeo = api.seo.update.useMutation();

  const onSubmit = async (data: SEOFormValues) => {
    try {
      setLoading(true);
      await updateSeo.mutateAsync({
        ...data,
        pageId,
      });
      await revalidateClientTag("seo" + pageId);
      router.refresh();
      toast.success("SEO updated.");
    } catch (error: unknown) {
      toast.error("Er is iets mis gegaan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (seo) {
      form.reset({
        ...seo,
      });
      if (seo.media) {
        setImage({
          ...seo.media,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Media);
      }
    }
  }, [seo, form]);

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className={cn("space-y-4")}>
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
                      value={field.value || ""}
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
                    <Textarea
                      disabled={loading}
                      placeholder="Beschrijving"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <h2 className="mb-4 text-sm font-semibold">
              Open graph: bepaalt hoe links visueel verschijnen op sociale
              media.
            </h2>
            <FormField
              control={form.control}
              name="ogTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Titel"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ogDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beschrijving</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Beschrijving"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mediaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Afbeelding</FormLabel>
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
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Opslaan
          </Button>
        </form>
      </Form>
    </>
  );
};
