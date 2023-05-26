import React,{useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation';
import useCurrentUser from '@/hooks/useCurrentUser';

import Avatar from '../Avatar'




const CommentItem = ({ data = {} }) => {

    const [isTruncated, setIsTruncated] = useState(true)
    const router = useRouter();
    const { data: currentUser } = useCurrentUser();
    const contentLength = useMemo(() => data.content.reduce((a, b) => {
        return (a + b)
    }).length
        , [data.content])
    
    
    const content = useMemo(() => {
        return data.content.map((line, index) => <p className='break-words text-[17px] leading-[22px] font-[400] text-[#000] ' key={index}>{line}</p>)
    }, [data.content])


    const goToUser = useCallback((e) => {
        e.stopPropagation();
        if (currentUser?.id === data.user.id) {
            router.push(`/users/${data.user.id}`)
        } else {
            return
        }

    }, [router, data.user.id,currentUser]);



  return (
    <div className=' flex flex-col items-start p-[10px] gap-[15px] bg-[#FFF] rounded-[10px]'>
       <div className="flex items-center gap-[9px]">
                <Avatar isLarge userId={data.user.id} />
                <span className=" cursor-pointer flex h-full items-center font-semibold text-[20px] leading-[25px]" onClick={goToUser}>{currentUser?.id === data.user.id ? `${data.user.name}` : `Người dùng ẩn danh`}</span>
                <span className=' font-normal text-[20px] leading-[25px]'>
                    {data.privacyOption}
                </span>
            </div>
            <div className={` ${contentLength > 100 && isTruncated && `max-h-[150px] post-gradient`} min-h-[100px]  flex flex-col overflow-hidden w-full rounded-lg px-2  bg-[#FFF]  outline-0 `} >
                {content}
            </div>
            {contentLength > 100 && <button className=" self-center text-[17px] text-black/30 px-2" onClick={() => setIsTruncated((prev) => !prev)}>{isTruncated ? 'xem thêm' : 'rút gọn'}</button>}
    </div>
  )
}

export default CommentItem
