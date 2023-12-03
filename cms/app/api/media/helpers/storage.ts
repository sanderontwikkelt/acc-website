import { Storage } from '@google-cloud/storage'

export const storage = new Storage({
  projectId: process.env.GOOGLE_STORAGE_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_STORAGE_EMAIL,
    private_key: (process.env.GOOGLE_STORAGE_PRIVATE_KEY as string).replace(
      /\\n/g,
      '\n'
    ),
  },
})

export const bucketName = 'cms_upload_bucket'
