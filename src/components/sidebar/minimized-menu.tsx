import { SIDE_BAR_MENU } from '@/constants/menu'

import React from 'react'

import { LogOut, MonitorSmartphone } from 'lucide-react'
import { MenuLogo } from '@/icons/menu-logo'
import MenuItem from './menu-item'
import DomainMenu from './domain-menu'

type Props = {
  onShrink():void
  current:string
  onSignOut():void
  domains:
  | {
      id: string
      name: string
      icon: string | null
    }[]
  | null
  | undefined

}

const MiniMenu = ({onShrink, current, onSignOut, domains} : Props) => {

  return (
    <div>
      <span className="cursor-pointer">
      <div onClick={onShrink} className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-400"></div>
        {/* <MenuLogo  onClick={onShrink}/> */}
      </span>
      <div className="animate-fade-in opacity-0 delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-10 cursor-pointer">
        <div className="flex flex-col">
          {SIDE_BAR_MENU.map((menu, key) => (
            <MenuItem
              size="min"
              {...menu}
              key={key}
              current={current}
            />
          ))}
          <DomainMenu
            min
            domains={domains}
          />
        </div>
        <div className="flex flex-col">
          <MenuItem
            size="min"
            label="Sign out"
            icon={<LogOut />}
            onSignOut={onSignOut}
          />
          <MenuItem
            size="min"
            label="Mobile App"
            icon={<MonitorSmartphone />}
          />
        </div>
      </div>
    </div>
  )
}

export default MiniMenu