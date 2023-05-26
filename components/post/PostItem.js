'use client'
import React, { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import vi from 'date-fns/locale/vi'
import {AiOutlineMessage} from 'react-icons/ai'
import { signIn } from 'next-auth/react';

import useCurrentUser from '@/hooks/useCurrentUser';
import Avatar from '../Avatar';
import { Tag, tags, findTagIndexByValue } from '../Tag';

import usePost from '@/hooks/usePost';
import usePosts from '@/hooks/usePosts';

const PostItem = ({ data, userId }) => {

    const [isTruncated, setIsTruncated] = useState(true)
    const router = useRouter();
    const { data: currentUser } = useCurrentUser();

    console.log(data.id)
    const { mutate: mutateFetchedPost } = usePost(data.id);
    const { mutate: mutateFetchedPosts } = usePosts(userId);




    const contentLength = useMemo(() => data.content.reduce((a, b) => {
        return (a + b)
    }).length
        , [data.content])


    const content = useMemo(() => {
        return data.content.map((line, index) => <p className='break-words text-[17px] leading-[22px] font-[400] text-[#000] ' key={index}>{line}</p>)
    }, [data.content])

    const tagIndex = findTagIndexByValue(data.tag, tags)

    const goToUser = useCallback((e) => {
        e.stopPropagation();
        if (currentUser?.id === data.user.id) {
            router.push(`/users/${data.user.id}`)
        } else {
            return
        }

    }, [router, data.user.id,currentUser]);

    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`);
    }, [router, data.id]);

     


    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }
        return format(new Date(data.createdAt), 'kk:mm a d/MM/y', { locale: vi })
    }, [data.createdAt])

   

    const hasLiked = useMemo(() => {
        const list = data.likedIds || [];
    
        return list.includes(currentUser?.id);
      }, [data.likedIds,currentUser]);



    const toggleLike = useCallback(async () => {
        if (!currentUser) {
          signIn()
        }
    
        try {
          let request;
    
          if (hasLiked) {
            request = () => fetch('/api/like',{method:"PUT",body:JSON.stringify({postId:data.id})});
        } else {
            request = () => fetch('/api/like',{method:"POST",body:JSON.stringify({postId:data.id})});
        }
    
          await request();
          mutateFetchedPost();
          mutateFetchedPosts();
    
          toast.success('Success');
        } catch (error) {
          toast.error('Something went wrong');
        }
      }, [currentUser, hasLiked, mutateFetchedPost,mutateFetchedPosts]);

      const onLike = useCallback(async (e) => {
        e.stopPropagation();

        if (!currentUser) {
          return signIn()
        }

        toggleLike();
      }, [currentUser, toggleLike]);

      const hugBtnImageUrl = hasLiked ? '/assets/icons/unhug.svg' :  '/assets/icons/hug.svg'
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
            <div className="flex items-center pl-[11px] justify-between gap-[24px] w-full">
                <div className="flex justify-center items-center gap-[25px]">
                    <div className=" flex items-center gap-1">
                        <span className=' font-normal text-[17px] leading-[22px] text-[#87A173]'>{data.likedIds.length}
                        </span>
                        <Image src={hugBtnImageUrl} alt='hug' width={26} height={29} className=' cursor-pointer' onClick={onLike} />
                    </div>
                    <span className=' font-normal text-[17px] leading-[22px] text-[#87A173]'> {createdAt}
                    </span>
                    <div className=" flex items-center gap-1">
                        <AiOutlineMessage size={20} className='text-[#87A173] cursor-pointer' onClick={goToPost} />
                        <span className=' font-normal text-[17px] leading-[22px] text-[#87A173]'>{data.comments.length}
                        </span>
                    </div>

                </div>
                <div className="flex justify-end items-center gap-[10px] ">
                    <Tag bg={tags[tagIndex].bg} color={tags[tagIndex].color} label={tags[tagIndex].label} />
                </div>
            </div>
        </div>
    )
}

export default PostItem
