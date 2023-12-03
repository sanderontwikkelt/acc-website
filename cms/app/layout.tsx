import { Providers } from '@/components/provider'
import { ModalProvider } from '@/providers/modal-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { Inter } from 'next/font/google'
import '../app/globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Physis Admin',
  description: 'Physis Admin',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='nl'
      suppressHydrationWarning
      className='relative overflow-hidden scroll-smooth'
    >
      <body className={cn('relative overflow-hidden', inter.className)}>
        <Providers>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ToastProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
