'use client'

import ImageFallback from '@/components/ImageFallback'
import TabsCustom from '@/components/TabsCustom'
import { ArrowLeft2, Crown, MessageQuestion } from 'iconsax-react'
import React, { useState } from 'react'

import './promotion.css'
import DropDownMenu from '@/components/Dropdown'
import { ButtonIcon } from '@/components/Button'
import { mapOrder } from '@/utils'
import { useTranslations } from 'next-intl'
import { Avatar } from '@nextui-org/react'

type TWinner<> = { title: string; thumb: string; worker?: number; rank: number; isMe?: boolean }
const ProtionPage = () => {
  const t = useTranslations('Promotion.Hero')
  const tp = useTranslations('Promotion.ProtocolsPromotion')
  const trh = useTranslations('Promotion.PromotionsHeader.RightHeader')
  const t100 = useTranslations('Promotion100')
  const tm = useTranslations('Promotion.menuPopup')

  const [isOpen, setIsOpen] = useState(false)
  const handleBackToApp = () => {}
  const handleOpenRule = () => {
    setIsOpen(!isOpen)
  }

  const TOTAL_PRIZE: number = 3

  const listWinnerJoin: TListWinnerJoin[] = [
    {
      turn: 1,
      listWinners: [
        {
          rank: 1,
          thumb: '/promotion/lottery.png',
          title: 'Lâm Hoài Bảo',
          titlePrize: tp('text18'),
          listBingo: [41, 21, 44]
        },
        {
          rank: 2,
          thumb: '/promotion/lottery.png',
          title: 'Lâm Hoài Bảo',
          titlePrize: tp('text16'),
          listBingo: [12, 24, 44]
        },
        {
          rank: 3,
          thumb: '/promotion/lottery.png',
          title: 'Lâm Hoài Bảo',
          titlePrize: tp('text20'),
          listBingo: [11, 23, 42]
        }
      ]
    }
  ]

  const listWinner100: TListWinnerJoin[] = [
    {
      turn: 1,
      listWinners: [
        {
          rank: 1,
          thumb: '/promotion/lottery.png',
          title: 'Lâm Hoài Bảo',
          titlePrize: tp('text18-1'),
          listBingo: [41, 21, 44, 23, 41, 32]
        },
        {
          rank: 2,
          thumb: '/promotion/lottery.png',
          title: 'Lâm Hoài Bảo',
          titlePrize: tp('text16'),
          listBingo: [12, 24, 44, 23, 41, 23]
        },
        {
          rank: 3,
          thumb: '/promotion/lottery.png',
          title: 'Lâm Hoài Bảo',
          titlePrize: tp('text20'),
          listBingo: [11, 23, 42, 32, 12, 12]
        }
      ]
    }
  ]

  const listRankSmall: TWinner[] = [
    { title: 'Trần Tấn 1', thumb: '/promotion/join.png', worker: 12, rank: 1 },
    { title: 'Trần Tấn 2', thumb: '/promotion/join.png', worker: 12, rank: 2 },
    { title: 'Trần Tấn 3', thumb: '/promotion/join.png', worker: 12, rank: 3 },
    { title: 'Trần Tấn 4', thumb: '/promotion/join.png', worker: 12, rank: 4 },
    { title: 'Trần Tấn 5', thumb: '/promotion/join.png', worker: 12, rank: 5 },
    { title: 'Trần Tấn 6', thumb: '/promotion/join.png', worker: 12, rank: 6 },
    { title: 'Trần Tấn 7', thumb: '/promotion/join.png', worker: 12, rank: 7 },
    { title: 'Trần Tấn 8', thumb: '/promotion/join.png', worker: 12, rank: 8 },
    { title: 'Trần Tấn 9', thumb: '/promotion/join.png', worker: 12, rank: 9, isMe: true },
    { title: 'Trần Tấn 10', thumb: '/promotion/join.png', worker: 12, rank: 10 },
    { title: 'Trần Tấn 11', thumb: '/promotion/join.png', worker: 12, rank: 11 },
    { title: 'Trần Tấn 12', thumb: '/promotion/join.png', worker: 12, rank: 12 },
    { title: 'Trần Tấn 13', thumb: '/promotion/join.png', worker: 12, rank: 13 },
    { title: 'Trần Tấn 14', thumb: '/promotion/join.png', worker: 12, rank: 14 },
    { title: 'Trần Tấn 15', thumb: '/promotion/join.png', worker: 12, rank: 15 },
    { title: 'Trần Tấn 16', thumb: '/promotion/join.png', worker: 12, rank: 17 }
  ]

  const listTabs100days = [
    {
      title: t100('text1'),
      children: (
        <TabsChildrenItem
          title={t100('title')}
          description={t100('text2')}
          body={
            <div className='rounded-2xl'>
              <ImageFallback src={'/promotion-images/hero1.webp'} alt='hero1' height={250} width={400} className='object-contain size-full' />
            </div>
          }
        />
      )
    },
    {
      title: t100('text3'),
      children: (
        <TabsChildrenItem
          title={t100('title')}
          description={t100('text2')}
          body={
            <div className='flex flex-col gap-4'>
              <div className='grid grid-cols-3 gap-4'>
                {mapOrder(listRankSmall, [2, 1, 3], 'rank').map((item) => {
                  if (item.rank > TOTAL_PRIZE) return
                  return (
                    <div className={`flex flex-col items-center justify-end gap-1`} key={item.title}>
                      <div className='flex flex-col gap-2'>
                        <div className={`flex items-center flex-col gap-2 ${item.rank === 1 ? 'gap-3' : 'gap-2'}`}>
                          {item.rank === 1 ? (
                            <Crown variant='Bold' className='text-primary-yellow min-w-8 min-h-8 flex flex-shrink-0' />
                          ) : (
                            <div className='rounded-full size-6 flex items-center justify-center bg-primary-yellow text-black font-bold text-sm'>
                              <p>{item.rank}</p>
                            </div>
                          )}
                          <Avatar src={item.thumb} alt={item.thumb} size={item.rank === 1 ? 'lg' : 'md'} className='object-contain' />
                        </div>
                        <p className='text-sm'>{item.title}</p>
                      </div>
                      <p className='text-sm font-bold'>{item.worker}</p>
                    </div>
                  )
                })}
              </div>
              {listRankSmall.map((item) => {
                if (item.rank <= TOTAL_PRIZE) return
                return (
                  <div
                    key={item.title}
                    className={`p-4  flex justify-between items-center ${item.isMe ? 'bg-white text-black font-bold ' : 'bg-white/5 text-white'} rounded-[4px]`}
                  >
                    <div className='flex items-center gap-2'>
                      <span>{item.rank}</span>
                      <Avatar src={item.thumb} />
                      <p className='!font-light'>{item.isMe ? t100('you') : item.title}</p>
                    </div>
                    <div className='font-bold'>
                      {item.worker} {t100('worker')}
                    </div>
                  </div>
                )
              })}
            </div>
          }
        />
      )
    }
  ]

  const listTabsJoin = [
    {
      title: t100('text4'),
      children: (
        <TabsChildrenItem
          title={t('text1') + '-' + t('text2')}
          description={t('text3')}
          body={
            <ItemTabsBody
              code={696}
              title={t100('text5')}
              titleResult={t100('text6')}
              whenStart={t100('text7')}
              thumb={'/promotion/join.png'}
              bodyContent={
                <div className='flex flex-col gap-2'>
                  {[tp('text17'), tp('text15'), tp('text19')].map((item) => (
                    <div key={item} className='grid grid-cols-2 items-center gap-2'>
                      <p>{item}</p>
                      <div className='grid grid-cols-3 gap-2 items-center justify-center'>
                        {Array(3)
                          .fill(null)
                          .map((_, i) => (
                            <div className='border-1 size-[45px] rounded-lg flex items-center justify-center aspect-square' key={i}>
                              <span className='font-bold scale-150'>?</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              }
            />
          }
        />
      )
    },
    {
      title: tm('text1'),
      children: <TabsChildrenItem title={t('text1') + '-' + t('text2')} body={<TabsPrize listWinner={listWinnerJoin} />} />
    }
  ]
  const listTabsLottery = [
    {
      title: t100('text8'),
      children: (
        <TabsChildrenItem
          title={t('text1-1') + ' - ' + t('text2-1')}
          description={t('text7')}
          body={
            <ItemTabsBody
              code={696}
              title={t100('text5')}
              titleResult={t100('text6')}
              whenStart={t100('text7')}
              thumb={'/promotion/lottery.png'}
              bodyContent={
                <div className='flex flex-col gap-2'>
                  <div className='grid grid-cols-6 gap-2 items-center justify-center'>
                    {Array(6)
                      .fill(null)
                      .map((_, i) => (
                        <div className='border-1 size-[45px] rounded-lg flex items-center justify-center aspect-square' key={i}>
                          <span className='font-bold scale-150'>??</span>
                        </div>
                      ))}
                  </div>
                </div>
              }
            />
          }
        />
      )
    },
    {
      title: tm('text1'),
      children: <TabsChildrenItem title={t('text1-1') + '- ' + t('text8')} body={<TabsPrize listWinner={listWinner100} />} />
    }
  ]

  return (
    <div className='bg-primary-blue pb-20'>
      <div className='ct-container text-white'>
        <header className='sticky top-0 z-50 bg-primary-blue flex items-center justify-between py-2'>
          <span onClick={handleBackToApp} className='cursor-pointer p-2'>
            <ArrowLeft2 size={24} />
          </span>
          <p>{trh('text3')}</p>
          <span onClick={handleOpenRule} className='cursor-pointer p-2'>
            <MessageQuestion size={24} />
          </span>
        </header>
        <main className='flex flex-col gap-20'>
          <div className='min-h-[400px]'>
            <TabsCustom listTabs={listTabs100days} />
          </div>
          <div className='min-h-[400px]'>
            <TabsCustom listTabs={listTabsJoin} />
          </div>
          <div className='min-h-[400px]'>
            <TabsCustom listTabs={listTabsLottery} />
          </div>
        </main>
      </div>
      <DropDownMenu isOpen={isOpen} direction='right' className='bg-white'>
        <div className='flex flex-col gap-2 h-dvh overflow-auto w-full pb-10'>
          <div className='p-2 flex justify-start bg-white sticky top-0 z-50'>
            <div className='flex items-center gap-2'>
              <ButtonIcon onPress={handleOpenRule}>
                <ArrowLeft2 />
              </ButtonIcon>
              <p className='font-bold'>{t('text9')}</p>
            </div>
          </div>
          <div className='ct-container flex flex-col gap-20'>
            <RuleGame100 />
            <RuleInvite />
            <RuleInvite type='100' />
          </div>
        </div>
      </DropDownMenu>
    </div>
  )
}

type TTabsChildrenItem = {
  title: string
  description?: string
  body: React.ReactNode
}

const TabsChildrenItem = ({ title, description, body }: TTabsChildrenItem) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2 items-center'>
        <h1 className='text-primary-yellow uppercase font-bold text-2xl text-center'>{title}</h1>
        {description && <p className='text-sm text-center'>{description}</p>}
      </div>
      {body}
    </div>
  )
}

type TItemTabsBody = {
  thumb: string
  title: string
  code: number
  titleResult: string
  whenStart: string
  bodyContent: React.ReactNode
}
const ItemTabsBody = ({ title, code, titleResult, whenStart, thumb, bodyContent }: TItemTabsBody) => {
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <ImageFallback src={thumb} alt='join' height={500} width={800} className='object-contain size-full' />
      </div>
      <div className='rounded-lg bg-white p-2 flex flex-col gap-2 items-center'>
        <p className='text-sm text-black'>{title}</p>
        <p className='text-primary-blue text-2xl font-bold'>{code}</p>
      </div>
      <div className='p-4 bg-white/5 flex flex-col gap-4 rounded-2xl'>
        <div className='flex flex-col gap-2 items-center text-sm'>
          <p className='text-primary-yellow font-bold'>{titleResult} 2</p>
          <p>{whenStart}: ??:??:??</p>
        </div>
        {bodyContent}
      </div>
    </div>
  )
}

type TListWinners = TWinner & { titlePrize: string; listBingo: number[] }

type TListWinnerJoin = {
  turn: number
  listWinners: TListWinners[]
}

const TabsPrize = ({ listWinner }: { listWinner: TListWinnerJoin[] }) => {
  const t100 = useTranslations('Promotion100')

  return (
    <>
      {listWinner.map((item) => (
        <div key={item.turn} className='flex flex-col gap-4'>
          <p className='text-center'>
            {t100('text6')} {item.turn}
          </p>
          <div className='flex flex-col gap-4'>
            {item.listWinners.map((item) => (
              <div key={item.rank} className='p-2 bg-white/5 flex items-center gap-2 rounded-2xl'>
                {item.rank === 1 ? (
                  <Crown variant='Bold' className='text-primary-yellow min-w-8 min-h-8 flex flex-shrink-0' />
                ) : (
                  <div className='rounded-full size-6 flex items-center justify-center bg-primary-yellow text-black font-bold text-sm'>
                    <p>{item.rank}</p>
                  </div>
                )}
                <Avatar src={item.thumb} size='lg' />
                <div className='flex flex-col gap-2'>
                  <p>{item.title}</p>
                  <div className='grid grid-cols-6 gap-1'>
                    {item.listBingo.map((bingo, index) => (
                      <div key={index} className='size-8 flex items-center justify-center bg-white rounded-[4px] text-black font-bold text-sm'>
                        <p>{bingo}</p>
                      </div>
                    ))}
                  </div>
                  <p className='font-light text-primary-yellow text-sm'>{item.titlePrize}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

const RuleGame100 = () => {
  const tg = useTranslations('Promotion.GuidelinesPromotion')
  const t100 = useTranslations('Promotion100')
  const tr = useTranslations('Promotion.Reward')
  const tp = useTranslations('Promotion.ProtocolsInvite')
  const tc = useTranslations('Promotion.ConditionDetails')
  const tpp = useTranslations('Promotion.ProtocolsPromotion')

  const textsInfo = [
    {
      title: tg('text0'),
      description: t100('title')
    },
    { title: tg('text1'), description: t100('text9') },
    { title: tg('text3'), description: tg('text4') },
    { title: tg('text5'), description: t100('text10') },
    { title: t100('text11'), description: t100('text12') },
    {
      title: t100('text13'),
      description: [t100('text14'), t100('text15'), t100('text16'), t100('text17'), t100('text18')]
    }
  ]

  const textsRule = [
    {
      title: tp('title'),
      description: [t100('text19'), t100('text20'), t100('text21'), t100('text22')]
    },
    {
      title: tr('title'),
      description: [tp('text11'), tr('text2'), tr('text3'), tr('text4')]
    },
    {
      title: 'Quy định khác',
      description: [tc('text3'), tc('text4'), tc('text5'), tc('text6')]
    }
  ]

  const listJobs: string[] = [
    'Điện lạnh',
    'Điện',
    'Nước',
    'Giúp việc nhà',
    'Xây dựng',
    'Sửa xe máy',
    'Điện máy',
    'Make up',
    'Nails',
    'Tài xế xe ô tô',
    'Massage',
    'Nấu ăn',
    'Điều dưỡng viên',
    'HLV chăm sóc cá nhân',
    'Sửa máy tính - Lập trình viên',
    'Chăm sóc da - spa tại gia',
    'Hàn - tiện',
    'Thiết kế đồ họa, UX/UI',
    'Sửa chữa Lắp đặt nhôm, kính',
    'Sơn',
    'Vật lý trị liệu',
    'Luật sư',
    'Bảo vệ, vệ sĩ',
    'Cắt tóc nam',
    'Cắt tóc nữ',
    'Pha chế',
    'Làm vườn',
    'Sửa chữa Lắp đặt cửa cuốn',
    'Sửa chữa Lắp đặt thang máy',
    'Sửa chữa Lắp đặt máy bơm nước',
    'Gia sư âm nhạc',
    'Gia sư hội họa',
    'Gia sư nghệ thuật biểu diễn',
    'HLV các môn thể thao',
    'Gia sư phổ thông',
    'Gia sư dạy tiếng nước ngoài',
    'Cắm hoa',
    'Mộc',
    'Thi công nội thất',
    'Thi công trần/ thạch cao',
    'Diệt côn trùng',
    'Quay dựng video',
    'Thợ thiết kế đá granite, đá hoa cương',
    'Thi công bể cá',
    'Thi công hồ bơi',
    'Tạp vụ sự kiện'
  ]

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-2xl font-bold upercase text-primary-yellow'>{t100('title')}</p>
      <ImageFallback src={'/promotion-images/number1.webp'} alt={''} height={600} width={600} className='object-contain size-full max-h-[300px]' />
      <div className='flex flex-col gap-2'>
        {textsInfo.map((item, index) => (
          <Text key={index} {...item} />
        ))}
      </div>
      <div className='flex flex-col gap-4 p-4 bg-primary-blue'>
        <p className='font-bold text-white'>{tpp('text14')}</p>
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-bold text-primary-yellow'>{tpp('text17')}:</p>
          <p className='text-sm text-white'>{tpp('text25')}</p>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-bold text-primary-yellow'>{tpp('text15')}:</p>
          <p className='text-sm text-white'>
            {tpp('text16')} ({tpp('text24')}).
          </p>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-bold text-primary-yellow'>{tpp('text19')}:</p>
          <p className='text-sm text-white'>
            {tpp('text20')} ({tpp('text24')}).
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        {textsRule.map((item, index) => (
          <Text key={index} {...item} />
        ))}
      </div>
      <div className='flex flex-col gap-2 text-sm'>
        <p className='text-primary-blue font-bold'>{t100('text23')}:</p>
        <div className='p-2 border-1'>
          {listJobs.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

type TTextArray = { title: string; description: string | string[] }
const Text = ({ title, description }: TTextArray) => {
  return (
    <div className='flex flex-col gap-2 text-sm'>
      <p className='text-primary-blue font-bold'>{title}</p>
      {Array.isArray(description) ? (
        <ul className='list-inside list-disc pl-2'>
          {description.map((item, index) => (
            <li key={index} className='text-sm'>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p>{description}</p>
      )}
    </div>
  )
}

type TText = {
  title: string
  description: string
}
const RuleInvite = ({ type }: { type?: '100' }) => {
  const t = useTranslations('Promotion.GuidelinesPromotion')
  const tp = useTranslations('Promotion.ProtocolsPromotion')
  const td = useTranslations('Promotion.Hero')
  const tr = useTranslations('Promotion.Reward')
  const tc = useTranslations('Promotion.ConditionDetails')
  const tpi = useTranslations('Promotion.ProtocolsInvite')
  const ti = useTranslations('Promotion.ImportantNote')
  const t100 = useTranslations('Promotion100')

  const is100 = type === '100'
  const title = is100 ? td('text1-1') + '- ' + td('text8') : td('text1') + '-' + td('text2')

  const thumb = is100 ? '/promotion/invite100.png' : '/promotion/invite.png'

  const listRule: TText[] = [
    {
      title: t('text0'),
      description: title
    },
    {
      title: t('text1'),
      description: t('text2')
    },
    {
      title: t('text3'),
      description: t('text4')
    },
    {
      title: t100('text11'),
      description: t100('text12')
    },
    {
      title: t('text7'),
      description: is100 ? t('text8-1') : t('text8')
    }
  ]

  const data: TText[] = [
    {
      title: tp('text14'),
      description: is100 ? tp('text28-1') : tp('text28')
    },
    {
      title: tp('text15'),
      description: tp('text16') + ' ' + '(' + tp('text24') + ')'
    },
    {
      title: tp('text19'),
      description: tp('text20') + ' ' + '(' + tp('text24') + ')'
    }
  ]

  const textsRuleInvite: TTextArray[] = [
    {
      title: tp('title'),
      description: is100
        ? [
            tpi('text1'),
            tpi('text2'),
            tpi('text3'),
            tpi('text4'),
            tpi('text5'),
            tpi('text6'),
            tpi('text7'),
            tpi('text8'),
            tpi('text9'),
            tpi('text10'),
            tpi('text11'),
            tpi('text12'),
            tpi('text13'),
            tpi('text14'),
            tpi('text15'),
            tpi('text16'),
            tpi('text17')
          ]
        : [tp('desc'), tp('text1'), tp('text2'), tp('text3'), tp('text4'), tp('text5')]
    },
    {
      title: tr('title'),
      description: [tr('text1'), tr('text2'), tr('text3'), tr('text4'), tr('text5')]
    },
    {
      title: tc('title'),
      description: [tc('text1'), tc('text2'), tc('text3'), tc('text4'), tc('text5'), tc('text6')]
    },
    {
      title: ti('title'),
      description: [is100 ? ti('text1-1') : ti('text1'), is100 ? ti('text2-1') : ti('text2'), ti('text3'), ti('text4'), ti('text5'), ti('text6')]
    }
  ]

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-2xl uppercase font-bold text-primary-yellow'>{title}</p>
      <div className=''>
        <ImageFallback src={thumb} alt={thumb} height={500} width={500} className='object-contain size-full max-h-[300px]' />
      </div>
      <div className='flex flex-col gap-2'>
        {listRule.map((item, index) => (
          <Text key={index} {...item} />
        ))}
      </div>
      <RuleTable data={data} />
      {textsRuleInvite.map((item, index) => (
        <Text key={index} {...item} />
      ))}
    </div>
  )
}

const RuleTable = ({ data }: { data: TText[] }) => {
  const tp = useTranslations('Promotion.ProtocolsPromotion')

  return (
    <div className='p-4 flex flex-col gap-4 bg-primary-blue text-sm text-white'>
      <p className='text-base'>{tp('text14')}</p>
      {data.map((item, index) => (
        <div key={index} className='flex flex-col gap-2 text-sm'>
          <p className='text-primary-yellow font-bold'>{item.title}</p>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  )
}

export default ProtionPage
