import React from 'react'
import { IoSearch } from "react-icons/io5";


const SearchBar = () => {
  return (
    <div className='h-10 px-38.5 flex items-center justify-start gap-2'>
        <IoSearch />


        <input className='w-full outline-none' type="text" placeholder='Search for a movie, tv show, person...' />
    </div>
  )
}

export default SearchBar