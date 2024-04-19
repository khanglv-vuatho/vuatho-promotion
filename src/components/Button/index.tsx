'use client'

import { Button, ButtonProps } from '@nextui-org/react'
import { Add } from 'iconsax-react'
import { twMerge } from 'tailwind-merge'

type TButtonIcon = {
  className?: string
  children: React.ReactNode
} & ButtonProps
export const ButtonIcon = ({ className, children, ...props }: TButtonIcon) => {
  return (
    <Button {...props} isIconOnly radius='full' className={twMerge('p-2 bg-transparent', className)}>
      {children}
    </Button>
  )
}
