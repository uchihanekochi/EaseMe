
'use client'
import React from "react";
import usePosts from '@/hooks/usePosts';
import PostItem from "./PostItem";

const Feed = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);
  console.log(userId)
  return (
    <div className="flex flex-col gap-[10px]"> 
    
      {posts.map((post) => {
        return (<PostItem userId={userId} key={post.id} data={post} />)

      })}
    </div>
  );
};

export default Feed;
