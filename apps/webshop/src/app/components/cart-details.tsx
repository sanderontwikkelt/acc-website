'use client'

import Image from 'next/image';
import React, { useMemo } from 'react'
import { api } from 'src/trpc/react';
import Counter from './counter';
import { formatter } from '~/lib/utils';
import { Button } from './button';

const CartDetails = () => {
    const deleteCartItem = api.cartItem.delete.useMutation();
    const updateCartItemQuantity = api.cartItem.updateCount.useMutation();
    const utils = api.useUtils();

    const handleSuccess = async () => {
        await utils.cart.invalidate();
    }

  const { data, isLoading } = api.cart.own.useQuery();

  const total = useMemo(() => {
    return data?.items.reduce((a, i) => a + i.product.price * i.quantity, 0) || 0
  }, [data])

  return (
    <div>
        <h1 className='text-4xl'>Inschrijven</h1>
        <div className='w-8 h-1 bg-main mb-10' />
        {isLoading ? null : data.items?.length ? <div className='space-y-6 flex flex-col'><table>
            <thead className='text-sm'>
                <th className='py-3 text-start px-2.5 border border-r-0 border-border ' colSpan={2} />
                <th className='py-3 text-start px-2.5 border-t border-b border-border font-medium'>PRODUCT</th>
                <th className='py-3 text-start px-2.5 border-t border-b border-border font-medium'>PRIJS</th>
                <th className='py-3 text-start px-2.5 border-t border-b border-border font-medium'>AANTAL</th>
                <th className='py-3 text-start px-2.5 border border-l-0 border-border font-medium'>SUBTOTAAL</th>
            </thead>
            <tbody>
                {data.items.map((item) => {
                    const { product, productPaymentPlan } = item;
                    const { images, title } = product;
                    const media = images[0]?.media
                    return (
                    <tr className="text-lg" key={item.id}>
                        <td className='p-2.5 border-l border-border border-b'>
                            <button onClick={async () => {
 await deleteCartItem.mutateAsync(item.id)
 await handleSuccess()
                            }}>

                        <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                        </td>
                        <td className='p-2.5 border-l border-border border-b'>
                            {media ? <Image src={media.url} alt={title} width={media.width} height={media.height} className="min-w-[66px] w-[66px] h-[66px] object-cover" /> : null}
                        </td>
                        <td className='p-2.5 border-l border-border border-b w-[99%]'>
                            <div className="underline">{product.title}</div>
                            <div className="text-description">Datum:</div>
                            <div className="text-description">{item.productVariant.title}</div>
                        </td>
                        <td className='p-2.5 text-description border-l border-border border-b'>
                            {formatter.format(product.price)}
                        </td>
                        <td className='p-2.5 border-l border-border border-b'>
                            <Counter value={item.quantity} onChange={async (q) => {
                                await updateCartItemQuantity.mutateAsync({ id: item.id, quantity: q })
                                await handleSuccess()
                            }} />
                        </td>
                        <td className='p-2.5 text-description border-l border-border border-b border-r'>
                            {formatter.format(product.price * item.quantity)}
                            {productPaymentPlan ? <div>{`In ${productPaymentPlan.length} ${productPaymentPlan.length > 1 ? "termijnen" : "termijn"} van ${formatter.format(productPaymentPlan.price)}`}</div> : null}
                        </td>

                    </tr>
                )})}
            </tbody>
        </table>
        <Button variant="success" className='ml-auto h-[50px]' href="/afrekenen">Doorgaan naar afrekenen</Button>
        </div> : <p>Winkelmand is leeg</p>}
        <div className="flex md:justify-end mt-16">
            <div>

                            <h4 className='mb-10 text-xl'>Jouw bestelling</h4>
                            <div className="grid grid-cols-[80px_1fr] gap-3 text-description text-lg">

                            <span>Subtotaal</span>
                            <span className='font-medium'>{formatter.format(total)}</span>
                            <span>BTW</span>
                            <span className='font-medium'>{formatter.format(total * 0.21)}</span>
                            <span>Totaal</span>
                            <span className='text-2xl text-[#2ADC84] font-semibold'>{formatter.format(total * 1.21)}</span>
                            </div>
            </div>
        </div>
        </div>
  )
}

export default CartDetails