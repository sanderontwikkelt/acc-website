"use server";

import type Mail from "nodemailer/lib/mailer";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

import { env } from "../env";
import { ContactEmail } from "./emails/contact";
import { OrderReceivedEmail } from "./emails/order-received";

const stripHtml = (html: string) => html.replace(/<\/?[^>]+>/gi, "");

interface OrderReceived {
  data?: null;
  name: "order_received";
}

interface Contact {
  data: { name: string; email: string; message: string };
  name: "contact";
}

type Name = OrderReceived | Contact;

interface ToProps {
  name: string;
}

export const sendEmail = async (
  email: ToProps & Name,
  to: string = env.SMTP_EMAIL,
) => {
  let comp;
  let subject;
  if (email.name === "contact") {
    comp = <ContactEmail {...email.data} />;
  } else {
    comp = <OrderReceivedEmail />;
  }
  const html = render(comp, { pretty: true });
  const mailOptions: Mail.Options = {
    from: "no-reply@sockwave.nl",
    to,
    subject,
    text: stripHtml(html),
    html,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: env.SMTP_EMAIL,
          pass: env.SMTP_PASSWORD,
        },
      });
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  return sendMailPromise();
};
