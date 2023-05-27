
import Feed from "@/components/post/Feed"
import Form from "@/components/Form"
export default function Home() {
  return (

    <div className="  lg:col-span-3  col-span-5 h-full">
      <div className="  flex flex-col gap-[10px]">
        <div className=" mt-[10px] flex items-start justify-center p-[22px_72px_22px_21px] bg-linear-01 shadow-01 rounded-[10px] ">
          <span className=" font-normal text-[17px] leading-[22px] text-[#000]">
            {" "}
            Nếu cậu thấy không vui, cứ dùng nơi này để viết gì đó cho bản thân, dù
            chỉ là một câu chào cũng được ❤️
          </span>
        </div>

        <Form placeholder={'Hôm nay bạn như thế nào'} />
        <Feed/>
    </div>


    </div>
  )
}
