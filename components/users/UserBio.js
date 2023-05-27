'use client'
import { format } from 'date-fns'
import vi from 'date-fns/locale/vi'
import React, { useMemo } from 'react'
import useEditModal from '@/hooks/useEditModal'
import useCurrentUser from '@/hooks/useCurrentUser'
import useUser from '@/hooks/userUser'
import Button from '../Button'

import { BiCalendar } from 'react-icons/bi'
const UserBio = ({ userId }) => {
  const { data: currentUser } = useCurrentUser()
  const { data: fetchedUser } = useUser(userId)

  const editModal = useEditModal()
 

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), 'MMMM yyyy',{locale:vi});
  }, [fetchedUser?.createdAt])

  return (
    <div className=' bg-white rounded-b-[15px] pb-4'>
      <div className="flex justify-end p-2">
        {currentUser?.id === userId &&
          (
            <Button grey small label={"Chỉnh hồ sơ"} onClick={editModal.onOpen} />
          )

        }
      </div>

      <div className="mt-8 px-4">
        <div className="flex">
          <p className="text-green-01 text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-black">
            {fetchedUser?.bio}
          </p>
          <div
            className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-neutral-500
          ">
            <BiCalendar size={24} />
            <p>
              Tham gia {createdAt}
            </p>
          </div>
        </div>
      </div>


    </div>
  )
}

export default UserBio
