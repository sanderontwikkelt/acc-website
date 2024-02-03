"use client";

import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { ActionEnum, EntityEnum } from "types/permissions";
import { ZodType } from "zod";

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
import { useHasPermissions } from "~/lib/utils";
import { AlertModal } from "../modals/alert-modal";
import { Loader } from "./loader";

export enum TypeEnum {
  INPUT = "input",
  EMAIL = "email",
  PASSWORD = "password",
  SELECT = "select",
}

interface FormField {
  name: string;
  label: string;
  placeholder?: string;
  type: TypeEnum;
  options?: { label: string; value: string }[];
}

function DetailDrawer<FormData>({
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
  id?: string;
  title: string;
  description: string;
  entity: EntityEnum;
  onClose: () => void;
  transformData?: (d: FormData) => FormData;
  initialData: FormData;
  formFields: FormField[];
  formSchema: ZodType;
  loading: boolean;
}) {
  const [isLoading, startTransition] = useTransition();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [canDelete, canCreate, canUpdate] = useHasPermissions([
    entity,
    ActionEnum.DELETE,
  ]);

  const { mutate: onDelete } = useMutation(entity, "delete");
  const { mutate: onCreate } = useMutation(entity, "create");
  const { mutate: onUpdate } = useMutation(entity, "update");

  const hasInitialData = !!initialData;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    if (initialData) form.reset(initialData);
  }, [initialData, form]);

  const onSubmit = async (data: FormData) => {
    startTransition(() => {
      if (transformData) data = transformData(data);
      try {
        if (hasInitialData) {
          onUpdate({ ...data, id });
        } else {
          onCreate(data);
        }
      } catch (error) {
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8 px-5"
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
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DetailDrawer;
