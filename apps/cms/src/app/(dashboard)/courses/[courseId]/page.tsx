"use client";

import type { z } from "zod";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import { notFound, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ClipboardList,
  ExternalLink,
  FileQuestionIcon,
  GraduationCap,
  InfoIcon,
  PencilLine,
  PlusIcon,
  SaveIcon,
  SearchCode,
  Trash,
  Workflow,
} from "lucide-react";
import { useForm } from "react-hook-form";
import sanitizeHtml from "sanitize-html";
import { ActionEnum, EntityEnum } from "types/permissions";

import type { Media } from "@acme/db";
import { Button, Input, Textarea } from "@acme/ui";
import { courseFormSchema } from "@acme/validators";

import type { ButtonValue } from "../../pages/[pageId]/builder/components/collapsable-button";
import { AlertModal } from "~/components/modals/alert-modal";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import DynamicButtonList from "~/components/ui/dynamic-button-list";
import DynamicKVList from "~/components/ui/dynamic-kv-list";
import DynamicSelect from "~/components/ui/dynamic-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import FullRichText from "~/components/ui/full-rich-text";
import { Heading } from "~/components/ui/heading";
import RichText from "~/components/ui/rich-text";
import SingleImageSelect from "~/components/ui/single-image-select";
import { useMutation } from "~/hooks/use-mutation";
import { useHasPermissions } from "~/lib/utils";
import { api } from "~/trpc/react";
import { CollapsibleButton } from "../../pages/[pageId]/builder/components/collapsable-button";

type CourseFormValues = z.infer<typeof courseFormSchema>;

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const isDetails = !!(courseId && courseId !== "new");
  const [image, setImage] = useState<Media | null>(null);
  const [seoImage, setSeoImage] = useState<Media | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [loading, startTransition] = useTransition();

  const [canCreate, canDelete, canUpdate] = useHasPermissions(
    [EntityEnum.COURSE, ActionEnum.CREATE],
    [EntityEnum.COURSE, ActionEnum.DELETE],
    [EntityEnum.COURSE, ActionEnum.UPDATE],
  );

  const deleteCourse = useMutation(EntityEnum.COURSE, "delete", "/courses");
  const updateCourse = useMutation(EntityEnum.COURSE, "update");
  const createCourse = useMutation(EntityEnum.COURSE, "create", "/courses");

  const { data: course, isLoading } = api.course.byId.useQuery({
    id: isDetails ? +courseId : 0,
  });

  if (isDetails && !isLoading && !course) notFound();

  const action = isDetails ? "Opslaan" : "Toevoegen";

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    if (course) {
      form.reset({
        ...course,
        infoItems: Array.isArray(course.infoItems) ? course.infoItems : [],
        faqItems: Array.isArray(course.faqItems) ? course.faqItems : [],
        buttons: Array.isArray(course.buttons) ? course.buttons : [],
        mediaId: +course.mediaId,
        body: course.body as string,
      });
      if (course.media) {
        setImage({
          ...course.media,
          createdAt: new Date(course.media.createdAt),
          updatedAt: new Date(course.media.updatedAt),
        } as Media);
      }
      if (course.seoMedia) {
        setSeoImage({
          ...course.seoMedia,
          createdAt: new Date(course.seoMedia.createdAt),
          updatedAt: new Date(course.seoMedia.updatedAt),
        } as Media);
      }
      if (course.teachers) {
        form.setValue(
          "teacherIds",
          course.teachers.map(({ teacherId }) => teacherId),
        );
      }
    }
  }, [course, form]);

  const onSubmit = async (data: CourseFormValues) => {
    if (data.description) data.description = sanitizeHtml(data.description);
    if (data.body) data.body = sanitizeHtml(data.body);
    startTransition(async () => {
      if (isDetails && canUpdate) {
        await updateCourse({ ...data, id: +courseId });
      } else if (canCreate) {
        await createCourse(data);
      }
    });
  };

  const [teachers] = api.teacher.all.useSuspenseQuery();

  const teacherOptions = useMemo(
    () =>
      (teachers?.map(({ id, name }) => ({
        name: name,
        key: String(id),
      })) || []) as {
        name: string;
        key: string;
      }[],
    [teachers],
  );

  const title = form.watch("title");

  useEffect(() => {
    form.setValue("slug", title.toLocaleLowerCase().replaceAll(" ", "-"));
  }, [title, form]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <Heading
            title={isDetails ? "Cursus aanpassen" : "Cursus toevoegen"}
            description={
              isDetails
                ? "Bekijk cursus gegevens en pas eventueel aan"
                : "Voeg een nieuw cursus toe"
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
                    <FormItem className="md:col-span-2">
                      <FormLabel>Titel</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Cursus titel"
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PencilLine className="mr-2 w-5" />
                  Omschrijving
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormControl>
                        <FullRichText disabled={loading} id="body" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="videoLink"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Video link</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Video link"
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
                  <InfoIcon className="mr-2 w-5" />
                  Praktische informatie
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="infoItems"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <DynamicKVList
                          values={field.value?.length ? field.value : []}
                          onChange={(list) => field.onChange(list)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="mr-2 w-5" />
                    Docenten
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="teacherIds"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <DynamicSelect
                            values={
                              field.value?.length
                                ? field.value.map((key) => String(key))
                                : []
                            }
                            onChange={(newItems) =>
                              field.onChange(newItems.map((v) => +v))
                            }
                            items={teacherOptions}
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
                    <ExternalLink className="mr-2 w-5" />
                    Knoppen
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="buttons"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <DynamicButtonList
                            values={
                              (field.value?.length
                                ? field.value
                                : []) as ButtonValue[]
                            }
                            onChange={(list) => field.onChange(list)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileQuestionIcon className="mr-2 w-5" />
                  FAQ
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="faqItems"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <DynamicKVList
                          values={field.value?.length ? field.value : []}
                          onChange={(list) => field.onChange(list)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Workflow className="mr-2 w-5" />
                CTA
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="ctaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titel</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Cursus cta titel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ctaButton"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <CollapsibleButton
                        value={(field.value || {}) as ButtonValue}
                        setValue={field.onChange}
                      >
                        {null}
                      </CollapsibleButton>
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
                        className="h-36"
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
        </form>
      </Form>
      <AlertModal
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={() => deleteCourse(+courseId)}
        loading={false}
      />
    </>
  );
};

export default CourseDetailPage;
