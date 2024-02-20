import { NextResponse } from "next/server";

import { db, eq, schema } from "@acme/db";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const slug = params.slug;
    const library = await db.query.library.findFirst({
      with: {
        category: true,
        media: true,
      },
      where: eq(schema.library.slug, slug),
    });

    return NextResponse.json(library);
  } catch (error) {
    console.log("[LIBRARY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
