'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { memo } from 'react'

import ImageFallback from '@/components/ImageFallback'
import moment from 'moment'

type TData = {
  dateDrawing: string
  listUserWinners: { bingo: string; id: number; name: string; profilePicture: string; rank: number; user_id: 16 }[]
  time: {
    public_at: number
    round: number
  }
}

type TWinnerList<T> = { data: T[]; onFetching: boolean; onLoading?: boolean }

export const WinnerList = ({ data, onFetching, onLoading }: TWinnerList<TData>) => {
  const t = useTranslations('Promotion.ProtocolsPromotion')
  const td = useTranslations('Promotion.menuPopup')

  const pathName = usePathname()
  const isInvite = pathName.includes('invite')

  const listRank = [
    {
      title: isInvite ? '1 Yamaha PG-1' : '1 Wave RSX F1',
      thumb: isInvite ? '/promotion-images/invite-number1.webp' : '/promotion-images/number1.webp'
    },
    {
      title: t('text16'),
      thumb: '/promotion-images/number2.webp'
    },
    {
      title: t('text20'),
      thumb: '/promotion-images/number3.webp'
    }
  ]

  return (
    <div className='py-[110px] 3xl:py-[120px] bg-[url("/promotion-images/bg.webp")] bg-cover bg-no-repeat bg-center min-h-[90vh]'>
      <div className='ct-container'>
        <h3 className='ct-text-border text-[#FF4343] text-2xl md:text-4xl uppercase text-center font-bold'>{td('text1')}</h3>
        {onFetching || onLoading ? (
          <div className='rounded-[20px] bg-white animate-pulse min-h-[300px] mt-5' />
        ) : (
          <div className='mt-5 flex flex-col gap-5'>
            {!!data.length ? (
              data?.map((item: TData, index: number) => (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + (index + 1) * 0.1 }}
                  key={index}
                  className='rounded-[20px] bg-white p-4 md:p-5 flex flex-col gap-5 min-h-[300px]'
                >
                  <h4 className='text-primary-blue text-2xl font-bold'>
                    {t('text31')} {item?.time?.round} - {t('text32')}{' '}
                    {moment(item?.time?.public_at)
                      .local()
                      .format('DD/MM/YYYY')}
                  </h4>
                  <div className='flex flex-col gap-10'>
                    {item?.listUserWinners?.map((item: any, index: number) => (
                      <div key={index} className='flex flex-col gap-2'>
                        <div className={`flex items-center justify-between ${isInvite ? 'md:grid md:grid-cols-3' : 'xs:grid xs:grid-cols-3'} gap-4 `}>
                          <div className='flex items-center gap-2'>
                            <div>
                              <ImageFallback
                                src={`/promotion-images/rank${item.rank}.png`}
                                alt={`image-${item.rank}`}
                                height={100}
                                width={100}
                                className='h-[70px] w-[60px] pointer-events-none select-none'
                              />
                            </div>
                            <p className='md:text-xl font-normal max-w-none md:max-w-[140px] lg:max-w-none'>{item.name}</p>
                          </div>
                          <div className={`w-full hidden ${isInvite ? 'md:flex' : 'xs:flex'} items-center justify-center`}>
                            <div className='items-center justify-center flex gap-4'>
                              {isInvite ? (
                                item?.bingo?.split('')?.map((item: any, index: number) => (
                                  <div key={index} className='items-center justify-center flex gap-4'>
                                    <p className='size-[40px] bg-[#F8F8F8] flex items-center justify-center rounded-full text-[#405AB7] font-semibold'>
                                      {item}
                                    </p>
                                  </div>
                                ))
                              ) : (
                                <div className='px-4 py-2 border-1 border-primaryYellow rounded-lg flex items-center'>
                                  <p className='text-xl font-semibold'>{item?.bingo}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className='flex items-center gap-2 justify-end'>
                            <p className={`${!isInvite ? 'hidden xs:block' : ''}`}>{listRank[index].title}</p>
                            <div className='hidden lg:block'>
                              <ImageFallback
                                src={listRank[index].thumb}
                                alt={listRank[index].thumb}
                                height={100}
                                width={100}
                                className='w-auto h-auto pointer-events-none object-contain min-h-[80px] min-w-[100px] select-none'
                              />
                            </div>
                          </div>
                        </div>
                        <div className={` flex ${isInvite ? 'justify-center md:hidden' : 'xs:hidden'} items-center gap-4`}>
                          <div className='items-center justify-center flex gap-4'>
                            {isInvite ? (
                              item?.bingo?.split('')?.map((item: any, index: number) => (
                                <div key={index} className='items-center justify-center flex gap-4'>
                                  <p className='size-[40px] bg-[#F8F8F8] flex items-center justify-center rounded-full text-[#405AB7] font-semibold'>{item}</p>
                                </div>
                              ))
                            ) : (
                              <div className='px-4 py-2 border-1 border-primaryYellow rounded-lg flex items-center'>
                                <p className='text-xl font-semibold'>{item?.bingo}</p>
                              </div>
                            )}
                          </div>
                          {!isInvite && (
                            <div className='flex items-center gap-2 justify-end'>
                              <p>{listRank[index].title}</p>
                              <div className='hidden lg:block'>
                                <ImageFallback
                                  src={listRank[index].thumb}
                                  alt=''
                                  height={'72'}
                                  width={'100'}
                                  className='md:max-w-[100px] md:max-h-[80px] pointer-events-none select-none'
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className='flex flex-col items-center gap-5 justify-center mt-10'>
                <ImageFallback
                  className='object-cover pointer-events-none select-none'
                  src={'/promotion-images/updating.png'}
                  alt='updating'
                  height={300}
                  width={300}
                />
                <p className='text-center text-xl font-medium '>{t('text33')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(WinnerList)
