"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@acme/ui/button";

import { api } from "~/trpc/react";

const CheckoutButton = () => {
  const { mutateAsync: createCheckoutSession } =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api.stripe as any).createCheckoutSession.useMutation();
  const router = useRouter();
  return (
    <Button
      className="w-full"
      onClick={async () => {
        const { checkoutUrl } = await createCheckoutSession([
          { price: "price_1OUiChFW24dZYh8hfrgx9VSM", quantity: 150 },
        ]);
        if (checkoutUrl) {
          router.push(checkoutUrl as string);
        }
      }}
    >
      Bestelling plaatsen
    </Button>
  );
};

export default CheckoutButton;
