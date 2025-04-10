import React from 'react'
import BreadCrumb from './bread-crumb'

type Props = {}

const InfoBar = (props: Props) => {
  return (
     <div className="flex w-full justify-between items-center py-1 pb-5 px-10 border-b-[1px] border-gray-300 ">
      <BreadCrumb />
    </div>
  )
}

export default InfoBar
