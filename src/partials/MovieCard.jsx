import React from 'react'
import { IoMdHeartEmpty } from "react-icons/io";


const MovieCard = ({movie}) => {

     const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500'
      const rating = Math.round(movie.vote_average * 10)
  return (
     <div className="container  w-36 h-72 flex flex-col gap-4">
        <div className='w-36 h-68 rounded-lg relative'>
            <img className='w-full h-full bg-cover rounded-md'  src={`${POSTER_BASE_URL}${movie.poster_path} || ${movie.backdrop_path}`}
          alt={movie.title} />
           <div 
          className={`w-9 h-9 text-white font-bold text-xs rounded-full flex items-center justify-center absolute bottom-2 right-2 border-4 transition-all duration-300 ${
            rating >= 80 ? 'bg-green-600 border-green-400' :
            rating >= 60 ? 'bg-yellow-500 border-yellow-400' :
            rating >= 40 ? 'bg-orange-500 border-orange-400' :
            'bg-red-600 border-red-400'
          }`}
        >
          {rating}%
        </div>
        <div className="heart absolute top-1 left-1 text-3xl text-red-500">
            <IoMdHeartEmpty />

        </div>
        </div>
       
        <div className="details pl-3 flex flex-col gap-2">
        <h1 className='font-bold line-clamp-2 text-white'>{movie.title || movie.name}</h1>
        <p className='text-zinc-300 text-sm'>{movie.release_date || movie.first_air_date
}</p>

        </div>
    </div>
  )
}

export default MovieCard