import React, { useContext } from 'react'
import Button from '../partials/Button'
import { MovieContext } from '../context/Context';
import MovieCard from '../partials/MovieCard';

const Trending = () => {
   const {trendingMovies, setTrendingMoviesWeek} = useContext(MovieContext);

   const handleBtn = (text)=>{
    setTrendingMoviesWeek(text);
   }

  return (
    <div className='w-full h-130 bg-zinc-900 px-38.5 pt-6 flex flex-col gap-10 '>
        <div className="top flex items-center justify-between px-4">
            <h1 className='text-white text-2xl font-semibold'>Trending</h1>
            <Button 
              text={"Today"} 
              text2={"This Week"} 
              handleBtn={handleBtn} 
              type="toggle"
            />
        </div>
        <div className="trendingContainer flex h-86 gap-10 overflow-x-auto">
            {trendingMovies.length > 0 ? (
          trendingMovies.map((elem,index)=>(
            <MovieCard key={index} movie={elem}/>
          ))
        ):(
          <p className="text-white text-lg ml-4">Loading...</p>
        )}
        </div>
    </div>
  )
}

export default Trending