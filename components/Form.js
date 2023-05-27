'use client'
import React, { useState, useCallback } from 'react'
import { toast } from 'react-hot-toast';
import Select, { components } from "react-select";
import Image from 'next/image';
import { signIn } from 'next-auth/react';

import usePosts from '@/hooks/usePosts';
import usePost from '@/hooks/usePost';
import useCurrentUser from '@/hooks/useCurrentUser';
import { tags } from './Tag';
import Avatar from './Avatar';
import Button from './Button';
import { ClipLoader } from "react-spinners";

const privacyOptions = [
  { value: "public", label: "Công khai" },
  { value: "private", label: "Chỉ mình tôi" },
  { value: "specialist", label: "Chỉ với chuyên gia" },
];



const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <Image src={"/assets/icons/more.svg"} alt="more" height={12} width={12} />
    </components.DropdownIndicator>
  );
};

const tagColorStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return { ...styles, color: data.color };
  },
  placeholder: (styles, { data }) => ({ ...styles, ...dot("#ccc") }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ...dot(data.color),
  }),
  dropdownIndicator: (styles) => ({ ...styles }),
};




const Form = ({ placeholder, isComment, postId }) => {
  const { data: currentUser , isLoading:isUserLoading } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId);
  const [post, setPost] = useState({ content: "", tag: "", privacyOption: '' });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

   

      if (!isComment) {
        await fetch('/api/posts', {
          method: "POST",
          body: JSON.stringify({
            content: post.content.split(/\r?\n/),
            tag: post.tag,
            privacyOption: post.privacyOption
          }),

        });
      } else {
        await fetch(`/api/comments?postId=${postId}`, {
          method: "POST",
          body: JSON.stringify({
            content: post.content.split(/\r?\n/),
          }),

        });
      }

      toast.success('Tweet created');
      setPost({ content: "", tag: "", privacyOption: '' })
      mutatePosts();
      mutatePost();
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [post, mutatePosts, isComment, postId,mutatePost]);


  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center h-full  ">
        <ClipLoader color="lightpink" size={80} />
      </div>
    )
  }


  return (
    <div className=' flex flex-col  px-5 py-2 bg-[#FFF] rounded-[10px] items-start gap-[10px]'>
      {currentUser ? <>  <div className="flex items-start w-full mb-[20px] gap-4 border-b-[1px]  ">
        <div>
          <Avatar userId={currentUser?.id} isLarge />
        </div>
        <div className="w-full">
          <textarea
            spellCheck={false}
            disabled={isLoading}
            onChange={(event) => setPost({ ...post, content: event.target.value })}
            value={post.content}
            className="
                min-h-[100px]
                disabled:opacity-80
                peer 
                w-full 
                bg-white 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-black
              "
            placeholder={placeholder}>
          </textarea>
        </div>

      </div>
        <div className="flex items-center justify-between pt-[20px] w-full ">
          <div className="flex items-center gap-4">
            {!isComment && <>

              <Select

                onChange={(Selection) => setPost({ ...post, privacyOption: Selection.value })}
                options={privacyOptions}

                components={{ DropdownIndicator }}
                classNames={{
                  control: () => " lg:min-w-[150px] text-sm",
                  input: () => "text-sm ",
                  option: () => "text-sm  ",
                }}
                isSearchable={false}
                placeholder="Quyền riêng tư"
                required
              />

              <Select
                options={tags}
                onChange={(Selection) => setPost({ ...post, tag: Selection.value })}
                components={{ DropdownIndicator }}
                classNames={{
                  control: () => " text-sm",
                  input: () => "text-sm",
                  option: () => "text-sm",
                }}
                styles={tagColorStyles}
                isSearchable={false}
                placeholder="Phân loại"
                required
              />

            </>}


          </div>

          <div className="flex flex-row justify-end items-center">
            {isComment ? (<Button disabled={isLoading || post.content === ""} onClick={onSubmit} small grey label={'Phản hồi'} />) : (<Button disabled={isLoading || post.content === "" || post.tag === "" || privacyOptions == ""} onClick={onSubmit} small grey label="Đăng bài" />)}

          </div>

        </div></> : <>
        <div className="py-8 self-center ">
          <h1 className="text-green-01 text-2xl text-center mb-4 font-bold">Chào mừng đến với EaseMe</h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label={'Đăng nhập'} green sm onClick={() => signIn()} />
          </div>
        </div>
      </>}

    </div>

  )
}

export default Form
