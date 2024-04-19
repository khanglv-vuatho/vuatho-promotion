'use client'

import { Tab, Tabs } from '@nextui-org/react'

type TListTabs = {
  title: string
  children: React.ReactNode
}

const TabsCustom = ({ listTabs }: { listTabs: TListTabs[] }) => {
  return (
    <Tabs
      radius='full'
      aria-label='Tabs-news'
      classNames={{
        base: 'w-full flex justify-center',
        cursor: 'bg-white',
        tab: 'p-4 border-1',
        tabContent: 'text-white font-bold group-data-[selected=true]:text-primary-blue  ',
        tabList: 'bg-transparent'
      }}
    >
      {listTabs.map((item) => (
        <Tab key={item.title} title={item.title}>
          {item.children}
        </Tab>
      ))}
    </Tabs>
  )
}

export default TabsCustom
