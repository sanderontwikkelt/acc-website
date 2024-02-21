import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";

import { and, db, eq, ne, schema } from "@acme/db";

export async function GET(req: NextRequest,
  { params }: { params: { slug: string } },
    ) {
    try {
      const mode = req.nextUrl.searchParams.get("mode")
    const slug = params.slug;
    const course = await db.query.course.findFirst({
      with: {
        teachers: {
          with: {
            teacher: {
              with: {
                media: true,
              },
            },
          },
        },
        media: true,
      },
      where:
        mode === "builder"
          ? eq(schema.course.slug, slug)
          : and(eq(schema.course.slug, slug), ne(schema.course.concept, true)),
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
