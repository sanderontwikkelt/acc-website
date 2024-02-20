import { NextResponse } from "next/server";
import { PaymentStatus } from "@mollie/api-client";

import { db, eq, schema } from "@acme/db";
import { getPayment, validateToken } from "@acme/mollie";

export async function POST(
  req: Request,
  { params }: { params: { token: string } },
) {
  try {
    if (!validateToken(params.token)) {
      return NextResponse.json(
        {
          message: "wrong token",
          ok: false,
        },
        { status: 500 },
      );
    }
    const body = await req.text();
    const id = body.split("=")[1];

    const updateStatus = (status: string, paidAt?: Date) => {
      return db
        .update(schema.orderPayment)
        .set({ status, paidAt })
        .where(eq(schema.orderPayment.paymentId, id));
    };

    const payment = await getPayment(id);

    switch (payment.status) {
      case PaymentStatus.failed:
        await updateStatus("failed");
        break;
      case PaymentStatus.canceled:
        await updateStatus("canceled");
        break;
      case PaymentStatus.expired:
        //   await updateStatus('expired');
        break;
      case PaymentStatus.paid:
        await updateStatus("paid", new Date());
        break;
      default:
        console.log("Unhandled payment status:", payment.status);
        break;
    }
    console.info({ payment });
    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 },
    );
  }
}
