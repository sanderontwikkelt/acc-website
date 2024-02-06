"use client";

import type { z } from "zod";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import { notFound, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardList, SaveIcon, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { ActionEnum, EntityEnum } from "types/permissions";

import { Button, Input } from "@acme/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";
import { userFormSchema } from "@acme/validators";

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

type UserFormValues = z.infer<typeof userFormSchema>;

const UserDetailPage = () => {
  const { userId } = useParams();
  const isDetails = !!(userId && userId !== "new");
  const [isDeleting, setIsDeleting] = useState(false);

  const [loading, startTransition] = useTransition();

  const [canCreate, canDelete, canUpdate] = useHasPermissions(
    [EntityEnum.USER, ActionEnum.CREATE],
    [EntityEnum.USER, ActionEnum.DELETE],
    [EntityEnum.USER, ActionEnum.UPDATE],
  );

  const deleteUser = useMutation(EntityEnum.USER, "delete", "/users");
  const updateUser = useMutation(EntityEnum.USER, "update");
  const createUser = useMutation(EntityEnum.USER, "create", "/users");

  const { data: user, isLoading } = api.user.byId.useQuery({
    id: isDetails ? (userId as string) : "",
  });

  if (isDetails && !isLoading && !user) notFound();

  const [roles] = api.role.all.useSuspenseQuery();

  const roleOptions = useMemo(
    () =>
      (roles?.map(({ id, name }) => ({
        label: name || "",
        value: String(id),
      })) || []) as {
        label: string;
        value: string;
      }[],
    [roles],
  );

  const action = isDetails ? "Opslaan" : "Toevoegen";

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      roleId: null,
    },
  });

  useEffect(() => {
    if (user) {
      form.reset(user);
    }
  }, [user, form]);

  const onSubmit = async (data: UserFormValues) => {
    startTransition(async () => {
      if (isDetails && canUpdate) {
        await updateUser({ ...data, id: userId });
      } else if (canCreate) {
        await createUser(data);
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
            title={isDetails ? "Gebruiker aanpassen" : "Gebruiker toevoegen"}
            description={
              isDetails
                ? "Bekijk gebruiker gegevens en pas eventueel aan"
                : "Voeg een nieuw gebruiker toe"
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
                <SaveIcon className="mr-1 w-4" />
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Naam</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="User titel"
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
                        <Input disabled={loading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="roleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rol</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(v) => v && field.onChange(+v)}
                          value={
                            field.value ? field.value.toString() : undefined
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecteer een rol" />
                          </SelectTrigger>
                          <SelectContent>
                            {roleOptions?.map(({ value, label }) => (
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
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
      <AlertModal
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={() => deleteUser(+userId)}
        loading={false}
      />
    </>
  );
};

export default UserDetailPage;
