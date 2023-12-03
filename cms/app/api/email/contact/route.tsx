import { uploadFile } from '../../media/helpers/uploadFile'
import Contact from '@/emails/contact'
import prismadb from '@/lib/prismadb'
import { render } from '@react-email/render'
import { type NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

const stripHtml = (html: string) => html.replace(/<\/?[^>]+>/gi, '')

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const token: string | null = data.get('token') as unknown as string

  if (token !== process.env.API_TOKEN) {
    return NextResponse.json({ error: 'INVALID TOKEN' }, { status: 500 })
  }

  const upload: File | null = data.get('upload') as unknown as File
  const hasUpload = !!upload.size

  const firstName: string | null = data.get('firstName') as unknown as string
  const lastName: string | null = data.get('lastName') as unknown as string
  const phoneNumber: string | null = data.get(
    'phoneNumber'
  ) as unknown as string
  const email: string | null = data.get('email') as unknown as string
  const message: string | null = data.get('message') as unknown as string

  const body = { name: `${firstName} ${lastName}`, phoneNumber, email, message }

  const bytes = await upload.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  const html = render(<Contact {...body} />, {
    pretty: true,
  })

  const mailOptions: Mail.Options = {
    from: process.env.SMTP_EMAIL,
    to: process.env.SMTP_EMAIL,
    subject: `Nieuw contactformulier ingezonden van ${process.env.NEXT_PUBLIC_FRONT_URL}`,
    text: stripHtml(html),
    html,
    ...(hasUpload && {
      attachments: [
        {
          filename: upload.name,
          content: buffer,
        },
      ],
    }),
  }

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent')
        } else {
          reject(err.message)
        }
      })
    })

  const store = async () => {
    let fileId = undefined
    if (hasUpload) {
      const uploadData = await uploadFile(upload)

      if (!uploadData) {
        return new NextResponse(
          'Er is iets mis gegaan with the uploaded file',
          {
            status: 400,
          }
        )
      }

      const file = await prismadb.file.create({
        data: uploadData,
      })
      fileId = file.id
    }

    return prismadb.contactEmail.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        email,
        message,
        fileId,
      },
    })
  }

  try {
    await sendMailPromise()
    await store()

    return NextResponse.json({ message: 'Email sent' })
  } catch (err) {
    console.log({ err })
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
