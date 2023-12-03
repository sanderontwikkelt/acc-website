/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'storage.googleapis.com',
      'images.unsplash.com',
      'storage.cloud.google.com',
    ],
  },
}

module.exports = nextConfig
