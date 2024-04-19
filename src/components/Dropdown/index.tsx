import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  isOpen: boolean
  children: React.ReactNode
  direction?: 'left' | 'top' | 'right'
  className?: string | undefined
}

const DropDownMenu: React.FC<Props> = ({ isOpen, children, className, direction = 'top' }) => {
  const menuVariants = {
    initial: direction === 'left' || direction === 'right' ? { scaleX: 0 } : { scaleY: 0 },
    animate: direction === 'left' || direction === 'right' ? { scaleX: 1 } : { scaleY: 1 },
    exit: direction === 'left' || direction === 'right' ? { scaleX: 0, opacity: 0 } : { scaleY: 0, opacity: 0 }
  }

  const origin = { top: 'origin-top', left: 'origin-left', right: 'origin-right' }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial='initial'
          animate='animate'
          exit='exit'
          variants={menuVariants}
          className={twMerge(`fixed inset-0 z-[1000] flex flex-col items-start gap-4 overflow-hidden pb-2 ${origin[direction]}`, className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DropDownMenu
