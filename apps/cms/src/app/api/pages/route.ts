import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";

import { and, db, eq, schema } from "@acme/db";

import { prefixPathname } from "~/lib/prefixPathname";

export async function GET(req: NextRequest) {
  try {
    const mode = req.nextUrl.searchParams.get("mode")
    const pathname = req.nextUrl.searchParams.get("pathname")

    const page = await db.query.page.findFirst({
      where:
        mode === "builder"
          ? eq(schema.page.pathname, prefixPathname(pathname))
          : and(
              eq(schema.page.pathname, prefixPathname(pathname)),
              eq(schema.page.concept, 0),
            ),
    });

    return NextResponse.json(page);
  } catch (error) {
    console.log("[PAGE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
