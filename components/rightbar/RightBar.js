'use client'

import React from 'react'
import TopicBoard from './TopicBoard'
import Support from './Support'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SearchBar from './SearchBar'




const Rightbar = () => {
    const pathName = usePathname()


    if(pathName.includes('/book')){
        return <></>
    }
    
    return (

        <div className="hidden lg:block lg:col-span-1 h-full">
            <div className=' px-4 mx-auto '>
                <div className="flex flex-col gap-[10px] mt-[10px]">
                    <SearchBar/>
                    <TopicBoard />
                    <Support />
                    <div className="flex flex-col justify-center gap-[15px] px-2">
                        <div className="flex items-center gap-[10px] font-thin text-[14px] leading-[18px] flex-wrap">
                            <Link className='text-[#87A173]' href={'/'}> Về EaseMe </Link>
                            <Link className='text-[#959595] relative before:absolute before:top-[50%] before:translate-y-[-50%]  before:left-[-7px] before:block before:rounded-[50%] before:h-[5px] before:w-[5px] before:bg-[#959595]' href={'/'}>Quyền riêng tư </Link>
                            <Link className='text-[#959595] relative before:absolute before:top-[50%] before:translate-y-[-50%]  before:left-[-7px] before:block before:rounded-[50%] before:h-[5px] before:w-[5px] before:bg-[#959595]' href={'/'}>Chính sách bảo mật</Link>
                            <Link className='text-[#959595]' href={'/'}> Chính sách nội dung </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Rightbar
