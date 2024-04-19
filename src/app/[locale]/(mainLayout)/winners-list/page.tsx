'use client'

import { useEffect, useState } from 'react'

import instance from '@/services/axiosConfig'
import { WinnerList } from '.'

const WinnerListPage = () => {
  const [onFetching, setOnFetching] = useState<boolean>(false)
  const [onLoading, setOnLoading] = useState<boolean>(true)
  const [dataWinnerList, setDataWinnerList] = useState<[]>([])

  const _HandleFetching = async () => {
    try {
      const { data } = await instance.get('/promotion/winners-list', {
        params: { type: 1 }
      })
      setDataWinnerList(data)
    } catch (error) {
      console.log(error)
    } finally {
      setOnFetching(false)
      setOnLoading(false)
    }
  }

  useEffect(() => {
    onFetching && _HandleFetching()
  }, [onFetching])

  useEffect(() => {
    setOnFetching(true)
  }, [])

  return <WinnerList data={dataWinnerList} onFetching={onFetching} onLoading={onLoading} />
}

export default WinnerListPage
