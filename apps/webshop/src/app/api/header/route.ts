import { NextResponse } from "next/server";

import { db } from "@acme/db";

export async function GET() {
  try {
    const header = await db.query.header.findFirst();

    return NextResponse.json(header);
  } catch (error) {
    console.log("[HEADER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
