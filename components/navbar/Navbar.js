'use client'

import React, {useState, useCallback } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../Logo'

import Avatar from '../Avatar'
import { useRouter } from 'next/navigation'
const Navbar = ({ session }) => {
    const router = useRouter()
    const [toggle, setToggle] = useState(false)
    const goToBook = useCallback(
        () => {
            if (session) {
                return router.push(`/book/${session.id}`)
            } else {
                return
            }
        },
        [session, router],
    )

    const goToUser = useCallback(
        () => {
            if (session) {
                return router.push(`/users/${session.id}`)
            } else {
                return
            }
        },
        [session, router],
    )

    const goToSurvey = useCallback(
        () => {
            if (session) {
                return router.push(`/survey`)
            } else {
                return
            }
        },
        [session, router],
    )


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
                {session &&
                    <div className="flex items-center justify-center gap-[14px] relative">
                        <Image src={'/assets/icons/plus.svg'} height={36} width={36} alt='create-post' />
                        <Image src={'/assets/icons/connect.svg'} height={36} width={128} alt='connect' />
                        <Image src={'/assets/icons/book.svg'} height={36} width={30} alt='book' onClick={goToBook} />
                        <div className="flex items-center justify-center gap-1 ">
                            <Avatar userId={session?.id} isLarge />
                            <Image src={'/assets/icons/more.svg'} height={12} width={22} alt='more' onClick={()=> setToggle(prev=>!prev) } />
                        </div>
                        {toggle && 
                            <div className=" top-[120%]  right-0 absolute w-fit  bg-[#fff] rounded-[15px] px-2 py-4 shadow-01 "   onClick={()=> setToggle(prev=>!prev) }>
                                <div className="flex flex-col gap-[10px] mt-[10px]">
                                    <div className="w-full p-2 hover:bg-[#ccc] rounded-[10px]" onClick={goToUser}>
                                        Trang cá nhân
                                    </div>
                                    <div className="w-full p-2 hover:bg-[#ccc] rounded-[10px]" onClick={goToSurvey}>
                                        Làm khảo sát
                                    </div>
                                    <div className="w-full p-2 hover:bg-[#ccc] rounded-[10px]" onClick={()=> signOut()}>
                                        Đăng xuất
                                    </div>


                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar
