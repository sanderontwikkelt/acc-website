import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getEmailContent, sendEmail } from "./utils";

export async function POST(req: NextRequest) {
  const { url, email } = (await req.json()) as {
    url: string;
    email: string;
  };
  try {
    if (!(url && email)) {
      return NextResponse.json({ error: "INVALID DATA" }, { status: 500 });
    }

    const { html, subject } = getEmailContent({ type: "login", url });

    if (!(subject && html)) {
      return NextResponse.json({ error: "INVALID DATA" }, { status: 500 });
    }

    await sendEmail({
      html,
      subject,
      to: email,
    });

    return NextResponse.json({ sent: true });
  } catch (error) {
    console.log("[PAGES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
