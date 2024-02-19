import { NextResponse } from "next/server";
import { createMollieClient, PaymentStatus } from "@mollie/api-client";

import { db, eq, schema } from "@acme/db";

const MOLLIE_API_KEY = process.env.MOLLIE_API_KEY;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const id = body.split("=")[1];

    const updateStatus = (status: string, paidAt?: Date) => {
      return db
        .update(schema.orderPayment)
        .set({ status, paidAt })
        .where(eq(schema.orderPayment.paymentId, id));
    };

    const mollieClient = createMollieClient({ apiKey: MOLLIE_API_KEY });
    const payment = await mollieClient.payments.get(id);

    switch (payment.status) {
      case PaymentStatus.failed:
        // Update database for failed payment
        await updateStatus("failed");
        break;
      case PaymentStatus.canceled:
        // Update database for cancelled payment
        await updateStatus("canceled");
        break;
      case PaymentStatus.expired:
        // Update database for expired payment
        //   await updateStatus('expired');
        break;
      case PaymentStatus.paid:
        // Update database for successful payment
        await updateStatus("paid", new Date());
        break;
      default:
        // Handle any other status
        console.log("Unhandled payment status:", payment.status);
        break;
    }
    console.info({ payment });
    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 },
    );
  }
}
