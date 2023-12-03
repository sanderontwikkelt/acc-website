import content from '@/components/blocks/content'
import hero from '@/components/blocks/hero'
import heading from '@/components/blocks/heading'
import contentImages from '@/components/blocks/contentImages'
import testimonials from '@/components/blocks/testimonials'
import ctaContent from '@/components/blocks/cta-content'
import textColumns from '@/components/blocks/text-columns'
import accordion from '@/components/blocks/accordion'
import card from '@/components/blocks/card'
import images from '@/components/blocks/images'
import videoIframe from '@/components/blocks/video-iframe'
import googleMap from '@/components/blocks/google-map'

export interface Block {
  fields: any
  name:
    | 'hero'
    | 'content'
    | 'banner'
    | 'accordion'
    | 'article'
    | 'steps'
    | 'heading'
    | 'slideContent'
    | 'slider'
    | 'links'
    | 'images'
    | 'service'
    | 'contact'
    | 'dashes'
  style?: any
  innerStyle?: any
  id: string
  uid: string
  label: string
}

export const blocks = {
  hero,
  content,
  heading,
  contentImages,
  testimonials,
  ctaContent,
  accordion,
  card,
  textColumns,
  images,
  videoIframe,
  googleMap,
}
