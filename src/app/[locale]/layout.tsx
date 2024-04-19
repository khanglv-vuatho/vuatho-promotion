import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

import { locales } from '@/constants'

import Providers from '@/components/Providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Promotion',
  description: 'Promotion'
}

const timeZone = 'Asia/Ho_Chi_Minh'

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = params

  let messages

  try {
    messages = (await import(`../../../messages/${locale}.json`)).default
  } catch (error) {
    console.log(error)
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ToastContainer />
        <Providers locale={locale}>
          <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
