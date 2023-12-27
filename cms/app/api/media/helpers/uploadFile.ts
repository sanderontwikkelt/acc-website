import { Media } from "@prisma/client"
import imageSize from "image-size"
import { v4 as uuidv4 } from "uuid"

import { bucketName, storage } from "./storage"

export const config = {
  api: {
    bodyParser: false,
  },
}

export const uploadFile = async (file: File) => {
  try {
    const filepath = "media/physis/" + uuidv4() + "_" + file.name
    const blob = storage.bucket(bucketName).file(filepath)
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.type,
      },
    })

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    return await new Promise<Media | null>((resolve, reject) => {
      blobStream.on("error", (err) => {
        console.error(err)
        resolve(null)
      })

      blobStream.on("finish", async () => {
        const url = `https://storage.googleapis.com/${bucketName}/${blob.name}`
        let dimensions: { width?: number; height?: number } = {
          width: 200,
          height: 200,
        } // Default dimensions

        // Check if the file is an image or a video based on its MIME type
        if (file.type.startsWith("image/")) {
          // Use image-size to get dimensions for images
          dimensions = imageSize(buffer)
        }

        const data = {
          filename: file.name,
          size: file.size,
          mimetype: file.type,
          width: dimensions.width,
          height: dimensions.height,
          url,
          filepath,
        } as Media
        resolve(data)
      })

      blobStream.end(buffer)
    })
  } catch (e) {
    console.error(e)
    return null
  }
}
