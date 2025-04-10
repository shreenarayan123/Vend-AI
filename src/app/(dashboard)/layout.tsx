import { onLoginUser } from '@/actions/auth'
import SideBar from '@/components/sidebar'
import { ChatProvider } from '@/context/user-chat-context'
import React from 'react'

type Props = {
  children:React.ReactNode
}

const layout = async ({children}: Props) => {
  const authenticated = await onLoginUser()
  if(!authenticated) return null

  return (
    <ChatProvider>
    <div className="flex h-screen w-full  hide-scrollbar overflow-hidden">
      <div>{authenticated.domain}</div>
      <SideBar domains={authenticated.domains} />
      <div className="w-full border-l-[1px] border-gray-300 h-screen flex flex-col  pt-5">
        {children}
      </div>
    </div>
  </ChatProvider>
  )
}

export default layout