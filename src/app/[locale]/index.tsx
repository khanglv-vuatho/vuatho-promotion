'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { memo, useCallback, useEffect, useState } from 'react'
import QRCode from 'react-qr-code'

import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Add as AddIcon,
  Call as CallIcon,
  HambergerMenu,
  Location as LocationIcon,
  Sms as MailIcon,
  HambergerMenu as MenuIcon,
  Call as PhoneIcon
} from 'iconsax-react'

import { FacebookIcon, LinkedinIcon, YoutubeIcon } from '@/components/Icons'
import ImageFallback from '@/components/ImageFallback'

import { AndroidBtn, IosBtn } from '@/components/Download'
import { HeaderWrapper, Logo } from '@/components/Header'
import InviteRule from '@/components/InviteRule'
import LangsComp from '@/components/LangsComp'
import { DefaultModal } from '@/components/Modal'
import { ToastComponent } from '@/components/Toast'
import { phoneSelect } from '@/constants'
import { useGetAllQueryParams } from '@/hooks/useGetAllQueryParams'
import instance from '@/services/axiosConfig'
import { handleCheckWebView, handlePathName } from '@/utils'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { twMerge } from 'tailwind-merge'
import './promotion.css'

export const PromotionsHeader = memo(() => {
  return (
    <HeaderWrapper>
      <Logo />
      <RightHeader />
    </HeaderWrapper>
  )
})

