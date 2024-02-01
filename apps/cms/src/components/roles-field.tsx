"use client";

import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";

export function RolesField({ form, value }: { form: any; value: string }) {
  return (
    <FormField
      control={form.control}
      name="roleIds"
      render={({ field }) => (
        <FormItem className=" w-[300px]">
          <FormLabel>Rollen</FormLabel>
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecteer een afstand" />
            </SelectTrigger>
            <SelectContent>
              {options?.map(
                ({ key, label }: { key: string; label: string }) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
          <FormDescription>
            Deze rollen zorgen voor toegang door de applicatie.
          </FormDescription>
        </FormItem>
      )}
    />
  );
}
