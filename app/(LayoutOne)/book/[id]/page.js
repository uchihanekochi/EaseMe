'use client'
import React from 'react'
import Book from '@/components/minhkhoi/Book/Book'
import usePosts from '@/hooks/usePosts'
import useCurrentUser from '@/hooks/useCurrentUser'
import { ClipLoader } from "react-spinners";


const BookPage = ({ params }) => {
  const userId = params.id
  const { data: fetchedPosts, isLoading } = usePosts()
  const { data: fetchedUser, isLoading: isUserLoading } = useCurrentUser(userId)
  if (isLoading || (!fetchedPosts && isUserLoading)) {
    return (
      <div className="flex justify-center items-center h-full  col-span-5">
        <ClipLoader color="lightpink" size={80} />
      </div>
    )
  }
  return (
    <div className=" col-span-5 h-full">

      <Book
        pageContentArr={fetchedPosts}
        nameOfUser={fetchedUser?.name}
      />

    </div>


  )
}

export default BookPage
