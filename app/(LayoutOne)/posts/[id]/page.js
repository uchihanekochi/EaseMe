'use client'
import React from 'react'
import usePost from '@/hooks/usePost';
import { ClipLoader } from "react-spinners";
import PostItem from '@/components/post/PostItem';
import Form from '@/components/Form';
const page = ({params}) => {
const postId = params.id

const { data: fetchedPost, isLoading } = usePost(postId);

if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightpink" size={80} />
      </div>
    )
  }

  return (
   <>
      <PostItem data={fetchedPost} />
      <Form postId={postId} isComment  placeholder="Phản hồi" />
   </>
  )
}

export default page
