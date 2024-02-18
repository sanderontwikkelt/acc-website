'use client'

import Image from 'next/image';
import React, { useMemo, useTransition } from 'react'
import { api } from 'src/trpc/react';
import Counter from './counter';
import { formatter } from '~/lib/utils';
import { Button } from './button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    cn,
 } from '@acme/ui';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { orderFormSchema } from '@acme/validators';
import { Input } from './input';
import { Textarea } from './textarea';
import { RadioGroup } from '@headlessui/react'
  
type OrderFormSchema = z.infer<typeof orderFormSchema>;

const CartDetails = () => {
  const [loading, startTransition] = useTransition();

    const utils = api.useUtils();

    const handleSuccess = async () => {
        await utils.cart.invalidate();
    }

  const { data, isLoading } = api.cart.own.useQuery();

  const total = useMemo(() => {
    return data?.items.reduce((a, i) => a + i.product.price * i.quantity, 0) || 0
  }, [data])

  const totalToday = useMemo(() => {
    return data?.items.reduce((a, i) => a + i.product.price * i.quantity / (i.productPaymentPlan?.length || 1), 0) || 0
  }, [data])

  const form = useForm<OrderFormSchema>({
    resolver: zodResolver(orderFormSchema),
  });

  const onSubmit = async (data: OrderFormSchema) => {
    startTransition(async () => {
        await console.log(data);
    });
  };

  return (
    <div>
        <h1 className='text-4xl'>Afrekenen</h1>
        <div className='w-8 h-1 bg-main mb-10' />
        <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-10"
        >
<section className="grid gap-5 md:grid-cols-2">
    <div>
        <h2 className='text-3xl'>Factuurgegevens</h2>
        <div className="grid md:grid-cols-2 gap-5">
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
            <FormItem className='md:col-span-2'>
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
            <FormItem className='md:col-span-2'>
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
            <FormItem className='md:col-span-2'>
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
            <FormItem className='md:col-span-2'>
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
            <FormItem className='md:col-span-2'>
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
            <FormItem className='md:col-span-2'>
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
            <FormItem className='md:col-span-2'>
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
            <FormItem className='md:col-span-2'>
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
        <div>
        <h2 className='text-3xl'>Extra informatie</h2>
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
    </div>
</section>

<section>
<h2 className='text-3xl'>Extra informatie</h2>



        {isLoading ? null : data.items?.length ? <div className='space-y-6 flex flex-col'><table>
            <thead className='text-sm'>
                <th className='py-3 text-start px-2.5 border border-r-0 border-border ' colSpan={2} />
                <th className='py-3 text-start px-2.5 border-t border-b border-border font-medium'>PRODUCT</th>
                <th className='py-3 text-start px-2.5 border border-l-0 border-border font-medium'>SUBTOTAAL</th>
            </thead>
            <tbody>
                {data.items.map((item) => {
                    const { product } = item;
                    const { price, title } = product;
                    return (
                    <tr className="text-lg" key={item.id}>
                        <td className='p-2.5 w-[99%] text-description'>
                            <div>{title} x {item.quantity}</div>
                            <div>Datum:</div>
                            <div>{item.productVariant.title}</div>
                        </td>
                        
                        <td className='p-2.5 text-description border-r'>
                            {formatter.format(price * item.quantity)}
                        </td>

                    </tr>
                )})}
                <tr className="text-lg">
                        <td className='p-2.5 w-[99%] text-main font-medium'>
                            Subtotaal
                        </td>
                        
                        <td className='p-2.5 text-description border-r'>
                            {formatter.format(total)}
                        </td>

                    </tr>
                <tr className="text-lg">
                        <td className='p-2.5 w-[99%] text-main font-medium'>
                            Subtotaal vandaag afrekenen
                        </td>
                        
                        <td className='p-2.5 text-description border-r'>
                            {formatter.format(totalToday)}
                        </td>

                    </tr>
                <tr className="text-lg">
                        <td className='p-2.5 w-[99%] text-main border-b border-border'>
                            BTW
                        </td>
                        
                        <td className='p-2.5 text-description border-r border-b border-border'>
                            {formatter.format(totalToday * 0.21)}
                        </td>

                    </tr>
                <tr className="text-lg">
                        <td className='p-2.5 w-[99%] text-main font-bold'>
                            Totaal afrekenen vandaag
                        </td>
                        
                        <td className='p-2.5 text-description border-r'>
                            {formatter.format(totalToday * 1.21)}
                        </td>

                    </tr>
                <tr className="text-lg">
                        <td className='p-2.5 w-[99%] text-main'>
                            Resterend
                        </td>
                        
                        <td className='p-2.5 text-description border-r'>
                            {formatter.format(totalToday - total)}
                        </td>

                    </tr>
            </tbody>
        </table>
        <Button variant="success" className='ml-auto h-[50px]' href="/afrekenen">Doorgaan naar afrekenen</Button>
        </div> : <p>Winkelmand is leeg</p>}
</section>

<section>
<FormField
            control={form.control}
            name="invoicePaymentMethod"
            render={({ field }) => (
                <FormItem>
                <FormControl>

<RadioGroup value={field.value} onChange={field.onChange}>
      <RadioGroup.Label className="sr-only">Privacy setting</RadioGroup.Label>
      <div>
        {[
        { id: 'credit-card', 'Creditcard' },
        { id: 'ideal', 'iDEAL' },
    ].map((setting, settingIdx) => (
          <RadioGroup.Option
            key={setting.id}
            value={setting.id}
            className={({ checked }) =>
              cn(
                'border border-main',
                settingIdx === 0 ? '' : '',
                checked ? 'z-10 border-main bg-gray-100' : '',
                'relative flex cursor-pointer border p-4 focus:outline-none',
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={cn(
                    checked ? 'bg-gray-600 border-transparent' : 'bg-white border-gray-300',
                    active ? 'ring-2 ring-offset-2 ring-gray-600' : '',
                    'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center',
                  )}
                  aria-hidden="true"
                >
                  <span className="rounded-full bg-white w-1.5 h-1.5" />
                </span>
                <span className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className={cn(checked ? 'text-gray-900' : 'text-gray-900', 'block text-sm font-medium')}
                  >
                    {setting.name}
                  </RadioGroup.Label>
                  <RadioGroup.Description
                    as="span"
                    className={cn(checked ? 'text-gray-700' : 'text-gray-500', 'block text-sm')}
                  >
                    {setting.description}
                  </RadioGroup.Description>
                </span>
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
    
</section>

        </form>
        </Form>
        </div>
  )
}

export default CartDetails