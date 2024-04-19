/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { locales } from '@/constants'
import { useGetAllQueryParams } from '@/hooks/useGetAllQueryParams'
import { useLocale } from 'next-intl'
import { redirect, usePathname } from 'next/navigation'
import { useCallback } from 'react'

export const formatMoney = (value: number, isNumber?: boolean) => {
  let formatNumber = value
  if (Number(value) % 1 !== 0) {
    const splitted = String(value)?.split('.')
    formatNumber = splitted[1]?.length > 3 ? Number(`${splitted[0]}.${splitted[1].slice(0, 3)}`) : value
  }
  return isNumber ? formatNumber : formatNumber?.toLocaleString('en') || '0'
}

export const normalizeKeyword = (keyword: string) => {
  return (keyword as string)
    .normalize('NFD')
    .toLowerCase()
    .replace(/[\u0300-\u036f\s]/g, '')
    .replace('đ', 'd')
}

export const handlePathName = () => {
  const pathName = usePathname()
  const locale = useLocale()
  const arr = pathName.split('/')
  const index = arr.indexOf('invite')
  index !== -1 ? arr.splice(index, 1) : arr.splice(arr.indexOf(locale) + 1, 0, 'invite')
  return arr.join('/')
}

export const handleCheckWebView = () => {
  const allQueryParams: any = useGetAllQueryParams()
  const queryString = Object.keys(allQueryParams)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(allQueryParams[key])}`)
    .join('&')

  return queryString !== null ? `?${queryString}` : ''
}

export const mapOrder = (originalArray: any[], orderArray: any[], key: string) => {
  if (!originalArray || !orderArray || !key) return []

  const clonedArray = [...originalArray]
  const orderedArray = clonedArray.sort((a, b) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
  })

  return orderedArray
}

// const isValidLocale = locales.some((cur) => cur === locale)

// if (!isValidLocale) {
//   return redirect(`/vi/${locale}`)
// }
