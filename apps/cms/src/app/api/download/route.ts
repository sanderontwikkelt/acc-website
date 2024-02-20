import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  const filename = req.nextUrl.searchParams.get("filename");
  try {
    const response = await fetch(url);

    if (response.ok) {
      return new NextResponse(response.body, {
        headers: {
          ...req.headers,
          "content-disposition": `attachment; filename="${filename}"`,
        },
      });
    }
  } catch (error) {
    console.error("Error proxying file:", error);
    return new NextResponse("Error proxying file", { status: 500 });
  }
}
