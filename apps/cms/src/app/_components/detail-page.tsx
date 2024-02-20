"use client";

import type { EntityEnum } from "types/permissions";
import type { ZodType } from "zod";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { ActionEnum } from "types/permissions";

import { Button, cn } from "@acme/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";
import { toast } from "@acme/ui/toast";

import { AlertModal } from "~/components/modals/alert-modal";
import { Card } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Heading } from "~/components/ui/heading";
import { Input } from "~/components/ui/input";
import { Loader } from "~/components/ui/loader";
import MediaSelect from "~/components/ui/media-select";
import MultiSelect from "~/components/ui/multi-select";
import { Textarea } from "~/components/ui/textarea";
import { useMutation } from "~/hooks/use-mutation";
import { allowed, useHasPermissions } from "~/lib/utils";

export enum TypeEnum {
  INPUT = "input",
  TEXT = "text",
  EMAIL = "email",
  PASSWORD = "password",
  SELECT = "select",
  MULTISELECT = "multiselect",
  IMAGES = "images",
}

interface FormField {
  lane: string;
  name: string;
  label: string;
  placeholder?: string;
  type: TypeEnum;
  options?: { label: string; value: string }[];
  inputProps?: Record<string, string | number>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormData = Record<string, any>;

function DetailPage({
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
  const [openDelete, setOpenDelete] = useState(false);

  const [canDelete, canCreate, canUpdate] = useHasPermissions(
    [entity, ActionEnum.DELETE],
    [entity, ActionEnum.CREATE],
    [entity, ActionEnum.UPDATE],
  );

  const onCreate = useMutation(entity, "create");
  const onUpdate = useMutation(entity, "update");
  const onDelete = useMutation(entity, "delete");

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

  const fields = formFields.reduce((a, i) => {
    const listIndex = a.findIndex((fList) => fList?.[0].lane === i.lane);
    if (listIndex === -1) return [...a, [i]];
    if (a[listIndex]) a[listIndex] = [...a[listIndex], i];
    return a;
  }, [] as FormField[][]);

  return (
    <>
      <AlertModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div>
        <div className="space-y-3">
          {loading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/50">
              <Loader />
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Heading title={title} description={description}>
                {canDelete && (
                  <div className="flex items-center space-x-2">
                    <Button
                      disabled={loading || isLoading}
                      variant="outline"
                      type="button"
                      onClick={() => setOpenDelete(true)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                    <Button disabled={loading}>
                      Opslaan
                      <SaveIcon className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </Heading>
              <Card className="flex-grow">
                <fieldset
                  className="w-full"
                  disabled={hasInitialData ? !canUpdate : !canCreate}
                >
                  <div className={cn("flex w-full space-x-4")}>
                    {fields.map((field, idx) => (
                      <div
                        key={idx}
                        className="w-full flex-grow space-y-4"
                        style={{ maxWidth: `${100 / fields.length}%` }}
                      >
                        {field.map(
                          ({
                            name,
                            label,
                            placeholder,
                            type,
                            options,
                            inputProps,
                          }) => (
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
                                            {...inputProps}
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
                                            onChange={(values: string[]) =>
                                              field.onChange(
                                                values.map((v) => +v),
                                              )
                                            }
                                            selectedValues={field.value}
                                          />
                                        ),
                                        images: (
                                          <MediaSelect
                                            multiple
                                            values={field.value}
                                            onChange={field.onChange}
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
                                            onValueChange={(v) =>
                                              field.onChange(+v)
                                            }
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
                                              {options?.map(
                                                ({ value, label }) => (
                                                  <SelectItem
                                                    key={value}
                                                    value={value}
                                                  >
                                                    {label}
                                                  </SelectItem>
                                                ),
                                              )}
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
                    ))}
                  </div>
                </fieldset>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default DetailPage;
