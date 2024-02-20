import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { tag, token } = body;

  if (token !== process.env.API_TOKEN) {
    return NextResponse.json({ error: "INVALID TOKEN" }, { status: 500 });
  }

  revalidateTag(tag as string);
  try {
    return NextResponse.json({ revalidated: true });
  } catch (error) {
    console.log("[PAGES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
