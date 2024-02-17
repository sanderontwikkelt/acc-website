import { NextResponse } from "next/server";

import { and, db, eq, schema } from "@acme/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const mode = searchParams.get("mode");
    const product = await db.query.product.findFirst({
      with: {
        variants: true,
        paymentPlans: true,
        images: {
          with: {
            media: true
          }
        }
      },
      where:
        mode === "builder"
          ? eq(schema.product.slug, slug)
          : and(
              eq(schema.product.slug, slug),
            ),
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
