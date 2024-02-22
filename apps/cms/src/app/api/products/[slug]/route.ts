import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";

import { and, db, eq, schema } from "@acme/db";

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const mode = req.nextUrl.searchParams.get("mode")
    const slug = params.slug;
    const product = await db.query.product.findFirst({
      with: {
        variants: true,
        paymentPlans: true,
        images: {
          with: {
            media: true,
          },
        },
      },
      where:
        mode === "builder"
          ? eq(schema.product.slug, slug)
          : and(eq(schema.product.slug, slug)),
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
