"use client";

import type { z } from "zod";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import { notFound, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardList, PlusIcon, SaveIcon, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  ActionEnum,
  EntityEnum,
  permissionActions,
  permissionEntities,
} from "types/permissions";

import { Button, Input, Textarea } from "@acme/ui";
import { roleFormSchema } from "@acme/validators";

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
import MultiSelect from "~/components/ui/multi-select";
import { useMutation } from "~/hooks/use-mutation";
import { useHasPermissions } from "~/lib/utils";
import { api } from "~/trpc/react";

type RoleFormValues = z.infer<typeof roleFormSchema>;

const RoleDetailPage = () => {
  const { roleId } = useParams();
  const isDetails = !!(roleId && roleId !== "new");
  const [isDeleting, setIsDeleting] = useState(false);

  const [loading, startTransition] = useTransition();

  const [canCreate, canDelete, canUpdate] = useHasPermissions(
    [EntityEnum.ROLE, ActionEnum.CREATE],
    [EntityEnum.ROLE, ActionEnum.DELETE],
    [EntityEnum.ROLE, ActionEnum.UPDATE],
  );

  const deleteRole = useMutation(EntityEnum.ROLE, "delete", "/roles");
  const updateRole = useMutation(EntityEnum.ROLE, "update");
  const createRole = useMutation(EntityEnum.ROLE, "create", "/roles");

  const { data: role, isLoading } = api.role.byId.useQuery({
    id: isDetails ? +roleId : 0,
  });

  if (isDetails && !isLoading && !role) notFound();

  const [permissions] = api.permission.all.useSuspenseQuery();

  const permissionOptions = useMemo(
    () =>
      (
        permissions?.map(({ id, entity, action }) => ({
          label: `${permissionEntities.find(({ value }) => value === entity)?.label || "-"} - ${permissionActions.find(({ value }) => value === action)?.label || "-"}`,
          value: String(id),
        })) || []
      ).sort((a, b) => a.label.localeCompare(b.label)) as {
        label: string;
        value: string;
      }[],
    [permissions],
  );

  const action = isDetails ? "Opslaan" : "Toevoegen";

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: "",
      description: "",
      permissionIds: [],
    },
  });

  useEffect(() => {
    if (role) {
      form.reset(role);
    }
  }, [role, form]);

  const onSubmit = async (data: RoleFormValues) => {
    startTransition(async () => {
      if (isDetails && canUpdate) {
        await updateRole({ ...data, id: roleId });
      } else if (canCreate) {
        await createRole(data);
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
            title={isDetails ? "Rol aanpassen" : "Rol toevoegen"}
            description={
              isDetails
                ? "Bekijk rol gegevens en pas eventueel aan"
                : "Voeg een nieuw rol toe"
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Naam</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Role titel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="permissionIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rechten</FormLabel>
                      <FormControl>
                        <MultiSelect
                          disabled={loading}
                          options={permissionOptions}
                          onChange={(values: string[]) =>
                            field.onChange(values.map((v) => +v))
                          }
                          selectedValues={field.value.map((v) => String(v))}
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
                        <Textarea disabled={loading} {...field} />
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
        onConfirm={() => deleteRole(+roleId)}
        loading={false}
      />
    </>
  );
};

export default RoleDetailPage;
