"use client";

import type { z } from "zod";
import React, { useEffect, useState, useTransition } from "react";
import { notFound, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ClipboardList,
  MapPinIcon,
  PlusIcon,
  SaveIcon,
  Trash,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { ActionEnum, EntityEnum } from "types/permissions";

import type { Media } from "@acme/db";
import { Button, Input } from "@acme/ui";
import { specialistFormSchema } from "@acme/validators";

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

type SpecialistFormValues = z.infer<typeof specialistFormSchema>;

const SpecialistDetailPage = () => {
  const { specialistId } = useParams();
  const isDetails = !!(specialistId && specialistId !== "new");
  const [image, setImage] = useState<Media | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [loading, startTransition] = useTransition();

  const [canCreate, canDelete, canUpdate] = useHasPermissions(
    [EntityEnum.SPECIALIST, ActionEnum.CREATE],
    [EntityEnum.SPECIALIST, ActionEnum.DELETE],
    [EntityEnum.SPECIALIST, ActionEnum.UPDATE],
  );

  const deleteSpecialist = useMutation(
    EntityEnum.SPECIALIST,
    "delete",
    "/specialists",
  );
  const updateSpecialist = useMutation(EntityEnum.SPECIALIST, "update");
  const createSpecialist = useMutation(
    EntityEnum.SPECIALIST,
    "create",
    "/specialists",
  );

  const { data: specialist, isLoading } = api.specialist.byId.useQuery({
    id: isDetails ? +specialistId : 0,
  });

  if (isDetails && !isLoading && !specialist) notFound();

  const action = isDetails ? "Opslaan" : "Toevoegen";

  const form = useForm<SpecialistFormValues>({
    resolver: zodResolver(specialistFormSchema),
    defaultValues: {
      name: "",
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (specialist) {
      form.reset(specialist);
      if (specialist.media) {
        setImage({
          ...specialist.media,
          createdAt: new Date(specialist.media.createdAt),
          updatedAt: new Date(specialist.media.updatedAt),
        } as Media);
      }
    }
  }, [specialist, form]);

  const onSubmit = async (data: SpecialistFormValues) => {
    startTransition(async () => {
      if (isDetails && canUpdate) {
        await updateSpecialist({ ...data, id: +specialistId });
      } else if (canCreate) {
        await createSpecialist(data);
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
            title={isDetails ? "Specialist aanpassen" : "Specialist toevoegen"}
            description={
              isDetails
                ? "Bekijk specialist gegevens en pas eventueel aan"
                : "Voeg een nieuw specialist toe"
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPinIcon className="mr-2 w-5" />
                  Landkaart
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Docent address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Docent website"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefoonnummer</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Docent telefoonnummer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          type="email"
                          placeholder="Docent e-mail"
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
        onConfirm={() => deleteSpecialist(+specialistId)}
        loading={false}
      />
    </>
  );
};

export default SpecialistDetailPage;
