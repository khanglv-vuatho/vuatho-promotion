'use client'

import { locales } from '@/constants'
import store from '@/store'
import { Provider } from 'react-redux'
import { redirect } from 'next/navigation'

function Providers({ children, locale }: { children: React.ReactNode; locale: string }) {
  const isValidLocale = locales.some((cur) => cur === locale)

  if (!isValidLocale) {
    return redirect(`/vi/${locale}`)
  }
  return <Provider store={store}>{children}</Provider>
}

export default Providers
