'use client'
import React from 'react'





const Support = () => {
  return (
    <div className="flex flex-col justify-center items-start p-2 gap-[18px] shadow-01 bg-linear-01 rounded-[15px] w-full]">
        <h2 className=' font-medium text-[17px] leading-[22px] flex items-center justify-center text-[#87A273]'>Cậu cần hỗ trợ gì?</h2>
        <div className="flex flex-col items-start gap-[25px]  w-full ">
           <span className='font-light leadng-[14px] text-[#000000]'>
            Nếu cậu đang thấy không ổn và cần sự hỗ trợ ngay lập tức, hãy liên hệ hotline EaseMe:
           </span>
           <a className='text-[#BC2525] font-bold leading-[18px] text-[14px]'  href='tel:(+84) 123 456 789'>(+84) 123 456 789</a>
        </div>
    </div>
  )
}

export default Support