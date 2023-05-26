'use client'
import React from 'react'
import useUser from '@/hooks/userUser'
import { ClipLoader } from "react-spinners";

import UserHero from '@/components/users/UserHero';
import UserBio from '@/components/users/UserBio';
import EditModal from '@/components/modals/EditModal';
import Feed from '@/components/post/Feed';
const page = ({params}) => {
    const userId = params.id
    const {data:fetchedUser,isLoading} = useUser(userId)
    console.log(fetchedUser)
    if (isLoading || !fetchedUser) {
        return (
          <div className="flex justify-center items-center h-full">
            <ClipLoader color="lightpink" size={80} />
          </div>
        )
      }
  return (
    <>
      <div className=" mb-[10px]">
          <EditModal/>
          <UserHero userId={userId}/>
          <UserBio userId={userId}/>
      </div>
        <Feed userId={userId}/>
    </>
  )
}

export default page
