"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { api } from "src/trpc/react";

import { ProductPaymentPlan, ProductVariant } from "@acme/db";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui";

import { formatter } from "~/lib/utils";
import { Button } from "./button";
import Counter from "./counter";
import RadioGroupForm from "./radio-group";

const getFrequency = (frequency: string) => {
  return (
    {
      day: "day",
      week: "week",
      month: "maand",
      year: "jaar",
    }[frequency] || "maand"
  );
};

const ProductForm = ({
  id,
  variants,
  paymentPlans,
}: {
  id: number;
  variants: ProductVariant[];
  paymentPlans: ProductPaymentPlan[];
}) => {
  const [quantity, setQuantity] = useState(1);
  const [terms, setTerms] = useState(0);
  const [paymentPlan, setPaymentPlan] = useState<number | null>(null);
  const [stock, setStock] = useState(100);
  const [variant, setVariant] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    setPaymentPlan(terms ? paymentPlans[0].id : null);
  }, [terms, paymentPlans]);

  const addCartItem = api.cartItem.createOwn.useMutation();
  const utils = api.useUtils();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!variant) return null;
    await addCartItem.mutateAsync({
      quantity,
      productId: id,
      productVariantId: variant,
      ...(terms && { paymentPlanId: paymentPlan }),
    });
    await utils.cart.invalidate();
    router.push("/winkelmand");
  };

  return (
    <form onSubmit={onSubmit}>
      <Select
        onValueChange={(v) => setVariant(+v)}
        required
        value={variant ? String(variant) : undefined}
      >
        <SelectTrigger className="border-main mb-7 rounded-none">
          <SelectValue placeholder="Selecteer een optie" />
        </SelectTrigger>
        <SelectContent className="border-main rounded-none">
          {variants?.map(({ id, title, stock: s }) => (
            <SelectItem key={id} value={String(id)} onClick={() => setStock(s)}>
              {title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {!!variant && (
        <RadioGroupForm
          options={[
            {
              id: 0,
              name: "Direct afrekenen",
              description: "Reken het gehele bedrag in een keer af",
            },
            {
              id: 1,
              name: "Betalen in termijnen",
              description: "Kies het aantal termijnen",
            },
          ]}
          value={terms}
          onChange={setTerms}
        />
      )}
      {!!terms && (
        <RadioGroupForm
          noGap
          options={paymentPlans.map(
            ({ id, frequency, rate, price, length }) => ({
              id,
              name: `${length} ${length > 1 ? "betalingen" : "betaling"} van ${formatter.format(price)}`,
              description: `Betaling vindt plaats iedere ${rate}e ${getFrequency(frequency)}`,
            }),
          )}
          value={paymentPlan}
          onChange={setPaymentPlan}
        />
      )}
      <p className="mt-5 text-lg font-semibold underline">
        {stock > 0 ? "Op voorraad" : "Volgeboekt"}
      </p>
      <div className="mt-2 flex items-center">
        <Counter max={stock} value={quantity} onChange={setQuantity} />
        <Button
          disabled={!(stock > 0) || !variant}
          className="ml-5 h-16 px-10"
          type="submit"
          onClick={onSubmit}
          variant="success"
        >
          Inschrijven
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
