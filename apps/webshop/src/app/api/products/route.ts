import { NextResponse } from "next/server";

import { db } from "@acme/db";

export async function GET() {
  try {
    const products = await db.query.product.findMany({
      with: {
        category: true,
        images: {
          with: {
            media: true,
          },
        },
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
