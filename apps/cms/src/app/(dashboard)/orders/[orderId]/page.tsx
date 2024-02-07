"use client";

import type { z } from "zod";
import React, { useEffect, useMemo, useTransition } from "react";
import { notFound, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Boxes,
  ClipboardList,
  ListTree,
  PlusIcon,
  SaveIcon,
  Wallet2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { ActionEnum, EntityEnum } from "types/permissions";

import { orderStatusTranslations } from "@acme/api/utils";
import { Button, Input, Textarea } from "@acme/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";
import { orderFormSchema } from "@acme/validators";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useMutation } from "~/hooks/use-mutation";
import { useHasPermissions } from "~/lib/utils";
import { api } from "~/trpc/react";

type OrderFormValues = z.infer<typeof orderFormSchema>;

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const isDetails = !!(orderId && orderId !== "new");

  const [loading, startTransition] = useTransition();

  const [canCreate, canUpdate] = useHasPermissions(
    [EntityEnum.ORDER, ActionEnum.CREATE],
    [EntityEnum.ORDER, ActionEnum.UPDATE],
  );

  const updateOrder = useMutation(EntityEnum.ORDER, "update");
  const createOrder = useMutation(EntityEnum.ORDER, "create", "/orders");

  const { data: order, isLoading } = api.order.byId.useQuery({
    id: isDetails ? +orderId : 0,
  });

  if (isDetails && !isLoading && !order) notFound();

  const [users] = api.user.all.useSuspenseQuery();

  const userOptions = useMemo(
    () =>
      (users?.map(({ id, email, name }) => ({
        label: `${name} - ${email}`,
        value: String(id),
      })) || []) as {
        label: string;
        value: string;
      }[],
    [users],
  );

  const statusOptions = useMemo(
    () =>
      (Object.entries(orderStatusTranslations)?.map(([value, label]) => ({
        label: label as "WAITING",
        value,
      })) || []) as {
        label: string;
        value: string;
      }[],
    [],
  );

  const action = isDetails ? "Opslaan" : "Toevoegen";

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      userId: "",
      status: "CONCEPT",
      invoiceFirstName: "",
      invoiceLastName: "",
      invoiceCompanyName: "",
      invoiceOccupation: "",
      invoiceBTW: "",
      invoiceCountry: "",
      invoiceStreet: "",
      invoiceAddressAdditional: "",
      invoicePostalCode: "",
      invoiceEmail: "",
      invoiceCity: "",
      invoicePhone: "",
      invoicePaymentBank: "",
      invoiceAdditionalInformation: "",
    },
  });

  useEffect(() => {
    if (order) {
      form.reset(order);
    }
  }, [order, form]);

  const onSubmit = async (data: OrderFormValues) => {
    startTransition(async () => {
      if (isDetails && canUpdate) {
        await updateOrder({ ...data, id: +orderId });
      } else if (canCreate) {
        await createOrder(data);
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
            title={isDetails ? "Order aanpassen" : "Order toevoegen"}
            description={
              isDetails
                ? "Bekijk order gegevens en pas eventueel aan"
                : "Voeg een nieuw order toe"
            }
          >
            <div className="flex space-x-2">
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
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(v) => v && field.onChange(+v)}
                          value={
                            field.value ? field.value.toString() : undefined
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecteer een categorie" />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions?.map(({ value, label }) => (
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
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Klant</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(v) => v && field.onChange(+v)}
                          value={
                            field.value ? field.value.toString() : undefined
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecteer een categorie" />
                          </SelectTrigger>
                          <SelectContent>
                            {userOptions?.map(({ value, label }) => (
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wallet2 className="mr-2 w-5" />
                  Factuurgegevens
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="invoiceFirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voornaam</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Voornaam"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="invoiceLastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Achternaam</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Achternaam"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="invoiceCompanyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bedrijf</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Bedrijf"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="invoiceOccupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beroep</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Beroep"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="invoiceBTW"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BTW-nummer</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="BTW-nummer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="invoiceCountry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Land</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Land"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="invoiceStreet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Straatnaam en huisnummer</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Straatnaam en huisnummer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="invoiceAddressAdditional"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appartement, suite, unit</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Appartement, suite, unit"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="invoicePostalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postcode</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Postcode"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="invoiceEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mailadres</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="E-mailadres"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="invoiceCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stad</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Stad"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="invoicePhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefoon</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Telefoon"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="invoicePaymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Betaalmethode</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Betaalmethode"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="invoicePaymentBank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Bank"
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
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ListTree className="mr-2 w-5" />
                  Extra informatie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="invoiceAdditionalInformation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Extra informatie</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={loading}
                          placeholder="Extra informatie"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {!!order && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Boxes className="mr-2 w-5" />
                    Bestelling
                  </CardTitle>
                </CardHeader>
                <CardContent className="">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Artikel</TableHead>
                        <TableHead>Kosten</TableHead>
                        <TableHead>Aantal</TableHead>
                        <TableHead>Totaal</TableHead>
                        <TableHead>BTW</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.items?.length ? (
                        order.items.map((row) => (
                          <TableRow key={row.id} data-pw="data-table-row">
                            <TableCell>{row.id}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            Geen artikelen.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};

export default OrderDetailPage;
