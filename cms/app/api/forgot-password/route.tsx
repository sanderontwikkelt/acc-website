import { NextResponse } from "next/server"
import { ForgotPasswordEmail } from "@/emails/forgot-password-email"
import { render } from "@react-email/render"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

import prismadb from "@/lib/prismadb"

const stripHtml = (html: string) => html.replace(/<\/?[^>]+>/gi, "")

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { email } = body

    if (!email) {
      return new NextResponse("Email is required", { status: 400 })
    }

    const user = await prismadb.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return new NextResponse("No User found", { status: 400 })
    }

    const token = await bcrypt.genSalt(10)

    await prismadb.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    })

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    const html = render(<ForgotPasswordEmail token={token} />, {
      pretty: true,
    })

    const mailOptions: Mail.Options = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Instructies voor het resetten van uw wachtwoord bij Physis",
      text: stripHtml(html),
      html,
    }

    const sendMailPromise = () =>
      new Promise<string>((resolve, reject) => {
        transport.sendMail(mailOptions, function (err) {
          if (!err) {
            resolve("Email sent")
          } else {
            reject(err.message)
          }
        })
      })

    try {
      await sendMailPromise()
      return NextResponse.json({ message: "Email sent" })
    } catch (err) {
      console.log({ err })
      return NextResponse.json({ error: err }, { status: 500 })
    }
  } catch (error) {
    console.log("[FORGOT_PASSWORD_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
