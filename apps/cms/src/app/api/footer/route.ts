import { NextResponse } from "next/server";

import { db } from "@acme/db";

export async function GET() {
  try {
    const footer = await db.query.footer.findFirst();

    return NextResponse.json(footer);
  } catch (error) {
    console.log("[FOOTER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
