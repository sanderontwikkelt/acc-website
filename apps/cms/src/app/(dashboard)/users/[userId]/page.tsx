"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EntityEnum } from "types/permissions";

import type { InferSelectModel, schema } from "@acme/db";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";
import { toast } from "@acme/ui/toast";
import { userFormSchema } from "@acme/validators";

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

type UserFormValues = InferSelectModel<typeof schema.user>;

interface PageProps {
  params: { userId: string };
}

const UserPage: React.FC<PageProps> = ({ params }) => {
  const [loading, setLoading] = useState(false);

  const { mutate: onDelete } = useMutation(EntityEnum.USER, "delete", "/users");
  const { mutate: onCreate } = useMutation(EntityEnum.USER, "create", "/users");
  const { mutate: onUpdate } = useMutation(EntityEnum.USER, "update", "/users");
  const id = params.userId;

  const [user] = api.user.byId.useSuspenseQuery({ id });
  const hasInitialData = !!user;

  const [roles] = api.role.all.useSuspenseQuery();
  const roleOptions = roles.map(({ id, name }) => ({
    label: name || "",
    key: id,
  }));

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: user || {
      name: "",
      email: "",
      roleId: null,
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    if (data.roleId) data.roleId = +data.roleId;
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
        title="Gebruiker"
        entity={EntityEnum.USER}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Naam</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="User name"
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
                      placeholder="info@socks.com"
                      {...field}
                    />
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
                      onValueChange={(v) => field.onChange(+v)}
                      defaultValue={field.value?.toString() || undefined}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer een rol" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions?.map(
                          ({ key, label }: { key: number; label: string }) => (
                            <SelectItem key={key} value={key.toString()}>
                              {label}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
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

export default UserPage;
