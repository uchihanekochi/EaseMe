'use client'
import React from 'react'
import NoteBoard from './NoteBoard'
import { usePathname } from 'next/navigation'
const LeftBar = () => {

  const pathName = usePathname()


  if(pathName.includes('/book')){
      return <></>
  }


  return (
    <div className="hidden lg:block lg:col-span-1 h-full">
    <div className=' px-4 mx-auto  '>
      <div className="mt-[10px]">
       <NoteBoard/>
      </div>
    </div>

    </div>
  )
}

export default LeftBar
