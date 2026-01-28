import React, { useContext } from 'react'
import Button from '../partials/Button'
import { MovieContext } from '../context/Context';
import MovieCard from '../partials/MovieCard';

const FreeToWatch = () => {
   const {freeToWatchData, setFreeToWatchCategory} = useContext(MovieContext);

   const handleBtn = (text)=>{
    setFreeToWatchCategory(text);
   }

  return (
    <div className='w-full h-130 bg-zinc-900 px-38.5 pt-6 flex flex-col gap-10 '>
        <div className="top flex items-center justify-between px-4">
            <h1 className='text-white text-2xl font-semibold'>Free To Watch</h1>
            <Button 
              text={"Movies"} 
              text2={"Tv Shows"} 
              handleBtn={handleBtn} 
              type="toggle"
            />
        </div>
        <div className="trendingContainer flex h-86 gap-10 overflow-x-auto">
            {freeToWatchData.length > 0 ? (
          freeToWatchData.map((elem,index)=>(
            <MovieCard key={index} movie={elem}/>
          ))
        ):(
          <p className="text-white text-lg ml-4">Loading...</p>
        )}
        </div>
    </div>
  )
}

export default FreeToWatch