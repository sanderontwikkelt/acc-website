import { NextResponse } from "next/server";

import { db, eq, or, schema } from "@acme/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get("ids");
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
