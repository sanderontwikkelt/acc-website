'use client'

import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@acme/ui';
import Counter from './counter';
import { ProductVariant } from '@acme/db';
import { Button } from './button';

const ProductForm = ({ variants}: { variants: ProductVariant[]}) => {
    const [quantity, setQuantity] = useState(0);
    const [stock, setStock] = useState(100);
    const [variant, setVariant] = useState<number | null>(null);

  return (
    <div>
       <Select
        onValueChange={(v) => setVariant(+v)}
        value={variant ? String(variant) : undefined}
                          >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecteer een optie" />
                          </SelectTrigger>
                          <SelectContent>
                            {variants?.map(({ id, title, stock: s }) => (
                              <SelectItem key={id} value={String(id)} onClick={() => setStock(s)}>
                                {title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {stock > 0 ? "Op voorraad" : "Volgeboekt"}
                        <div className="flex mt-7 items-center">
                            <Counter max={stock} value={quantity} onChange={setQuantity} />
                            <Button disabled={!(stock > 0)} className='ml-5 px-10' variant="success" size="lg">Inschrijven</Button>
                        </div>
    </div>
  )
}

export default ProductForm