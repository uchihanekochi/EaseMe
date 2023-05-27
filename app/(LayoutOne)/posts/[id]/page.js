'use client'
import React from 'react'
import usePost from '@/hooks/usePost';
import { ClipLoader } from "react-spinners";
import PostItem from '@/components/post/PostItem';
import Form from '@/components/Form';
import CommentFeed from '@/components/post/CommentFeed';



const PostsPage = ({params}) => {
const postId = params.id



const { data: fetchedPost, isLoading } = usePost(postId);



if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full  col-span-5 lg:col-span-3">
        <ClipLoader color="lightpink" size={80} />
      </div>
    )
  }

  return (
    <div className=" col-span-5 lg:col-span-3">
   <div className='flex flex-col gap-[10px] mt-[10px]'>
   
      <PostItem data={fetchedPost} />
      <Form postId={postId} isComment  placeholder="Phản hồi" />
      <CommentFeed comments={fetchedPost?.comments} />
   </div>

    </div>
  )
}

export default PostsPage
