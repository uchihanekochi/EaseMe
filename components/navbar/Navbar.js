'use client'

import React from 'react'
import {signIn,signOut} from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../Logo'
import Button from '../Button'
import Avatar from '../Avatar'
const Navbar = ({session}) => {
    return (
        <div className='fixed top-0 w-full px-5 h-[82px] bg-white/60'>
            <div className="flex items-center justify-between h-full  mx-auto ">
                <div className="flex items-center justify-center gap-[33px] ">
                    <Logo></Logo>
                    <Link href={"/"} className='hidden lg:block'>
                        <div className="flex justify-center items-center ">
                            <Image src={'/assets/icons/home.svg'} height={36} width={36} alt='home' />
                            <span className=" w-[82px] text-green-01 text-[24px] leading-[30px] text-center">Home</span>
                        </div>
                    </Link>
                </div>
                {session? <>
                    <div className="flex items-center justify-center gap-[14px] ">
                    <Image src={'/assets/icons/plus.svg'} height={36} width={36} alt='create-post' />
                    <Image src={'/assets/icons/connect.svg'} height={36} width={128} alt='connect' />
                    <Image src={'/assets/icons/book.svg'} height={36} width={30} alt='book' />
                    <div className="flex items-center justify-center gap-1">
                        <Avatar userId={session?.id} isLarge />
                        <Image src={'/assets/icons/more.svg'} height={12} width={22} alt='more' onClick={()=>signOut()}  />
                    </div>
                </div>
                </> : <>
                <div className="flex items-end justify-center ">
                    <Button label={'Đăng nhập'} onClick={()=>signIn()}  green />
                </div>
                </>}
            </div>
        </div>
    )
}

export default Navbar
