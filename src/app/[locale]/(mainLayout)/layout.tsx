import type { Metadata } from 'next'

import { PromotionsFooter, PromotionsHeader } from '..'

export const metadata: Metadata = {
  title: 'Promotion',
  description: 'Promotion'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PromotionsHeader />
      {children}
      <PromotionsFooter />
    </>
  )
}
