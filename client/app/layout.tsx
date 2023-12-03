import { cn } from '@/lib/cn'
import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { WEB_URL } from '@/lib/constants'
import GoogleAnalytics from './GoogleAnalytics'
import { RouteChangeListener } from './route-change-listener'

process.env.NODE_NO_WARNINGS = 'stream/web'

const helvetica = localFont({
  src: [
    {
      path: './fonts/Helvetica-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Helvetica-Bold.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: './fonts/Helvetica.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Helvetica.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
})

export const metadata: Metadata = {
  metadataBase: new URL(WEB_URL),
  title:
    'Physis: Verantwoorde Nederlandse Kledingproductie | Ervaren Atelier & Vakmanschap',
  description:
    'Geproduceerd in Nederland met vakmensen met een vluchtelingenachtergrond. Ontdek onze transparante aanpak in de fashion industry, unieke kledinglijnen en diensten zoals het maken van samples en productie. Samen voor een positieve impact op klimaat, mens en economie.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='scroll-smooth'>
      <RouteChangeListener />
      <body
        className={cn(
          helvetica.className,
          'w-full overflow-x-hidden bg-white text-main'
        )}
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
