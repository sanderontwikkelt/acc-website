import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { LoginEmail, render, sendEmail } from "@acme/email";

export async function POST(req: NextRequest) {
  const { url, email } = (await req.json()) as {
    url: string;
    email: string;
  };
  try {
    if (!(url && email)) {
      return NextResponse.json({ error: "INVALID DATA" }, { status: 500 });
    }

    const html = render(<LoginEmail url={url} />, { pretty: true });

    await sendEmail({
      html,
      subject: "Login bij Physis Academy",
      to: email,
    });

    return NextResponse.json({ sent: true });
  } catch (error) {
    console.log("[PAGES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
