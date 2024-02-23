import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { db, eq, or, schema } from "@acme/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const ids = req.nextUrl.searchParams.get("ids");
    const libraries = await db.query.teacher.findMany({
      with: {
        media: true,
      },
      ...(ids && {
        where: or(...ids.split(",").map((id) => eq(schema.teacher.id, +id))),
      }),
    });

    return NextResponse.json(libraries);
  } catch (error) {
    console.log("[TEACHER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
