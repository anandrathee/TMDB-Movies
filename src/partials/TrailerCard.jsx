import React, { useEffect, useState } from 'react'
import axios from '../utils/axios';
import { IoMdHeartEmpty } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import TrailerPlayer from '../components/TrailerPlayer'; 

const TrailerCard = ({movie}) => {
    const [trailerKey, setTrailerKey] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500'
    const rating = Math.round(movie.vote_average * 10)

    const fetchTrailer = async ()=>{
        try{
            setLoading(true)
            const trailerRes = await axios.get(`/movie/${movie.id}/videos`)
            const trailer = trailerRes.data.results.find(v => 
                v.type === "Trailer" && v.site === "YouTube"
            );
            
            if(trailer){
                setTrailerKey(trailer.key)
            } else {
                const anyVideo = trailerRes.data.results.find(v => v.site === "YouTube")
                if(anyVideo) setTrailerKey(anyVideo.key)
            }
        }catch(error){
            console.log("Error fetching trailer: ", error);
        } finally {
            setLoading(false)
        }
    }

    const handlePlayClick = async () => {
        if(!trailerKey) {
            await fetchTrailer();
        }
        
        if(trailerKey) {
            setShowModal(true)
        } else {
            alert("Trailer not available for this movie")
        }
    }

    useEffect(()=>{
        fetchTrailer();
    },[])

    return (
       <>
        {/* Trailer Card */}
        <div className="container w-60 cursor-pointer group" onClick={handlePlayClick}>
          <div className='w-58 h-38 rounded-lg relative overflow-hidden'>
            {/* Play Button Overlay */}
            <div className="play absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                          w-14 h-14 bg-black/70 hover:bg-red-600 rounded-full 
                          flex items-center justify-center text-white text-2xl 
                          cursor-pointer transition-all duration-300 z-10
                          group-hover:scale-110 group-hover:bg-red-600">
                {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <FaPlay className="ml-1" />
                )}
            </div>
            
            {/* Movie Poster */}
            <img 
                className='w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300'  
                src={`${POSTER_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
            />
            
            {/* Rating Circle */}
            <div 
                className={`w-10 h-10 text-white font-bold text-xs rounded-full flex items-center justify-center 
                         absolute bottom-2 right-2 border-4 transition-all duration-300 backdrop-blur-sm
                         ${rating >= 80 ? 'bg-green-600/90 border-green-500' :
                           rating >= 60 ? 'bg-yellow-500/90 border-yellow-400' :
                           rating >= 40 ? 'bg-orange-500/90 border-orange-400' :
                           'bg-red-600/90 border-red-500'}`}
            >
                {rating}%
            </div>
            
            {/* Heart Icon */}
            <div className="heart absolute top-3 left-3 text-2xl text-white/80 hover:text-red-500 transition-colors">
                <IoMdHeartEmpty />
            </div>
            
            {/* Trailer Badge */}
            <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
                TRAILER
            </div>
          </div>
         
          {/* Movie Details */}
          <div className="details pl-1 mt-3 flex flex-col gap-1">
            <h1 className='font-bold line-clamp-1 text-white group-hover:text-red-400 transition-colors'>
                {movie.title || movie.name}
            </h1>
            <p className='text-zinc-400 text-sm'>
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 
                 movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : 'N/A'}
            </p>
            <p className="text-zinc-500 text-xs line-clamp-2">
                {movie.overview}
            </p>
          </div>
        </div>

        {/* Use Separate TrailerModal Component */}
        {showModal && trailerKey && (
            <TrailerPlayer 
                trailerKey={trailerKey}
                movie={movie}
                onClose={() => setShowModal(false)}
            />
        )}
       </>
    )
}

export default TrailerCard