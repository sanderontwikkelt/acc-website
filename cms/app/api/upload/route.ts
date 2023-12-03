import { Storage } from '@google-cloud/storage'
import imageSize from 'image-size'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const storage = new Storage({
  projectId: process.env.GOOGLE_STORAGE_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_STORAGE_EMAIL,
    private_key: (process.env.GOOGLE_STORAGE_PRIVATE_KEY as string).replace(
      /\\n/g,
      '\n'
    ),
  },
})

const bucketName = 'cms_upload_bucket' // Replace with the name of your bucket

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return new NextResponse('No file uploaded', { status: 400 })
    }

    const blob = storage
      .bucket(bucketName)
      .file('media/' + uuidv4() + '_' + file.name)
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.type,
      },
    })

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    return await new Promise<NextResponse>((resolve, reject) => {
      blobStream.on('error', (err) => {
        console.error(err)
        resolve(new NextResponse(' Er is iets mis gegaan!', { status: 500 }))
      })

      blobStream.on('finish', async () => {
        const url = `https://storage.googleapis.com/${bucketName}/${blob.name}`

        // Use image-size to get width and height
        const dimensions = imageSize(buffer) // Pass the buffer to imageSize

        const data = {
          filename: file.name,
          size: file.size,
          mimetype: file.type,
          width: dimensions.width || 200,
          height: dimensions.height || 200,
          url,
        }
        resolve(NextResponse.json({ data }))
      })

      blobStream.end(buffer)
    })
  } catch (e) {
    console.error(e)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
