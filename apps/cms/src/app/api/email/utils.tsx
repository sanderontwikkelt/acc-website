import type Mail from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";

import { render } from "@acme/transactional";
import VerifyEmailLogin from "@acme/transactional/verify-email-login";

const stripHtml = (html: string) => html.replace(/<\/?[^>]+>/gi, "");

export const sendEmail = async ({
  subject,
  html,
  to = process.env.SMTP_EMAIL,
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
      from: mailOptions.from,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
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

export interface LoginValues {
  type: "login";
  url: string;
}

export const getEmailContent = (values: LoginValues) => {
  switch (values.type) {
    case "login":
      return {
        subject: "Log in bij Physis Academy",
        html: render(<VerifyEmailLogin url={values.url} />),
      };

    default:
      return { subject: null, html: null };
  }
};
