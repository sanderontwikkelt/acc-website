"use client";

import { format } from "date-fns";
import { EntityEnum } from "types/permissions";

import { ListOverview } from "~/components/list-overview";
import { api } from "~/trpc/react";

interface ProductColumn {
  id: number;
  title: string;
  slug: string;
  price: string;
  stock: number;
  createdAt: string;
}

const ProductsPage = () => {
  const [products] = api.product.all.useSuspenseQuery();

  const data = products.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug ?? "",
    price: item.price ?? "",
    stock: item.stock ?? 0,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  const columns = [
    {
      accessorKey: "title",
      header: "Titel",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "price",
      header: "Prijs",
    },
    {
      accessorKey: "stock",
      header: "Voorraad",
    },
    {
      accessorKey: "createdAt",
      header: "Aangemaakt",
    },
  ];

  return (
    <ListOverview<ProductColumn>
      columns={columns}
      data={data}
      entity={EntityEnum.PRODUCT}
      title="Producten"
    />
  );
};

export default ProductsPage;
