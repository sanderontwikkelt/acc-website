import { WEB_URL } from '@/lib/constants'
import { routes } from '@/lib/routes'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...Object.entries(routes).map(([route, { updatedAt, priority }]) => ({
      url: `${WEB_URL}/${route}`,
      lastModified: updatedAt,
      priority,
    })),
  ]
}
