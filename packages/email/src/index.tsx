import type Mail from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";

import { env } from "../env";

export { render } from "@react-email/render";
export * from "./emails";

const stripHtml = (html: string) => html.replace(/<\/?[^>]+>/gi, "");

export const sendEmail = async ({
  subject,
  html,
  to = env.SMTP_EMAIL,
}: {
  subject: string;
  html: string;
  to?: string;
}) => {
  const mailOptions: Mail.Options = {
    from: "noreply@physis.academy",
    to,
    subject,
    text: stripHtml(html),
    html,
  };

  return new Promise<string>((resolve, reject) => {
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
};
