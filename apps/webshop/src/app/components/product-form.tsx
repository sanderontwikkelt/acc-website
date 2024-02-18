'use client'

import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@acme/ui';
import Counter from './counter';
import { ProductPaymentPlan, ProductVariant } from '@acme/db';
import { Button } from './button';
import RadioGroupForm from './radio-group';
import { formatter } from '~/lib/utils';
import { api } from 'src/trpc/react';
import { useRouter } from 'next/navigation';

const getFrequency = (frequency: string) => {
    return {
        day: 'day',
        week: 'week',
        month: 'maand',
        year: 'jaar'
    }[frequency] || 'maand'
}

const ProductForm = ({ id, variants, paymentPlans}: { id: number; variants: ProductVariant[]; paymentPlans: ProductPaymentPlan[]}) => {
    const [quantity, setQuantity] = useState(1);
    const [terms, setTerms] = useState(0);
    const [paymentPlan, setPaymentPlan] = useState<number | null>(null);
    const [stock, setStock] = useState(100);
    const [variant, setVariant] = useState<number | null>(null);

    const router = useRouter();

    useEffect(() => {
        setPaymentPlan(terms ? paymentPlans[0].id : null)
    }, [terms, paymentPlans])

    const addCartItem = api.cartItem.createOwn.useMutation();
    const utils = api.useUtils();

    const onSubmit = async () => {
      if (variant) await addCartItem.mutateAsync({
        quantity,
        productId: id,
        productVariantId: variant,
...(terms && { paymentPlanId: paymentPlan }),
      })
        await utils.cart.invalidate();
        router.push("/winkelmand")
    }

  return (
    <div>
       <Select
        onValueChange={(v) => setVariant(+v)}
        value={variant ? String(variant) : undefined}
                          >
                          <SelectTrigger className='mb-7 rounded-none border-main'>
                            <SelectValue placeholder="Selecteer een optie" />
                          </SelectTrigger>
                          <SelectContent className='rounded-none border-main'>
                            {variants?.map(({ id, title, stock: s }) => (
                              <SelectItem key={id} value={String(id)} onClick={() => setStock(s)}>
                                {title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {!!variant && <RadioGroupForm options={[
    { id: 0, name: 'Direct afrekenen', description: 'Reken het gehele bedrag in een keer af' },
    { id: 1, name: 'Betalen in termijnen', description: 'Kies het aantal termijnen' },
                        ]} value={terms} onChange={setTerms} />}
                        {!!terms && <RadioGroupForm noGap options={paymentPlans.map(({ id, frequency, rate, price, length}) => ({ id, name: `${length} ${length > 1 ? "betalingen" : 'betaling'} van ${formatter.format(price)}`, description: `Betaling vindt plaats iedere ${rate}e ${getFrequency(frequency)}` }))} value={paymentPlan} onChange={setPaymentPlan} />}
                        <p className='text-lg underline font-semibold mt-5'>{stock > 0 ? "Op voorraad" : "Volgeboekt"}</p>
                        <div className="flex mt-2 items-center">
                            <Counter max={stock} value={quantity} onChange={setQuantity} />
                            <Button disabled={!(stock > 0) || !variant} className='ml-5 px-10 h-16' variant="success">Inschrijven</Button>
                        </div>
    </div>
  )
}

export default ProductForm