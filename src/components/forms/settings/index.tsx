'use client'
import { Separator } from '@/components/ui/separator'
import { useSettings } from '@/hooks/settings/use-settings'
import React from 'react'
import  DomainUpdate  from './domain-update'
import EditChatbotIcon from './edit-chatbot-icon'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/loader'
import { Suspense } from 'react'


const WelcomeMessage = dynamic(
  () => import('./greetings-message'),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-32 bg-gray-100 rounded-md" />
  }
);

  interface ChatBot {
    id: string
    icon: string | null
    welcomeMessage: string | null
  }

  interface SettingsFormProps {
    id: string
    name: string
    plan: 'STANDARD' | 'PRO' | 'ULTIMATE'
    chatBot: ChatBot | null
  }


const SettingsForm = ({chatBot, id, name}: SettingsFormProps) => { 
    const {
        register,
        onUpdateSettings,
        errors,
        onDeleteDomain,
        deleting,
        loading,
      } = useSettings(id)
    
      return (
        <form
          className="flex flex-col gap-8 pb-10"
          onSubmit={onUpdateSettings}
        >
          <div className="flex flex-col gap-3 ">
            <h2 className="font-bold text-2xl">Domain Settings</h2>
            <Separator orientation="horizontal" />
            <DomainUpdate
              name={name}
              register={register}
              errors={errors}
            />
            {/* <CodeSnippet id={id} /> */}
          </div>
    
          <div className="flex flex-col gap-3 mt-5">
            <div className="flex gap-4 items-center">
              <h2 className="font-bold text-2xl">Chatbot Settings</h2>
            </div>
            <Separator orientation="horizontal" />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="col-span-1 flex flex-col gap-5 order-last md:order-first">
                <EditChatbotIcon
                  chatBot={chatBot}
                  register={register}
                  errors={errors}
                />
                <Suspense fallback={<div className="animate-pulse h-32 bg-gray-100 rounded-md" />}>
                  <WelcomeMessage
                    message={chatBot?.welcomeMessage ?? ''}
                    register={register}
                    errors={errors}
                  />
                </Suspense>
              </div>
              <div className=" relative">
                <Image
                  src="/images/bot-ui.png"
                  className="sticky top-0 rounded-2xl"
                  alt="bot-ui"
                  width={400}
                  height={400}
                  priority
                />
              </div>
            </div>
          </div>
    
          <div className="flex gap-5 ">
            <Button
              onClick={onDeleteDomain}
              variant="destructive"
              type="button"
              className="px-10 h-[50px]"
              disabled={deleting || loading}
            >
              <Loader loading={deleting}>Delete Domain</Loader>
            </Button>
            <Button
              type="submit"
              className="w-[100px] h-[50px]"
              disabled={deleting || loading}
            >
              <Loader loading={loading}>Save</Loader>
            </Button>
          </div>
        </form>
      )
    }
    
    export default SettingsForm