export const PromotionsFooter = memo(() => {
  const t = useTranslations('Promotion.PromotionsHeader')
  const socialNetworkList = [
    {
      id: 'Youtube',
      icon: <YoutubeIcon size={24} />,
      link: 'https://www.youtube.com/@Vuatho.official'
    },
    {
      id: 'Facebook',
      icon: <FacebookIcon size={20} />,
      link: 'https://www.facebook.com/vuathovietnam'
    },
    // {
    //   id: 'Tiktok',
    //   icon: <TiktokIcon size={20} />,
    //   link: '	https://www.tiktok.com/@vuatho.com',
    // },
    // {
    //   id: 'Instagram',
    //   icon: <InstaIcon size={24} />,
    //   link: 'https://www.instagram.com/vuatho.official',
    // },
    {
      id: 'Linkedin',
      icon: <LinkedinIcon size={20} />,
      link: 'https://www.linkedin.com/company/vuatho-vn'
    }
  ]
  return (
    <footer className='ct-container grid grid-cols-1 gap-[40px] py-10 lg:grid-cols-5 lg:py-20 bg-white'>
      <div className='col-span-1 flex flex-col gap-5 lg:col-span-2'>
        <div className='flex flex-col'>
          <div>
            <ImageFallback src={'/logo/textLogo.png'} alt='textLogo' width={84} height={60} className='h-[60px] w-[84px] pointer-events-none select-none' />
          </div>
          <p className='font-light'>{t('text1')}</p>
        </div>
        <div className='flex flex-col gap-5'>
          <p className='font-light'>{t('text2')}</p>
          <div className='flex w-full items-center justify-between gap-5 md:justify-normal'>
            {socialNetworkList.map((e) => (
              <a rel='noopener' key={e.id} href={e.link} target='_blank' title={e.id}>
                <div className='flex items-center gap-2'>
                  <span>{e.icon}</span>
                  <span className='font-light'>{e.id}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className='col-span-1 flex flex-col gap-[14px] font-light   lg:col-span-3'>
        <p className='text-[#969696] '>{t('text3')}</p>
        <div className='flex items-center gap-4'>
          <LocationIcon className='text-primary-blue' variant='Bold' />
          <span>{t('text4')}</span>
        </div>
        <div className='flex items-center gap-4'>
          <PhoneIcon className='text-primary-blue' variant='Bold' />
          <span>0912 426 404</span>
        </div>
        <div className='flex items-center gap-4'>
          <MailIcon className='text-primary-blue' variant='Bold' />
          <span>admin@vuatho.com</span>
        </div>
      </div>
    </footer>
  )
})

const RightHeader = memo(() => {
  const td = useTranslations('Promotion.PromotionsHeader.RightHeader')
  const tt = useTranslations('Promotion.menuPopup')

  const locale = useLocale()

  const openMenu = useSelector((state: any) => state.openMenu)
  const infoUser = useSelector((state: any) => state.infoUser)

  const dispatch = useDispatch()
  const pathName = usePathname()

  const [isWebView, setIsWebview] = useState(false)

  const isInvite = pathName.includes('invite')

  type TPromotions = {
    id: number
    title: string
    url: string
  }

  const promotions: TPromotions[] = [
    {
      id: 1,
      title: td('title1'),
      url: `/${locale}/invite${handleCheckWebView()}`
    },
    { id: 2, title: td('title2'), url: `/${locale}` }
  ]

  type TMenuPopup = {
    title: string | React.ReactNode
    url?: string
    id: number
    type?: string
    childrenTitle?: { title: string; url: string }[]
  }
  const menuPopup: TMenuPopup[] = [
    {
      id: 1,
      title: tt('text1'),
      type: 'accordion',
      url: isInvite ? `/${locale}/invite/winners-list/${handleCheckWebView()}` : `/${locale}/winners-list${handleCheckWebView()}`,
      childrenTitle: [
        {
          title: td('title2'),
          url: `/${locale}/winners-list/${handleCheckWebView()}`
        },
        {
          title: td('title1'),
          url: `/${locale}/invite/winners-list/${handleCheckWebView()}`
        }
      ]
    },
    {
      id: 3,
      title: tt('text3'),
      type: 'accordion',
      url: isInvite ? `/${locale}/invite/rule${handleCheckWebView()}` : `/${locale}/rule${handleCheckWebView()}`,
      childrenTitle: [
        {
          title: td('title2'),
          url: `/${locale}/rule${handleCheckWebView()}`
        },
        {
          title: td('title1'),
          url: `/${locale}/invite/rule${handleCheckWebView()}`
        }
      ]
    },
    { id: 2, title: tt('text2'), url: 'https://vuatho.com' },
    {
      id: 4,
      title: (
        <div className='flex items-center lg:justify-end gap-2 w-full'>
          <p className='text-semibold'>{tt('fanpage')} Vua Thợ</p>
          <div className='hidden lg:block'>
            <ImageFallback alt='fb' src={'/logo/fb.webp'} width={24} height={24} className='size-6 pointer-events-none select-none' />
          </div>
        </div>
      ),
      url: 'https://www.facebook.com/vuathovietnam'
    },
    {
      id: 5,
      title: (
        <div className='flex items-center lg:justify-end gap-2 w-full'>
          <p className='text-semibold'>Zalo Vua Thợ</p>
          <div className='hidden lg:block'>
            <ImageFallback alt='zalo' src={'/logo/zalo.webp'} width={24} height={24} className='size-6 pointer-events-none select-none' />
          </div>
        </div>
      ),
      url: 'https://zalo.me/622166130485793859'
    },
    {
      id: 5,
      title: (
        <div className='flex items-center lg:justify-end gap-2 w-full'>
          <p className='text-semibold'>0912 426 404</p>
          <div className='hidden lg:block'>
            <CallIcon variant='Bold' className='size-6 pointer-events-none select-none text-primaryYellow' />
          </div>
        </div>
      ),
      url: 'https://zalo.me/622166130485793859'
    }
  ]

  const menuVariants = {
    initial: {
      scaleY: 0
    },
    animate: {
      scaleY: 1,
      transiton: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0]
      }
    },
    exit: {
      scaleY: 0,
      transiton: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const _HandleToggleMenu = useCallback(() => {
    dispatch({ type: 'toggle_menu', payload: openMenu })
  }, [openMenu, dispatch])

  const HandleCloseMenuMoblie = useCallback(() => {
    dispatch({ type: 'toggle_menu', payload: true })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', HandleCloseMenuMoblie)

    return () => {
      window.removeEventListener('scroll', HandleCloseMenuMoblie)
    }
  }, [])

  useEffect(() => {
    openMenu ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto')
  }, [openMenu])

  useEffect(() => {
    var is_uiwebview = navigator.userAgent.includes('WebView')
    setIsWebview(is_uiwebview)
  }, [])

  if (isWebView) {
    return null
  }

  return (
    <>
      <HeaderCenter />
      {/* menu route */}
      <MenuOptions infoUser={infoUser} menuPopup={menuPopup} />
      {/* menu mobile */}
      <div className='menu-mobile flex items-center gap-4 transition lg:hidden' onClick={_HandleToggleMenu}>
        {openMenu ? (
          <AddIcon size={32} className='rotate-45 cursor-pointer text-text transition' />
        ) : (
          <div className='flex flex-col bg-white rounded-full p-3 shadow-[0px_8px_16px_0px_rgba(0,0,0,0.16)]'>
            <MenuIcon size={24} className='cursor-pointer text-base-black-1 transition' />
          </div>
        )}
      </div>
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial='initial'
            animate='animate'
            exit='exit'
            variants={menuVariants}
            className='fixed bottom-0 left-0 right-0 top-[60px] z-10 flex h-[calc(100vh-60px)] origin-top flex-col items-start gap-1 bg-bg p-6 pt-0'
          >
            {promotions.map((item) => (
              <Link href={`${item.url}`} className='w-full cursor-pointer py-3 text-lg' key={item.id} onClick={HandleCloseMenuMoblie}>
                {item.title}
              </Link>
            ))}
            <div className='flex flex-col w-full'>
              {menuPopup.map((item) => {
                if (item.type === 'accordion')
                  return (
                    <Accordion className='p-0'>
                      <AccordionItem key={item.id} aria-label={`Accordion ${item.id}`} title={item.title}>
                        <div className='flex flex-col gap-4'>
                          {item?.childrenTitle?.map((itemChild) => (
                            <Link key={itemChild.title} href={itemChild.url} className='flex min-h-[40px] items-center' onClick={HandleCloseMenuMoblie}>
                              {itemChild.title}
                            </Link>
                          ))}
                        </div>
                      </AccordionItem>
                    </Accordion>
                  )

                return <LinkItem key={item.id} item={item} handleClick={HandleCloseMenuMoblie} />
              })}
            </div>
            <LangsComp />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

const HeaderCenter = memo(() => {
  const t = useTranslations('Promotion.Hero')
  const pathName = usePathname()
  const isInvite = pathName.includes('invite')

  return (
    <div className='bg-white rounded-full px-[10px] py-2 lg:flex gap-5 items-center shadow-[0px_8px_16px_0px_rgba(0,0,0,0.16)] hidden'>
      <Link
        href={`${!isInvite ? pathName : handlePathName() + handleCheckWebView()}`}
        className={`${!isInvite ? 'bg-primary-yellow' : 'bg-[#F8F8F8]'} px-5 py-2 rounded-full flex items-center justify-center font-semibold`}
      >
        {t('text1')}
      </Link>
      <Link
        href={`${isInvite ? pathName : handlePathName() + handleCheckWebView()}`}
        className={`${isInvite ? 'bg-primary-yellow' : 'bg-[#F8F8F8]'} px-5 py-2 rounded-full flex items-center justify-center font-semibold`}
      >
        {t('text1-1')}
      </Link>
      <LangsComp />
    </div>
  )
})

type THero = {
  thumb: string
  thumb1: string
  thumb2: string
  thumb3: string
  inviteText?: string
}

export const Hero: React.FC<THero> = memo(({ thumb, thumb1, thumb2, thumb3, inviteText }) => {
  const t = useTranslations('Promotion.Hero')
  const tt = useTranslations('Promotion.Toast')
  const tf = useTranslations('Promotion.Form')

  const [onFetching, setOnFetching] = useState(false)
  const [onSending, setOnSending] = useState(false)
  const [onLoading, setOnLoading] = useState(true)
  const [isLogin, setIsLogin] = useState(false)

  const [phone, setPhone] = useState('')
  const [phoneCountry, setPhoneCountry] = useState('+84')

  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()

  const pathName = usePathname()
  const isInvite = pathName.includes('invite')

  const allQueryParams: any = useGetAllQueryParams()

  const dispatch = useDispatch()

  const infoUser = useSelector((state: any) => state.infoUser)

  const isWebView = allQueryParams?.token && allQueryParams?.hideHeaderAndFooter

  // const _HandleFetching = async () => {
  //   try {
  //     const { data } = await instance.get('/profile', {
  //       params: {
  //         token: allQueryParams?.token,
  //         type: 1
  //       }
  //     })

  //     console.log(data)

  // dispatch({
  //   type: 'login',
  //   payload: {
  //     thumb: data?.profileInfo?.profilePicture,
  //     name: data?.profileInfo.fullName,
  //     phone: data?.profileInfo?.phone?.phone_code + data?.phone?.phone_number,
  //     id: data?.profileInfo?.id,
  //     // listNumber: [
  //     //   ['12', '31', '45', '21', '42', '44'],
  //     //   ['12', '32', '35', '98', '33', '75'],
  //     //   ['12', '32', '12', '94', '86', '64']
  //     // ],
  //     code: data?.playerInfo?.code
  //   }
  // })
  //   } catch (error) {
  //     // invalid token will be redirect to '/'
  //     console.log(error)
  //     // router.push('/')
  //   } finally {
  //     setOnFetching(false)
  //     setOnLoading(false)
  //   }
  // }

  const _HandleSubmit = async () => {
    try {
      const { data } = await instance.post('/promotion/profile', {
        phoneCode: phoneCountry,
        phoneNumber: phone
      })
      dispatch({
        type: 'login',
        payload: {
          ...data
        }
      })
      setIsLogin(true)
    } catch (error) {
      console.log(error)
      setIsLogin(false)
      ToastComponent({ message: tt('text7'), type: 'error' })
    } finally {
      setOnSending(false)
    }
  }

  const _HandleLogin = (e: any) => {
    e.preventDefault()
    if (phone.length == 0) return
    setOnSending(true)
  }
  // check exits token to call api
  useEffect(() => {
    if (!isWebView) {
      setOnLoading(false)
      return
    }

    setOnFetching(true)
  }, [isWebView])

  // useEffect(() => {
  //   onFetching && _HandleFetching()
  // }, [onFetching])

  useEffect(() => {
    onSending && _HandleSubmit()
  }, [onSending])

  return (
    <>
      <div>
        <h3 className='ct-text-border text-primaryYellow text-2xl md:text-4xl uppercase font-bold px-2 md:px-0 md:text-center mt-10 lg:hidden'>
          {inviteText ? (
            <>
              <span>{t('text1-1')} - </span>
              <span>{t('text2-1')}</span>
            </>
          ) : (
            <>
              <span>{t('text1')} - </span>
              <span>{t('text2')}</span>
            </>
          )}
        </h3>
        <div className='flex flex-col gap-[10px] lg:hidden mt-[40px] lg:mt-0'>
          {!isLogin ? (
            <form
              onSubmit={(e) => _HandleLogin(e)}
              className='bg-white p-4 flex flex-col gap-5 rounded-[20px] lg:min-w-[400px] max-w-[80%] min-w-[60%] mx-auto lg:max-w-none '
            >
              <h5 className='text-primary-blue text-2xl font-semibold'>{t('text6')}</h5>
              <div className='flex items-center gap-2'>
                <Autocomplete
                  aria-label='phone'
                  defaultItems={phoneSelect}
                  variant='bordered'
                  className='max-w-[90px]'
                  value={phoneCountry}
                  radius='full'
                  isRequired
                  isClearable={false}
                  defaultSelectedKey={phoneCountry}
                  onSelectionChange={(e: any) => setPhoneCountry(e)}
                  scrollShadowProps={{
                    isEnabled: false
                  }}
                  popoverProps={{
                    classNames: {
                      content: 'text-[12px] whitespace-nowrap'
                    }
                  }}
                  inputProps={{
                    classNames: {
                      input: 'text-sm text-[#A5A5A5]',
                      inputWrapper: 'border-[#BABEF4] data-[hover=true]:border-[#BABEF4] group-data-[focus=true]:border-[#BABEF4] border-1 h-[44px] pl-[8px]'
                    }
                  }}
                >
                  {(item: any) => (
                    <AutocompleteItem
                      key={item.value}
                      classNames={{
                        title: 'text-s, py-[2px]'
                      }}
                    >
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <Input
                  value={phone}
                  onChange={(e: any) => setPhone(e.target.value)}
                  placeholder={tt('text4')}
                  classNames={{
                    inputWrapper: 'bg-[#F8F8F8] data-[hover=true]:bg-[#F8F8F8] group-data-[focus=true]:bg-[#F8F8F8] h-[44px] pl-[16px] ',
                    input: 'placeholder:font-light text-[#969696]'
                  }}
                />
              </div>

              <Button className='bg-primaryYellow p-4' onClick={(e) => _HandleLogin(e)} type='submit'>
                {tf('text4')}
              </Button>
            </form>
          ) : (
            <div className='bg-white p-4 flex flex-col gap-5 rounded-[20px] w-[80%] mx-auto lg:w-auto lg:min-w-[400px]'>
              <h3 className='text-2xl text-primary-blue font-semibold'>{t('text6')}</h3>
              <div className='flex items-center gap-2 py-2'>
                {/* <div>
                    <ImageFallback
                      src={infoUser.thumb}
                      alt={`avtar-${infoUser.id}`}
                      height={44}
                      width={44}
                      className='size-[44px] rounded-full pointer-events-none select-none'
                    />
                  </div> */}
                <p className='font-light text-primary-yellow'>{infoUser?.full_name}</p>
              </div>
              <div className='flex flex-col gap-4 '>
                {/* khang */}
                <p className='text-[#969696]'>{isInvite ? t('text12') : t('text13')}:</p>
                {isInvite ? (
                  <div className='flex flex-col gap-4'>
                    {!!infoUser?.code?.length ? (
                      <div className='flex gap-4'>
                        {infoUser?.code?.split('')?.map((number: any, index: number) => (
                          <div className='bg-[#F8F8F8] size-[46px] flex items-center justify-center rounded-full text-primary-blue font-semibold' key={index}>
                            {number}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='rounded-[10px] bg-[#F8F8F8] h-[236px] flex items-center justify-center'>
                        <div className='flex flex-col gap-2 items-center'>
                          <p>{t('text10')}</p>
                          <Button
                            className='bg-[#FCB713] font-semibold w-fit px-5 py-2'
                            radius='full'
                            onPress={() => {
                              onOpen()
                            }}
                          >
                            {t('text11')}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className='bg-[#F8F8F8] text-primary-blue text-4xl px-5 py-3 rounded-[10px]'>{infoUser?.code}</div>
                )}
              </div>
            </div>
          )}
          <CustomSlider thumb1={thumb1} thumb2={thumb2} thumb3={thumb3} style='md:flex lg:hidden' />
        </div>
      </div>
      <div className='ct-container flex-col gap-10 hidden mt-10 lg:block'>
        <div className={`grid grid-cols-5  gap-10 items-start`}>
          <div className={`col-span-5  lg:col-span-3 items-center`}>
            <div className='flex flex-col gap-[10px] items-center'>
              <h3 className='ct-text-border text-primaryYellow text-2xl lg:text-4xl uppercase font-bold text-center '>
                {inviteText ? (
                  <>
                    <span>{t('text1-1')} - </span>
                    <span>{t('text2-1')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('text1')} - </span>
                    <span>{t('text2')}</span>
                  </>
                )}
              </h3>
              <p className='text-center text-xl font-medium text-white'>{inviteText ? inviteText : t('text3')}</p>
            </div>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className='flex flex-col items-center'
            >
              <div className='max-w-[773px] max-h-[450px]'>
                <ImageFallback priority src={thumb} alt={thumb} width={773} height={491} className='pointer-events-none select-none w-auto h-auto' />
              </div>
            </motion.div>
          </div>
          <div className='lg:col-span-2 col-span-5 lg:justify-end lg:flex'>
            {!isLogin ? (
              <form onSubmit={(e) => _HandleLogin(e)} className='bg-white p-4 flex flex-col gap-5 rounded-[20px] lg:min-w-[400px]'>
                <h5 className='text-primary-blue text-2xl font-semibold'>{t('text6')}</h5>
                <div className='flex items-center gap-2'>
                  <Autocomplete
                    aria-label='phone'
                    defaultItems={phoneSelect}
                    variant='bordered'
                    className='max-w-[90px]'
                    value={phoneCountry}
                    radius='full'
                    isRequired
                    isClearable={false}
                    defaultSelectedKey={phoneCountry}
                    onSelectionChange={(e: any) => setPhoneCountry(e)}
                    scrollShadowProps={{
                      isEnabled: false
                    }}
                    popoverProps={{
                      classNames: {
                        content: 'text-[12px] whitespace-nowrap'
                      }
                    }}
                    inputProps={{
                      classNames: {
                        input: 'text-sm text-[#A5A5A5]',
                        inputWrapper: 'border-[#BABEF4] data-[hover=true]:border-[#BABEF4] group-data-[focus=true]:border-[#BABEF4] border-1 h-[44px] pl-[8px]'
                      }
                    }}
                  >
                    {(item: any) => (
                      <AutocompleteItem
                        key={item.value}
                        classNames={{
                          title: 'text-s, py-[2px]'
                        }}
                      >
                        {item.label}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                  <Input
                    value={phone}
                    onChange={(e: any) => setPhone(e.target.value)}
                    placeholder={tt('text4')}
                    classNames={{
                      inputWrapper: 'bg-[#F8F8F8] data-[hover=true]:bg-[#F8F8F8] group-data-[focus=true]:bg-[#F8F8F8] h-[44px] pl-[16px] ',
                      input: 'placeholder:font-light text-[#969696]'
                    }}
                  />
                </div>

                <Button className='bg-primaryYellow p-4' onClick={(e) => _HandleLogin(e)} type='submit'>
                  {tf('text4')}
                </Button>
              </form>
            ) : (
              <div className='bg-white p-4 flex flex-col gap-5 rounded-[20px] lg:min-w-[400px]'>
                <h3 className='text-2xl text-primary-blue font-semibold'>{t('text6')}</h3>
                <div className='flex items-center gap-2 py-2'>
                  {/* <div>
                    <ImageFallback
                      src={infoUser.thumb}
                      alt={`avtar-${infoUser.id}`}
                      height={44}
                      width={44}
                      className='size-[44px] rounded-full pointer-events-none select-none'
                    />
                  </div> */}
                  <p className='font-light text-primary-yellow'>{infoUser?.full_name}</p>
                </div>
                <div className='flex flex-col gap-4 '>
                  <p className='text-[#969696]'>{isInvite ? 'Dãy số của bạn:' : 'Mã dự thưởng:'}</p>
                  {isInvite ? (
                    <div className='flex flex-col gap-4'>
                      {!!infoUser?.listNumber?.length ? (
                        infoUser?.listNumber?.map((listnumber: any, index: number) => (
                          <div className='flex justify-between gap-4' key={index}>
                            {listnumber?.map((number: any) => (
                              <div
                                className='bg-[#F8F8F8] size-[46px] flex items-center justify-center rounded-full text-primary-blue font-semibold'
                                key={number}
                              >
                                {number}
                              </div>
                            ))}
                          </div>
                        ))
                      ) : (
                        <div className='rounded-[10px] bg-[#F8F8F8] h-[236px] flex items-center justify-center'>
                          <div className='flex flex-col gap-2 items-center'>
                            <p>{t('text10')}</p>
                            <Button
                              className='bg-[#FCB713] font-semibold w-fit px-5 py-2'
                              radius='full'
                              onPress={() => {
                                onOpen()
                              }}
                            >
                              {t('text11')}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className='bg-[#F8F8F8] text-primary-blue text-4xl px-5 py-3 rounded-[10px]'>{infoUser?.code}</div>
                  )}
                </div>
              </div>
            )}
          </div>

          <DefaultModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            hiddenHeader
            hiddenCloseBtn
            modalBody={
              <div className='flex flex-col rounded-[20px] gap-4 md:gap-10 p-4 md:p-10 relative h-[80dvh]'>
                <Button
                  isIconOnly
                  radius='full'
                  onPress={onClose}
                  variant='light'
                  className=' absolute right-[3%] top-[3%] h-[48px] flex-shrink-0 w-[48px] min-w-[unset]'
                >
                  <AddIcon className='rotate-45' size={32} />
                </Button>
                <div className='flex flex-col gap-2 w-[80%] md:w-auto'>
                  <h3 className='text-primary-blue text-lg md:text-2xl font-bold'>{t('text9')}</h3>
                  <p className='text-[#FCB713] text-lg md:text-2xl font-bold'>
                    {isInvite ? t('text1-1') : t('text1')} - {isInvite ? t('text2-1') : t('text2')}
                  </p>
                </div>
                <div className='h-full overflow-auto'>
                  <InviteRule primaryText='' />
                </div>
              </div>
            }
          />
        </div>
      </div>
    </>
  )
})

export const ProtocolsPromotion = memo(() => {
  const t = useTranslations('Promotion.ProtocolsPromotion')
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const _HandleOpen = useCallback(() => {
    isMobile ? window.open('https://vuatho.com/vi/qrcode-download-app', '_blank') : onOpen()
  }, [isMobile, onOpen])

  const listProtocols = [
    {
      desc: (
        <div className='md:text-xl'>
          <span className='underline font-semibold cursor-pointer' onClick={_HandleOpen}>
            {t('text10')}
          </span>{' '}
          {t('text11')}
        </div>
      ),
      thumb: 'ProtocolsPromotion1.webp'
    },
    {
      desc: <p className='md:text-xl'>{t('text12')}</p>,
      thumb: 'ProtocolsPromotion2.webp'
    },
    {
      desc: <p className='md:text-xl'>{t('text13')}</p>,
      thumb: 'ProtocolsPromotion3.webp'
    }
  ]

  return (
    <div className='ct-container flex flex-col gap-5'>
      <h4 className='ct-text-border text-primaryYellow font-bold text-2xl md:text-4xl uppercase'>{t('title')}</h4>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 overflow-hidden'>
        {listProtocols.map((item, index) => (
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + (index + 1) * 0.1 }}
            viewport={{ once: true }}
            className='rounded-[20px] p-5 bg-white flex flex-col justify-between gap-4 md:gap-10 max-w-none xs:max-w-[70%] md:max-w-none mx-auto'
            key={index}
          >
            <div className='flex flex-col gap-2'>
              <h5 className='text-primary-blue font-bold text-xl md:text-3xl'>
                {t('text6')} {index + 1}
              </h5>
              {item.desc}
            </div>
            <div>
              <ImageFallback
                src={`/promotion-images/${item.thumb}`}
                alt='ProtocolsPromotion1'
                width={360}
                height={360}
                className='w-full pointer-events-none select-none'
              />
            </div>
          </motion.div>
        ))}
      </div>
      <DefaultModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hiddenCloseBtn
        hiddenHeader
        className='max-w-[380px] md:max-w-[685px] p-6 pb-6'
        modalBody={
          <div className='  flex flex-col gap-5 relative'>
            <Button
              isIconOnly
              radius='full'
              onPress={onClose}
              variant='light'
              className=' absolute right-0 top-0 h-[48px] flex-shrink-0 w-[48px] min-w-[unset]'
            >
              <AddIcon className='rotate-45' size={32} />
            </Button>
            <h3 className='uppercase text-primary-blue text-2xl md:text-4xl font-semibold'>{t('text7')}</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
              <div>
                <p className='text-lg'>{t('text8')}</p>
                <div className='flex  gap-4 flex-col mt-2'>
                  <AndroidBtn style={'max-w-none'} />
                  <IosBtn style={'max-w-none'} />
                </div>
              </div>
              <div className='md:block hidden'>
                <p>{t('text9')}</p>
                <div className='max-w-[250px] max-h-[250px] size-[250px] p-2'>
                  <QRCode value='https://vuatho.com/vi/qrcode-download-app' size={250} className='max-w-[250px] max-h-[250px] size-[250px]' />
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  )
})

export const GuidelinesPromotion = memo(() => {
  const t = useTranslations('Promotion.ProtocolsPromotion')

  const pathName = usePathname()
  const isInvite = pathName.includes('invite')

  return (
    <div className='ct-container flex flex-col gap-5 pb-20'>
      <h3 className='ct-text-border text-primary-blue uppercase text-2xl md:text-4xl font-bold'>{t('text14')}</h3>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        viewport={{ once: true }}
        className='flex justify-between items-center md:flex-row flex-col gap-10'
      >
        <div className='flex flex-col gap-10 order-2 md:order-1'>
          <div className='bg-white p-2 md:p-5 flex flex-col gap-2 items-center rounded-[10px]'>
            <h4 className='font-bold text-xl md:text-3xl text-primary-blue'>{t('text15')}</h4>
            <p>{t('text16')}</p>
          </div>
          <div>
            <ImageFallback src={'/promotion-images/number2.webp'} alt='' width={300} height={112} className='pointer-events-none select-none w-auto' />
          </div>
        </div>
        <div className='order-1 md:order-2'>
          <div className='bg-white p-2 md:p-5 flex flex-col gap-2 items-center rounded-[10px]'>
            <h4 className='font-bold text-xl md:text-3xl text-primaryYellow'>{t('text17')}</h4>
            <p>{isInvite ? t('text18-1') : t('text18')}</p>
          </div>
          <div>
            <ImageFallback
              src={isInvite ? '/promotion-images/invite-number1.webp' : '/promotion-images/number1.webp'}
              alt=''
              width={300}
              height={340}
              className='pointer-events-none select-none w-auto'
            />
          </div>
        </div>
        <div className='flex flex-col gap-10 order-4'>
          <div className='bg-white p-2 xl:p-5 flex flex-col gap-2 items-center rounded-[10px]'>
            <h4 className='font-bold text-xl md:text-3xl text-[#FF9D76]'>{t('text19')}</h4>
            <p>{t('text20')}</p>
          </div>
          <div>
            <ImageFallback src={'/promotion-images/number3.webp'} alt='' width={300} height={112} className='pointer-events-none select-none w-auto' />
          </div>
        </div>
      </motion.div>
    </div>
  )
})

export const CustomSlider = memo(({ thumb1, thumb2, thumb3, style }: { thumb1: string; thumb2: string; thumb3: string; style?: string }) => {
  return (
    <div className={twMerge('relative md:top-32 col-span-5 mt-[40px] flex min-h-[420px] justify-center overflow-x-hidden md:hidden pb-0 md:pb-0', style)}>
      <div className='rank1 absolute'>
        <ImageFallback src={thumb1} alt='number1' width={300} height={310} className='h-auto w-72 pointer-events-none select-none' />
      </div>
      <div className='rank2 absolute'>
        <ImageFallback src={thumb3} alt='number3' width={300} height={310} className='h-auto w-72 pointer-events-none select-none' />
      </div>
      <div className='rank3 absolute'>
        <ImageFallback src={thumb2} alt='number2' width={300} height={310} className='h-auto w-72 pointer-events-none select-none' />
      </div>
    </div>
  )
})

const LinkItem = memo(({ item, handleClick }: { item: any; handleClick: any }) => {
  return (
    <Link
      href={item.url}
      key={item.id}
      className='w-full cursor-pointer text-lg lg:text-base lg:text-right py-3 lg:pr-4'
      target={item?.url?.includes('http') ? '_blank' : ''}
      rel='noopener noreferrer'
      onClick={handleClick}
    >
      {item.title}
    </Link>
  )
})

const MenuOptions = memo(({ infoUser, menuPopup }: { infoUser: any; menuPopup: any }) => {
  const [isOpen, setIsOpen] = useState(false)

  const HandleCloseMenuMoblie = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleOpen = useCallback((open: any) => {
    setIsOpen(open)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', HandleCloseMenuMoblie)

    return () => {
      window.removeEventListener('scroll', HandleCloseMenuMoblie)
    }
  }, [])

  return (
    <div className='lg:block hidden'>
      <Popover
        placement='bottom-end'
        role='button'
        aria-roledescription='button'
        isOpen={isOpen}
        onOpenChange={handleOpen}
        classNames={{
          content: 'rounded-[20px] p-0'
        }}
      >
        <PopoverTrigger role='button' aria-roledescription='button'>
          <div className='size-[60px] rounded-full bg-white flex items-center justify-center shadow-[0px_8px_16px_0px_rgba(0,0,0,0.16)] cursor-pointer'>
            {/* {!!infoUser.id ? (
              <ImageFallback
                src={infoUser.thumb}
                alt={`avatar-${infoUser.name}`}
                height={58}
                width={58}
                className='size-[90%] rounded-full pointer-events-none select-none'
              />
            ) : (
              <HambergerMenu aria-label='open' className='text-base-black-1' />
            )} */}
            <HambergerMenu aria-label='open' className='text-base-black-1' />
          </div>
        </PopoverTrigger>
        <PopoverContent aria-label='content'>
          <div className='rounded-[20px] bg-white py-2 flex flex-col items-end min-w-[240px]'>
            {menuPopup.map((item: any) => {
              return <LinkItem key={item.id} item={item} handleClick={HandleCloseMenuMoblie} />
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
})