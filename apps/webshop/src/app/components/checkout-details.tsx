"use client";

import React, { useMemo, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RadioGroup } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "src/trpc/react";
import { z } from "zod";

import {
  Checkbox,
  cn,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@acme/ui";
import { orderFormSchema } from "@acme/validators";

import { WEB_URL } from "~/lib/constants";
import { formatter } from "~/lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { paymentOptions } from "./payment-options";
import { Textarea } from "./textarea";

const zodScheme = orderFormSchema.extend({
  consent: z.literal<boolean>(true, {
    errorMap: () => ({ message: "Dit is een verplicht veld." }),
  }),
});

type OrderFormSchema = z.infer<typeof zodScheme>;

const CheckoutDetails = () => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const createOrder = api.order.create.useMutation();

  const { data, isLoading } = api.cart.own.useQuery();

  const total = useMemo(() => {
    return (
      data?.items.reduce((a, i) => a + i.product.price * i.quantity, 0) || 0
    );
  }, [data]);

  const totalToday = useMemo(() => {
    return (
      data?.items.reduce(
        (a, i) =>
          a +
          (i.product.price * i.quantity) / (i.productPaymentPlan?.length || 1),
        0,
      ) || 0
    );
  }, [data]);

  const form = useForm<OrderFormSchema>({
    resolver: zodResolver(zodScheme),
  });

  const onSubmit = async (orderData: OrderFormSchema) => {
    startTransition(async () => {
      const { id } = await createOrder.mutateAsync(orderData);
      const response = await fetch(`${WEB_URL}/api/checkout`, {
        method: "POST",
        body: JSON.stringify({
          cartId: data.id,
          orderId: id,
          method: orderData.invoicePaymentMethod,
        }),
      });
      const payment = await response.json();
      router.push(payment.payment._links.checkout.href);
      console.log({ payment });
    });
  };

  console.log(form.formState.errors);

  return (
    <div>
      <h1 className="text-4xl">Afrekenen</h1>
      <div className="bg-main mb-10 h-1 w-8" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-10"
        >
          <section className="grid gap-5 md:grid-cols-2">
            <div>
              <h2 className="text-3xl">Factuurgegevens</h2>
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="invoiceFirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Voornaam*"
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
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Achternaam*"
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
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Bedrijfsnaam"
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
                    <FormItem className="md:col-span-2">
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
                    <FormItem className="md:col-span-2">
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
                    <FormItem className="md:col-span-2">
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Straatnaam en huisnummer*"
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
                    <FormItem className="md:col-span-2">
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Appartement, suite, unit enz. (optioneel)"
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
                    <FormItem className="md:col-span-2">
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Postcode*"
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
                    <FormItem className="md:col-span-2">
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="E-mailadres*"
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
                    <FormItem className="md:col-span-2">
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Plaats*"
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
                    <FormItem className="md:col-span-2">
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Telefoon*"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl">Extra informatie</h2>
              <FormField
                control={form.control}
                name="invoiceAdditionalInformation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        placeholder="Notities over je bestelling, bijvoorbeeld speciale notities voor aflevering."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div></div>
          </section>

          <section>
            <h2 className="text-3xl">Jouw bestelling</h2>

            {isLoading ? null : data.items?.length ? (
              <div className="flex flex-col space-y-6">
                <table>
                  <thead className="text-sm">
                    <th className="border-b border-t border-border px-2.5 py-3 text-start font-medium">
                      PRODUCT
                    </th>
                    <th className="border border-l-0 border-border px-2.5 py-3 text-start font-medium">
                      SUBTOTAAL
                    </th>
                  </thead>
                  <tbody>
                    {data.items.map((item) => {
                      const { product } = item;
                      const { price, title } = product;
                      return (
                        <tr className="text-lg" key={item.id}>
                          <td className="text-description p-2.5">
                            <div>
                              {title} x {item.quantity}
                            </div>
                            <div>Datum:</div>
                            <div>{item.productVariant.title}</div>
                          </td>

                          <td className="text-description w-1/3 border-r p-2.5">
                            {formatter.format(price * item.quantity)}
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="text-lg">
                      <td className="text-main p-2.5">Subtotaal</td>

                      <td className="text-description w-1/3 border-r p-2.5">
                        {formatter.format(total)}
                      </td>
                    </tr>
                    <tr className="text-lg">
                      <td className="text-main p-2.5">
                        Subtotaal vandaag afrekenen
                      </td>

                      <td className="text-description w-1/3 border-r p-2.5">
                        {formatter.format(totalToday)}
                      </td>
                    </tr>
                    <tr className="text-lg">
                      <td className="text-main border-b border-border p-2.5">
                        BTW
                      </td>

                      <td className="text-description w-1/3 border-b border-r border-border p-2.5">
                        {formatter.format(totalToday * 0.21)}
                      </td>
                    </tr>
                    <tr className="text-lg">
                      <td className="text-main p-2.5 font-bold">
                        Totaal afrekenen vandaag
                      </td>

                      <td className="text-description w-1/3 border-r p-2.5">
                        {formatter.format(totalToday * 1.21)}
                      </td>
                    </tr>
                    <tr className="text-lg">
                      <td className="text-main p-2.5">Resterend</td>

                      <td className="text-description w-1/3 border-r p-2.5">
                        {formatter.format(totalToday - total)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Winkelmand is leeg</p>
            )}
          </section>
          <section>
            <FormField
              control={form.control}
              name="invoicePaymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup value={field.value} onChange={field.onChange}>
                      <RadioGroup.Label className="sr-only">
                        Privacy setting
                      </RadioGroup.Label>
                      <div className="space-y-2">
                        {paymentOptions.map((setting, settingIdx) => (
                          <RadioGroup.Option
                            key={setting.id}
                            value={setting.id}
                            className={({ checked }) =>
                              cn(
                                "border-main border",
                                settingIdx === 0 ? "" : "",
                                checked ? "border-main z-10 bg-gray-100" : "",
                                "relative flex cursor-pointer items-center border p-4 focus:outline-none",
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <span
                                  className={cn(
                                    checked
                                      ? "border-transparent bg-gray-600"
                                      : "border-gray-300 bg-white",
                                    active
                                      ? "ring-2 ring-gray-600 ring-offset-2"
                                      : "",
                                    "mt-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border",
                                  )}
                                  aria-hidden="true"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                </span>
                                <span className="ml-3 flex flex-col">
                                  <RadioGroup.Label
                                    as="span"
                                    className={cn(
                                      checked
                                        ? "text-gray-900"
                                        : "text-gray-900",
                                      "flex items-center justify-between text-lg font-medium",
                                    )}
                                  >
                                    {setting.title}
                                  </RadioGroup.Label>
                                </span>
                                <div className="ml-auto">{setting.icon}</div>
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="my-10 text-lg">
              Je persoonlijke gegevens zullen worden gebruikt om je bestelling
              te verwerken, om je beleving op deze site te optimaliseren en voor
              andere doeleinden zoals beschreven in onze{" "}
              <Link className="font-bold underline" href="/privacy-beleid">
                privacybeleid
              </Link>
              .
            </p>

            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-lg">
                      Ik heb de{" "}
                      <Link
                        className="font-bold underline"
                        href="/algemene-voorwaarden"
                      >
                        algemene voorwaarden
                      </Link>{" "}
                      van de site gelezen en ga hiermee akkoord
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button variant="success" size="lg" type="submit" className="mt-8">
              Inschrijven
            </Button>
          </section>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutDetails;
