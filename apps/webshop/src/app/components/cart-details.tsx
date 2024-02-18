'use client'

import Image from 'next/image';
import React from 'react'
import { api } from 'src/trpc/react';
import Counter from './counter';
import { formatter } from '~/lib/utils';
import { Button } from './button';
import { useRouter } from 'next/navigation';

const CartDetails = () => {
    const deleteCartItem = api.cartItem.delete.useMutation();
    const updateCartItemQuantity = api.cartItem.updateCount.useMutation();
    const utils = api.useUtils();

    const router = useRouter();

    const handleSuccess = async () => {
        await utils.cart.invalidate();
    }

  const { data, isLoading } = api.cart.own.useQuery();
  console.log(data)

  return (
    <div>
        <h3>Inschrijven</h3>
        <div className='w-8 h-1 bg-main mb-10' />
        {isLoading ? null : data.items?.length ? <div className='space-y-6 flex flex-col'><table>
            <thead className='text-sm'>
                <th className='py-3 px-2.5' colSpan={2} />
                <th className='py-3 px-2.5'>PRODUCT</th>
                <th className='py-3 px-2.5'>PRIJS</th>
                <th className='py-3 px-2.5'>AANTAL</th>
                <th className='py-3 px-2.5'>SUBTOTAAL</th>
            </thead>
            <tbody>
                {data.items.map((item) => {
                    const { product, productPaymentPlan } = item;
                    const { images, title } = product;
                    const media = images[0]?.media
                    return (
                    <tr className="text-lg" key={item.id}>
                        <td className='p-2.5'>
                            <button onClick={async () => {
 await deleteCartItem.mutateAsync(item.id)
 await handleSuccess()
                            }}>

                        <svg xmlns="http://www.w3.org/2000/svg" className='w-3 h-3' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                        </td>
                        <td className='p-2.5'>
                            {media ? <Image src={media.url} alt={title} width={media.width} height={media.height} className="w-[66px] h-[66px] object-cover" /> : null}
                        </td>
                        <td className='p-2.5'>
                            <div className="underline">{product.title}</div>
                            <div className="text-description">Datum:</div>
                            <div className="text-description">{item.productVariant.title}</div>
                        </td>
                        <td className='p-2.5 text-description'>
                            {formatter.format(product.price)}
                        </td>
                        <td className='p-2.5'>
                            <Counter value={item.quantity} onChange={async (q) => {
                                await updateCartItemQuantity.mutateAsync({ id: item.id, quantity: q })
                                await handleSuccess()
                            }} />
                        </td>
                        <td className='p-2.5 text-description'>
                            {formatter.format(product.price * item.quantity)}
                            {productPaymentPlan ? <div>{`In ${productPaymentPlan.length} ${productPaymentPlan.length > 1 ? "termijnen" : "termijn"} van ${formatter.format(productPaymentPlan.price)}`}</div> : null}
                        </td>

                    </tr>
                )})}
            </tbody>
        </table>
        <Button variant="success" className='ml-auto h-[50px]' onClick={() => router.push("/afrekenen")}>Doorgaan naar afrekenen</Button>
        </div> : <p>Winkelmand is leeg</p>}
        </div>
  )
}

export default CartDetails