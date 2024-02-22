export const dynamic = 'force-dynamic'

import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";

import { db, eq, or, schema } from "@acme/db";

export async function GET(req: NextRequest) {
  try {
    const ids = req.nextUrl.searchParams.get("ids")
    if (ids === "") return NextResponse.json([]);
    const libraries = await db.query.course.findMany({
      with: {
        media: true,
      },
      ...(ids && {
        where: or(...ids.split(",").map((id) => eq(schema.course.id, +id))),
      }),
    });

    return NextResponse.json(libraries);
  } catch (error) {
    console.log("[COURSE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
