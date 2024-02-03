"use client";

import type { EntityEnum } from "types/permissions";
import type { ZodType } from "zod";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { ActionEnum } from "types/permissions";

import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@acme/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";
import { toast } from "@acme/ui/toast";

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
import { allowed, useHasPermissions } from "~/lib/utils";
import { AlertModal } from "../modals/alert-modal";
import { Loader } from "./loader";
import { Textarea } from "./textarea";
import MultiSelect from "./multi-select";

export enum TypeEnum {
  INPUT = "input",
  TEXT = "text",
  EMAIL = "email",
  PASSWORD = "password",
  SELECT = "select",
  MULTISELECT = "multiselect",
}

interface FormField {
  name: string;
  label: string;
  placeholder?: string;
  type: TypeEnum;
  options?: { label: string; value: string }[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormData = Record<string, any>;

function DetailDrawer({
  id,
  entity,
  onClose,
  initialData,
  formFields,
  title,
  description,
  transformData,
  formSchema,
  loading,
}: {
  id?: string | number;
  title: string;
  description: string;
  entity: EntityEnum;
  onClose: () => void;
  transformData?: (d: FormData) => FormData;
  initialData: FormData & { id?: string | number };
  formFields: FormField[];
  formSchema: ZodType;
  loading: boolean;
}) {
  const [isLoading, startTransition] = useTransition();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [canDelete, canCreate, canUpdate] = useHasPermissions(
    [entity, ActionEnum.DELETE],
    [entity, ActionEnum.CREATE],
    [entity, ActionEnum.UPDATE],
  );

  const onDelete = useMutation(entity, "delete");
  const onCreate = useMutation(entity, "create");
  const onUpdate = useMutation(entity, "update");

  const hasInitialData = !!initialData?.id;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (initialData) form.reset(initialData);
  }, [initialData, form]);

  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      if (transformData) data = transformData(data);
      try {
        if (hasInitialData) {
          allowed(canUpdate);
          await onUpdate({ ...data, id });
        } else {
          allowed(canCreate);
          await onCreate(data);
        }
        onClose();
      } catch (error) {
        console.log({ error });
        toast.error("Er is iets mis gegaan.");
      }
    });
  };

  return (
    <>
      <AlertModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <Drawer
        open={!!id}
        onClose={onClose}
        onOpenChange={(b: boolean) => !b && onClose()}
      >
        <DrawerContent className="space-y-3">
          {loading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/50">
              <Loader />
            </div>
          )}
          <DrawerHeader className="flex justify-between">
            <div>
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
            </div>
            {hasInitialData && canDelete && (
              <Button
                disabled={isLoading}
                variant="destructive"
                size="icon"
                onClick={() => setDeleteOpen(true)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            )}
          </DrawerHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <fieldset
                className="w-full space-y-8 px-5"
                disabled={hasInitialData ? !canUpdate : !canCreate}
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
                  {formFields.map(
                    ({ name, label, placeholder, type, options }) => (
                      <FormField
                        control={form.control}
                        key={name}
                        name={name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                              {
                                {
                                  input: (
                                    <Input
                                      disabled={loading}
                                      placeholder={
                                        placeholder ||
                                        `Typ een ${label.toLowerCase()}`
                                      }
                                      {...field}
                                    />
                                  ),
                                  text: (
                                    <Textarea
                                      disabled={loading}
                                      placeholder={
                                        placeholder ||
                                        `Typ een ${label.toLowerCase()}`
                                      }
                                      {...field}
                                    />
                                  ),
                                  multiselect: (
                                    <MultiSelect
                                      disabled={loading}
                                      options={options}
                                      onChange={(values: string[]) => field.onChange(values.map((v) => +v))}
                                      selectedValues={field.value}
                                    />
                                  ),
                                  email: (
                                    <Input
                                      disabled={loading}
                                      placeholder={
                                        placeholder ||
                                        `Typ een ${label.toLowerCase()}`
                                      }
                                      type="email"
                                      {...field}
                                    />
                                  ),
                                  password: (
                                    <Input
                                      disabled={loading}
                                      placeholder={
                                        placeholder ||
                                        `Typ een ${label.toLowerCase()}`
                                      }
                                      type="password"
                                      {...field}
                                    />
                                  ),
                                  select: (
                                    <Select
                                      onValueChange={(v) => field.onChange(+v)}
                                      defaultValue={
                                        field.value
                                          ? field.value.toString()
                                          : undefined
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue
                                          placeholder={
                                            placeholder ||
                                            `Selecteer een ${label.toLowerCase()}`
                                          }
                                        />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {options?.map(({ value, label }) => (
                                          <SelectItem key={value} value={value}>
                                            {label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  ),
                                }[type]
                              }
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ),
                  )}
                </div>
                <DrawerFooter className="flex flex-row justify-end px-0">
                  <DrawerClose asChild>
                    <Button variant="outline">Sluiten</Button>
                  </DrawerClose>
                  <Button>Opslaan</Button>
                </DrawerFooter>
              </fieldset>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DetailDrawer;
