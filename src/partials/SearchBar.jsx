import React, { useContext, useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { MovieContext } from '../context/Context';
import SearchMovies from '../components/SearchMovies';

const SearchBar = () => {
  const { searchQuery, setSearchQuery, getSearchData, searchedData } = useContext(MovieContext);

 const [isSearchBar, setIsSearchBar] = useState(false)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getSearchData();
    }
  };

  

  return (
    <div className='h-10 px-38.5 flex items-center justify-start gap-2'>
      <IoSearch />
      <input 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className='w-full outline-none' 
        type="text" 
        placeholder='Search for a movie, tv show, person...'
      />
  {
    searchQuery.length > 0 ?(
      <SearchMovies/>
    ):("")
  }

  

    </div>
  )
}

export default SearchBar;
