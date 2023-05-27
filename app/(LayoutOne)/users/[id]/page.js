'use client'
import React from 'react'
import useUser from '@/hooks/userUser';
import { ClipLoader } from "react-spinners";

import UserHero from '@/components/users/UserHero';
import UserBio from '@/components/users/UserBio';
import EditModal from '@/components/modals/EditModal';
import Feed from '@/components/post/Feed';
const UsersPage = ({params}) => {
    const userId = params.id
    const {data:fetchedUser,isLoading} = useUser(userId)
    if (isLoading || !fetchedUser) {
        return (
          <div className="flex justify-center items-center h-full  col-span-5 lg:col-span-3">
            <ClipLoader color="lightpink" size={80} />
          </div>
        )
      }
  return (
    <div className=' col-span-5 lg:col-span-3'>
      <div className=" mb-[10px]">
          <EditModal/>
          <UserHero userId={userId}/>
          <UserBio userId={userId}/>
      </div>
        <Feed userId={userId}/>
    </div>
  )
}

export default UsersPage
