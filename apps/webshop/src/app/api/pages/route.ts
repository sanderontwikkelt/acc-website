import { NextResponse } from "next/server";

import { and, db, eq, schema } from "@acme/db";

import { prefixPathname } from "~/lib/prefix";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pathname = searchParams.get("pathname");
    const mode = searchParams.get("mode");

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