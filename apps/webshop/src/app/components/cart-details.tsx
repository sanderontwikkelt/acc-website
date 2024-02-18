"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { api } from "src/trpc/react";

import { formatter } from "~/lib/utils";
import { Button } from "./button";
import Counter from "./counter";

const CartDetails = () => {
  const deleteCartItem = api.cartItem.delete.useMutation();
  const updateCartItemQuantity = api.cartItem.updateCount.useMutation();
  const utils = api.useUtils();

  const handleSuccess = async () => {
    await utils.cart.invalidate();
  };

  const { data, isLoading } = api.cart.own.useQuery();

  const total = useMemo(() => {
    return (
      data?.items.reduce((a, i) => a + i.product.price * i.quantity, 0) || 0
    );
  }, [data]);

  return (
    <div>
      <h1 className="text-4xl">Inschrijven</h1>
      <div className="bg-main mb-10 h-1 w-8" />
      {isLoading ? null : data.items?.length ? (
        <div className="flex flex-col space-y-6">
          <table>
            <thead className="text-sm">
              <th
                className="border border-r-0 border-border px-2.5 py-3 text-start "
                colSpan={2}
              />
              <th className="border-b border-t border-border px-2.5 py-3 text-start font-medium">
                PRODUCT
              </th>
              <th className="border-b border-t border-border px-2.5 py-3 text-start font-medium">
                PRIJS
              </th>
              <th className="border-b border-t border-border px-2.5 py-3 text-start font-medium">
                AANTAL
              </th>
              <th className="border border-l-0 border-border px-2.5 py-3 text-start font-medium">
                SUBTOTAAL
              </th>
            </thead>
            <tbody>
              {data.items.map((item) => {
                const { product, productPaymentPlan } = item;
                const { images, title } = product;
                const media = images[0]?.media;
                return (
                  <tr className="text-lg" key={item.id}>
                    <td className="border-b border-l border-border p-2.5">
                      <button
                        onClick={async () => {
                          await deleteCartItem.mutateAsync(item.id);
                          await handleSuccess();
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </button>
                    </td>
                    <td className="border-b border-l border-border p-2.5">
                      {media ? (
                        <Image
                          src={media.url}
                          alt={title}
                          width={media.width}
                          height={media.height}
                          className="h-[66px] w-[66px] min-w-[66px] object-cover"
                        />
                      ) : null}
                    </td>
                    <td className="w-[99%] border-b border-l border-border p-2.5">
                      <div className="underline">{product.title}</div>
                      <div className="text-description">Datum:</div>
                      <div className="text-description">
                        {item.productVariant.title}
                      </div>
                    </td>
                    <td className="text-description border-b border-l border-border p-2.5">
                      {formatter.format(product.price)}
                    </td>
                    <td className="border-b border-l border-border p-2.5">
                      <Counter
                        value={item.quantity}
                        onChange={async (q) => {
                          await updateCartItemQuantity.mutateAsync({
                            id: item.id,
                            quantity: q,
                          });
                          await handleSuccess();
                        }}
                      />
                    </td>
                    <td className="text-description border-b border-l border-r border-border p-2.5">
                      {formatter.format(product.price * item.quantity)}
                      {productPaymentPlan ? (
                        <div>{`In ${productPaymentPlan.length} ${productPaymentPlan.length > 1 ? "termijnen" : "termijn"} van ${formatter.format(productPaymentPlan.price)}`}</div>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Button
            variant="success"
            className="ml-auto h-[50px]"
            href="/afrekenen"
          >
            Doorgaan naar afrekenen
          </Button>
        </div>
      ) : (
        <p>Winkelmand is leeg</p>
      )}
      <div className="mt-16 flex md:justify-end">
        <div>
          <h4 className="mb-10 text-xl">Jouw bestelling</h4>
          <div className="text-description grid grid-cols-[80px_1fr] gap-3 text-lg">
            <span>Subtotaal</span>
            <span className="font-medium">{formatter.format(total)}</span>
            <span>BTW</span>
            <span className="font-medium">
              {formatter.format(total * 0.21)}
            </span>
            <span>Totaal</span>
            <span className="text-2xl font-semibold text-[#2ADC84]">
              {formatter.format(total * 1.21)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
