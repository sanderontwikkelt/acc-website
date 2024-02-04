"use client";

import type { EntityEnum } from "types/permissions";
import type { ZodType } from "zod";
import { useEffect, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ActionEnum } from "types/permissions";

import {
  Button,
  cn,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import useMediaQuery from "~/hooks/use-media-query";
import { useMutation } from "~/hooks/use-mutation";
import { allowed, useHasPermissions } from "~/lib/utils";
import { Loader } from "./loader";
import MediaSelect from "./media-select";
import MultiSelect from "./multi-select";
import { Textarea } from "./textarea";

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
  name: string;
  label: string;
  placeholder?: string;
  type: TypeEnum;
  options?: { label: string; value: string }[];
  inputProps?: Record<string, string | number>;
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

  const isDesktop = useMediaQuery("(min-width: 960px)");

  const [canCreate, canUpdate] = useHasPermissions(
    [entity, ActionEnum.CREATE],
    [entity, ActionEnum.UPDATE],
  );

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

  const fields = formFields.reduce((a, i) => {
    const listIndex = a.findIndex((fList) => fList?.[0].lane === i.lane);
    if (listIndex === -1) return [...a, [i]];
    if (a[listIndex]) a[listIndex] = [...a[listIndex], i];
    return a;
  }, [] as FormField[][]);

  const isDrawer = fields.length > 1 || !isDesktop;

  const Wrapper = isDrawer ? Drawer : Dialog;
  const Content = isDrawer ? DrawerContent : DialogContent;
  const Header = isDrawer ? DrawerHeader : DialogHeader;
  const Title = isDrawer ? DrawerTitle : DialogTitle;
  const Description = isDrawer ? DrawerDescription : DialogDescription;

  return (
    <>
      <Wrapper
        open={!!id}
        onClose={onClose}
        onOpenChange={(b: boolean) => !b && onClose()}
      >
        <Content className="space-y-3">
          {loading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/50">
              <Loader />
            </div>
          )}
          <Header className="flex justify-between max-md:flex-col">
            <div>
              <Title className="mb-1">{title}</Title>
              <Description>{description}</Description>
            </div>
          </Header>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <fieldset
                className="w-full space-y-8"
                disabled={hasInitialData ? !canUpdate : !canCreate}
              >
                <div
                  className={cn(
                    "flex w-full space-x-4",
                    isDrawer ? "px-4" : "",
                  )}
                >
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
                <DrawerFooter
                  className={cn(
                    "flex flex-row justify-end pt-0",
                    isDrawer ? "" : "p-4",
                  )}
                >
                  <DrawerClose asChild>
                    <Button variant="outline">Sluiten</Button>
                  </DrawerClose>
                  <Button disabled={isLoading}>Opslaan</Button>
                </DrawerFooter>
              </fieldset>
            </form>
          </Form>
        </Content>
      </Wrapper>
    </>
  );
}

export default DetailDrawer;
