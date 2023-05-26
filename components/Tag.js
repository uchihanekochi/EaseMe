import React from "react";

export const tags = [
  { value: "family", label: "Gia đình", color: "#F7C800", bg: "#FFF0D0" },
  { value: "love", label: "Tình yêu", color: "#FF8080", bg: "#FFE4E4" },
  { value: "friend", label: "Bạn bè", color: "#87A173", bg: "#E9E9E9" },
  { value: "work", label: "Công việc", color: "#97AEDF", bg: "E4F4FF" },
  { value: "mood", label: "Tâm trạng", color: " #66B4B9", bg: "#D7F5F7" },
  { value: "nsfw", label: "nsfw", color: "#BC2525", bg: "#FFE4E4", dot: true},
  { value: "something", label: "Khác", color: "#7D7D7D", bg: "#E9E9E9" },
];


export const findTagIndexByValue = (value,tags)=> tags.findIndex((tag)=> tag.value ===value)

export const Tag = ({label, color, bg, dot }) => {
  return (
    <div
      className={` w-fit flex justify-center items-center px-[6px] gap-[5px]  border-solid border-[1px] t rounded-[10px] cursor-pointer`}
      style={{color:color,backgroundColor:bg,borderColor:color}}
    >
    {dot && <span className={` h-[10px] w-[10px] rounded-full  `} style={{backgroundColor:color}}></span> }
      
      <span className="  font-[300] leading-[18px] text-[14px] flex items-center">
        {label}
      </span>
    </div>
  );
};
