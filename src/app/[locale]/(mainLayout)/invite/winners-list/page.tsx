'use client'

import { memo, useEffect, useState } from 'react'

import instance from '@/services/axiosConfig'
import { WinnerList } from '../../winners-list'

const WinnerListInvitePage = () => {
  const [onFetching, setOnFetching] = useState<boolean>(false)
  const [onLoading, setOnLoading] = useState<boolean>(true)
  const [dataInviteWinnerList, setDataInviteWinnerList] = useState<[]>([])

  const _HandleFetching = async () => {
    try {
      const { data } = await instance.get('/promotion/winners-list', {
        params: { type: 2 }
      })
      setDataInviteWinnerList(data)
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

  return <WinnerList data={dataInviteWinnerList} onFetching={onFetching} onLoading={onLoading} />
}

export default memo(WinnerListInvitePage)
