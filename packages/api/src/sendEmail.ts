/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.EMAIL_API_KEY,
});

interface RecipientType {
  name: string;
  email: string;
}

const sentFrom = new Sender("noreply@physis.academy", "Physis Academy");

const stripHtml = (html: string) => html.replace(/<\/?[^>]+>/gi, "");

export const sendEmail = async ({
  subject,
  html,
  recipients,
}: {
  subject: string;
  html: string;
  recipients: RecipientType[];
}) => {
  try {
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients.map(({ email, name }) => new Recipient(email, name)))
      .setReplyTo(sentFrom)
      .setSubject(subject)
      .setHtml(html)
      .setText(stripHtml(html));

    const response = await mailerSend.email.send(emailParams);
    console.log({ response });
  } catch (error) {
    console.error({ error });
  }
};

export default sendEmail;
