"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SEO } from "@prisma/client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

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
import { Separator } from "./ui/separator";
import SingleImageSelect from "./ui/single-image-select";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  ogTitle: z.string().nullable(),
  ogDescription: z.string().nullable(),
  mediaId: z.string().nullable(),
});

type SEOFormValues = z.infer<typeof formSchema>;

interface SEOFormProps {
  initialData: SEO;
  seoId: string;
  pathname: string;
}

export const SEOForm: React.FC<SEOFormProps> = ({
  initialData,
  pathname,
  seoId,
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const defaultValues = initialData;

  const form = useForm<SEOFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: SEOFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/seo/${seoId}`, data);
        revalidateClientTag("seo" + (pathname.replaceAll("/", "") || "index"));
        router.refresh();
        toast.success("SEO updated.");
      }
    } catch (error: any) {
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
                      value={field.value || ""}
                      onChange={field.onChange}
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
