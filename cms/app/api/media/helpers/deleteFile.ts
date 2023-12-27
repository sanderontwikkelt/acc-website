import { NextResponse } from "next/server"

import { bucketName, storage } from "./storage"

export const config = {
  api: {
    bodyParser: false,
  },
}

export const deleteFile = async (filePath: string) => {
  try {
    const file = storage.bucket(bucketName).file(filePath)

    // Check if the file exists
    const [exists] = await file.exists()

    if (!exists) {
      console.error("File not found")
      return new NextResponse("File not found", { status: 404 })
    }

    // Verwijderen the file
    await file.delete()

    console.log("File deleted successfully")
    return new NextResponse("File deleted successfully", { status: 200 })
  } catch (e) {
    console.error("Error deleting file:", e)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
