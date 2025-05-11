import CodeSnippet from '@/components/installation/code-snippet'
import InfoBar from '@/components/infobar'
import React from 'react'
import Installation from '@/components/installation'

type Props = {}

const page = (props: Props) => {
  return (
    <>
    <InfoBar/>
    <div className="overflow-y-auto w-full  px-4  pt-5">

    <Installation />
    </div>
    </>
  )
}

export default page