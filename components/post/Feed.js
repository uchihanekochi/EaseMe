
'use client'
import React from "react";
import usePosts from '@/hooks/usePosts';
import PostItem from "./PostItem";
import { ClipLoader } from "react-spinners";
const Feed = ({ userId }) => {
  const { data: posts = [] , isLoading } = usePosts(userId);

  if (isLoading && userId) {
    return (
      <div className="flex justify-center items-center h-full ">
        <ClipLoader color="lightpink" size={80} />
      </div>
    )
  }
 
  return (
    <div className="flex flex-col gap-[10px]"> 
    
      {posts.map((post) => {
        return (<PostItem userId={userId} key={post.id} data={post} />)

      })}
    </div>
  );
};

export default Feed;
