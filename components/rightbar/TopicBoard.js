'use client'
import React from 'react'
import { Tag,tags } from '../Tag'
const TopicBoard = () => {
  return (
    <div className="flex flex-col justify-center items-start p-2 gap-[18px] shadow-01 bg-linear-01 rounded-[15px] w-full]">
        <h2 className=' font-semibold text-[24px] leading-[30px] flex items-center justify-center text-[#87A273]'>Chủ đề bài viết</h2>
        <div className="flex items-start gap-[25px] flex-wrap w-full ">
            {tags.map((tag)=>{
                return(
                    <Tag key={tag.label}
                    label={tag.label}
                    bg={tag.bg}
                    color={tag.color}
                    dot={!tag?.dot}
                    />
                )
            })}
        </div>
    </div>
  )
}

export default TopicBoard
