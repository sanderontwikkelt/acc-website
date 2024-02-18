import type { Media, Product, ProductPaymentPlan, ProductVariant } from '@acme/db'
import { NextImage } from '@acme/ui';
import React from 'react'
import { setHtml } from '~/lib/setHtml';
import { formatter } from '~/lib/utils';
import ProductForm from './product-form';
import ProductImages from './product-images';

const ProductDetails = ({ product }: { product: Product & {images: Media[]; variants: ProductVariant[]; paymentPlans: ProductPaymentPlan[] } }) => {
    const {images, title, price, description, variants, paymentPlans, id } = product;
  return (
    <div>
        <h3>Details</h3>
        <div className='w-8 h-1 bg-main mb-10' />
        <div className="grid gap-10 md:gap-32 md:grid-cols-2">
<ProductImages images={images} alt={title} />
<div>
    <h3 className='mb-4'>{title}</h3>
    <div className="flex items-end text-[#2ADC84] mb-7">

    <span className='font-semibold text-xl mr-1'>{formatter.format(+price)}</span>
    <span className='text-base'>Excl BTW</span>
    </div>
    <p className='text-md md:text-lg mb-7' {...setHtml(description)} />
    <ProductForm variants={variants} id={id} paymentPlans={paymentPlans} />
</div>
        </div>
    </div>
  )
}

export default ProductDetails