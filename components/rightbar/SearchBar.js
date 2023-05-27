'use client'
import React,{useCallback} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
const SearchBar = () => {



    const handleSubmit = useCallback(
      (e) => {
        e.preventDefault
      },
      [],
    )

  return (
    <form onSubmit={handleSubmit} className='w-full flex items-center bg-linear-01 h-[48px] px-2 rounded-[15px] border-[2px] border-[#87A173] shadow-01'>
      <input type="text" placeholder='Tìm kiếm' className=' outline-none bg-inherit font-normal text-[22px] leading-[17px] text-green-01 placeholder:text-green-01 w-full' />
      <AiOutlineSearch size={24} className='text-green-01'/>
    </form>
  )
}

export default SearchBar
