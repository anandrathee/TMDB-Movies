import React from 'react'
import NO_IMAGE_URL from '../public/NoImage.png'
import { Link } from 'react-router-dom'

const SearchItemCard = ({item, handleMovieBtn}) => {
  const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500'  

  return (
    <Link to="/search/movieDetails" onClick={()=>handleMovieBtn(item.id)} className='w-full h-18 bg-zinc-100 flex items-center justify-start gap-4 p-2 rounded cursor-pointer hover:bg-zinc-200 transition-all'>
      <div className="img w-16 h-16">
        <img 
          className='w-full h-full rounded object-cover' 
          src={item.poster_path ? `${POSTER_BASE_URL}${item.poster_path}` : NO_IMAGE_URL}
          alt={item.title}

        />
      </div>

      <div className="info flex-1 min-w-0">
        <h1 className='font-semibold text-sm truncate' title={item.title}>
          {item.title || item.name || 'Untitled'}
        </h1>
        {item.release_date && (
          <p className='text-xs text-gray-500'>
            {new Date(item.release_date).getFullYear()}
          </p>
        )}
      </div>
    </Link>
  )
}

export default SearchItemCard
