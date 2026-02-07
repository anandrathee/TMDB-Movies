import React, { useContext, useEffect, useState } from 'react'
import { MovieContext } from '../context/Context'
import SearchItemCard from '../partials/SearchItemCard'

const SearchMovies = () => {
 const {searchedData, setSearchedData, setSearchAddedItem} = useContext(MovieContext);

//  console.log(addedItem);

const handleMovieBtn = (itemId) => {
  const movie = searchedData.find(m => m.id === itemId);
  setSearchAddedItem(movie);
};

 
  return (
     <div className="searchItem absolute w-120 rounded-b h-96 overflow-y-auto top-26  bg-zinc-300 left-40 z-96 p-2 rounded flex flex-col gap-2">
      {
        searchedData.length > 0 ? (
          searchedData.map((item)=>(
            <SearchItemCard item={item} key={item.id} handleMovieBtn={handleMovieBtn}/>
          ))
        ):("")
      }

      
     </div>
  )
}

export default SearchMovies