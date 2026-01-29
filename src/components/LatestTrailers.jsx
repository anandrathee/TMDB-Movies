import React, { useContext } from 'react'
import Button from '../partials/Button'
import { MovieContext } from '../context/Context';
import MovieCard from '../partials/MovieCard';
import TrailerCard from '../partials/TrailerCard';

const LatestTrailers = () => {
    const {latestTrailers, setLatestTrailerCategory} = useContext(MovieContext);
    const btnText = ["popular", "streaming", "on tv", "for rent", "in theatres"];
    // console.log(latestTrailers)

   const handleBtn = (text)=>{
    setLatestTrailerCategory(text);
   }

  return (
      <div className='w-full h-100 bg-zinc-900 px-38.5 flex flex-col gap-10 '>
        <div className="top flex items-center justify-between px-4">
            <h1 className='text-white text-2xl font-semibold'>Latest Trailers</h1>
            <Button 
              text={btnText} 
              handleBtn={handleBtn} 
              type="multiple"
            />
        </div>
        <div className="trendingContainer h-72 flex gap-10 overflow-x-auto pb-4">
            {latestTrailers.length > 0 ? (
          latestTrailers.map((elem,index)=>(
            <TrailerCard key={index} movie={elem}/>
          ))
        ):(
          <p className="text-white text-lg ml-4">Loading...</p>
        )}
        </div>
    </div>
  )
}

export default LatestTrailers