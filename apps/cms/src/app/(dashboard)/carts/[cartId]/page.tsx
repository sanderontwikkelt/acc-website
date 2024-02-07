"use client";

import React from "react";
import { notFound, useParams } from "next/navigation";
import { ClipboardList } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Heading } from "~/components/ui/heading";
import { api } from "~/trpc/react";

const CartDetailPage = () => {
  const { cartId } = useParams();
  const isDetails = !!(cartId && cartId !== "new");

  const { data: cart, isLoading } = api.cart.byId.useQuery({
    id: isDetails ? +cartId : 0,
  });

  if (!isDetails || (isDetails && !isLoading && !cart)) notFound();

  return (
    <>
      <Heading
        title={`Winkelwagen van ${cart.user.name}`}
        description="Bekijk winkelwagen gegevens"
      ></Heading>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ClipboardList className="mr-2 w-5" />
            Algemene informatie
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2"></CardContent>
      </Card>
    </>
  );
};

export default CartDetailPage;
