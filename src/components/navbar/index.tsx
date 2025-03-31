
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='flex justify-between gap-5 py-7 px-20 font-bold border-b border-solid border-zinc-100 leading-[154.5%] max-md:flex-wrap max-md:px-5' >
      <div className='flex gap-1.5 justify-center self-stretch my-auto text-2xl tracking-tighter text-neutral-700'>
        <Image src="/images/logo.png" alt="logo" style={{ width:'100px', height:'auto' }} width={0} height={0} sizes='100vw'
        />

      </div>
      <ul className="gap-14 justify-between self-stretch my-auto  leading-5 max-md:flex-wrap max-md:max-w-full font-normal hidden md:flex">
        <li className='text cursor-pointer text-500' >Pricing</li>
        <li className='text cursor-pointer text-500' >Features</li>
        <li className='text cursor-pointer text-500' >About us</li>
      </ul>
      <Link
        href="/dashboard"
        className="bg-orange px-4 py-2 rounded-sm text-white"
      >
        Free Trial
      </Link>
    </div>
  )
}

export default Navbar