"use client";

import type { z } from "zod";
import React, { useEffect, useState, useTransition } from "react";
import { notFound, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardList, PlusIcon, SaveIcon, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { ActionEnum, EntityEnum } from "types/permissions";

import type { Media } from "@acme/db";
import { Button, Input } from "@acme/ui";
import { teacherFormSchema } from "@acme/validators";

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
import SingleImageSelect from "~/components/ui/single-image-select";
import { useMutation } from "~/hooks/use-mutation";
import { useHasPermissions } from "~/lib/utils";
import { api } from "~/trpc/react";

type TeacherFormValues = z.infer<typeof teacherFormSchema>;

const TeacherDetailPage = () => {
  const { teacherId } = useParams();
  const isDetails = !!(teacherId && teacherId !== "new");
  const [image, setImage] = useState<Media | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [loading, startTransition] = useTransition();

  const [canCreate, canDelete, canUpdate] = useHasPermissions(
    [EntityEnum.TEACHER, ActionEnum.CREATE],
    [EntityEnum.TEACHER, ActionEnum.DELETE],
    [EntityEnum.TEACHER, ActionEnum.UPDATE],
  );

  const deleteTeacher = useMutation(EntityEnum.TEACHER, "delete", "/teachers");
  const updateTeacher = useMutation(EntityEnum.TEACHER, "update");
  const createTeacher = useMutation(EntityEnum.TEACHER, "create", "/teachers");

  const { data: teacher, isLoading } = api.teacher.byId.useQuery({
    id: isDetails ? +teacherId : 0,
  });

  if (isDetails && !isLoading && !teacher) notFound();

  const action = isDetails ? "Opslaan" : "Toevoegen";

  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      name: "",
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (teacher) {
      form.reset(teacher);
      if (teacher.media) {
        setImage({
          ...teacher.media,
          createdAt: new Date(teacher.media.createdAt),
          updatedAt: new Date(teacher.media.updatedAt),
        } as Media);
      }
    }
  }, [teacher, form]);

  const onSubmit = async (data: TeacherFormValues) => {
    startTransition(async () => {
      if (isDetails && canUpdate) {
        await updateTeacher({ ...data, id: +teacherId });
      } else if (canCreate) {
        await createTeacher(data);
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
            title={isDetails ? "Docent aanpassen" : "Docent toevoegen"}
            description={
              isDetails
                ? "Bekijk docent gegevens en pas eventueel aan"
                : "Voeg een nieuw docent toe"
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
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Naam</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Docent naam"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titel</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Docent titel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="mediaId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail afbeelding</FormLabel>
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
          </div>
        </form>
      </Form>
      <AlertModal
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={() => deleteTeacher(+teacherId)}
        loading={false}
      />
    </>
  );
};

export default TeacherDetailPage;
