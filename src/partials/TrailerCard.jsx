import React, { useEffect, useState, useContext } from 'react'
import axios from '../utils/axios';
import { IoMdHeartEmpty } from "react-icons/io";
import { FaPlay, FaTv } from "react-icons/fa";
import TrailerPlayer from '../components/TrailerPlayer'; 
import { MovieContext } from '../context/Context';

const TrailerCard = ({movie}) => {
    const { latestTrailerCategory } = useContext(MovieContext);
    
    
    const [trailerKey, setTrailerKey] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isTV, setIsTV] = useState(false)
    
    const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500'
    const rating = Math.round(movie.vote_average * 10)

    useEffect(() => {
        const isTVShow = latestTrailerCategory === "on tv" || (!movie.title && !!movie.name);
        setIsTV(isTVShow);
    }, [movie, latestTrailerCategory]);

    const fetchTrailer = async ()=>{
        try{
            setLoading(true)
            
            let endpoint = '';
            if (isTV) {
                endpoint = `/tv/${movie.id}/videos`;
                console.log("📡 Using TV endpoint for TV show");
            } else {
                endpoint = `/movie/${movie.id}/videos`;
               
            }
            
            const trailerRes = await axios.get(endpoint)
        
            if (!trailerRes.data.results || trailerRes.data.results.length === 0) {
                // console.log(`🚫 No videos found for ${movie.id}`);   
                return;
            }
            
            // YouTube trailer
            const trailer = trailerRes.data.results.find(v => 
                v.type === "Trailer" && v.site === "YouTube"
            );
            
            if(trailer){
                setTrailerKey(trailer.key)
            } else {
                console.log(`❌ No trailer found for ${movie.id}, looking for any YouTube video`);
                const anyVideo = trailerRes.data.results.find(v => v.site === "YouTube")
                if(anyVideo) {
                    console.log(`⚠️ Found YouTube video for ${movie.id}:`, anyVideo.key);
                    setTrailerKey(anyVideo.key)
                } else {
                    console.log(`🚫 No YouTube videos at all for ${movie.id}`);
                }
            }
        }catch(error){
            console.log("❌ Error fetching trailer: ", error);
            
            if (error.response?.status === 404) {
                console.log("🔄 404 Error - Trying alternative endpoint...");
                
                const altEndpoint = isTV 
                    ? `/movie/${movie.id}/videos` 
                    : `/tv/${movie.id}/videos`;    
                
                try {
                    const altRes = await axios.get(altEndpoint);
                    const altVideo = altRes.data.results?.find(v => v.site === "YouTube");
                    if (altVideo) {
                        console.log("✅ Alternative endpoint worked!");
                        setTrailerKey(altVideo.key);
                    }
                } catch (altError) {
                    console.log("❌ Alternative also failed");
                }
            }
        } finally {
            setLoading(false)
        }
    }

    const handlePlayClick = async () => {
        console.log(`▶️ Play clicked for ${isTV ? 'TV Show' : 'Movie'} ID: ${movie.id}`);
        
        if(!trailerKey) {
            await fetchTrailer();
        }
        
        if(trailerKey) {
            console.log(`🎬 Playing trailer: ${trailerKey}`);
            setShowModal(true)
        } else {
            console.log(`❌ No trailer available for ${movie.id}`);
            alert(`Trailer not available for this ${isTV ? 'TV show' : 'movie'}`)
        }
    }

    useEffect(()=>{
        setTrailerKey('');
        setShowModal(false);
        fetchTrailer();
    },[movie.id, isTV]) 

    return (
       <>
        <div className="container w-60 cursor-pointer group relative">
          
          {/* Category Badge */}
          <div className="absolute -top-8 left-0 bg-purple-600 text-white text-xs px-2 py-1 rounded z-50">
            {latestTrailerCategory.toUpperCase()}
          </div>
          
          {/* Content Type Badge */}
          <div className={`absolute -top-8 right-0 text-white text-xs px-2 py-1 rounded z-50 ${isTV ? 'bg-blue-600' : 'bg-red-600'}`}>
            {isTV ? '📺 TV SHOW' : '🎬 MOVIE'}
          </div>
          
          {/* Movie ID Debug */}
          <div className="absolute -top-16 left-0 bg-black/80 text-white text-xs p-1 rounded">
            ID: {movie.id}
          </div>

          <div 
            className='w-58 h-38 rounded-lg relative overflow-hidden mt-10'
            onClick={handlePlayClick}
          >
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
            
            {/* Poster */}
            <img 
                className='w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300'  
                src={`${POSTER_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
                alt={movie.title || movie.name}
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
            
            {/* Content Type Badge */}
            <div className={`absolute top-3 right-3 text-white text-xs px-2 py-1 rounded flex items-center gap-1
                ${isTV ? 'bg-blue-600' : 'bg-red-600'}`}>
                {isTV ? <FaTv size={10} /> : <FaPlay size={10} />}
                {isTV ? 'TV' : 'MOVIE'}
            </div>
          </div>
         
          {/* Details */}
          <div className="details pl-1 mt-3 flex flex-col gap-1">
            <h1 className='font-bold line-clamp-1 text-white group-hover:text-red-400 transition-colors'>
                {movie.title || movie.name}
            </h1>
            
            <div className="flex items-center gap-2">
                <p className='text-zinc-400 text-sm'>
                    {movie.release_date 
                        ? new Date(movie.release_date).getFullYear() 
                        : movie.first_air_date 
                            ? new Date(movie.first_air_date).getFullYear() 
                            : 'N/A'}
                </p>
                
                {/* <span className={`text-xs px-2 py-1 rounded ${isTV ? 'bg-blue-900/50' : 'bg-red-900/50'}`}>
                    {isTV ? 'TV Show' : 'Movie'}
                </span> */}
            </div>
            
            <p className="text-zinc-500 text-xs line-clamp-2">
                {movie.overview}
            </p>
            
            {/* Trailer Status */}
            <div className="mt-1">
                {loading && (
                    <div className="text-yellow-400 text-xs flex items-center gap-1">
                        <div className="w-3 h-3 border border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                        Loading trailer...
                    </div>
                )}
                {trailerKey && (
                    <p className="text-green-400 text-xs flex items-center gap-1">
                        <FaPlay size={10} /> Trailer available
                    </p>
                )}
                {!trailerKey && !loading && (
                    <p className="text-red-400 text-xs">❌ No trailer available</p>
                )}
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && trailerKey && (
            <TrailerPlayer 
                trailerKey={trailerKey}
                movie={movie}
                isTV={isTV}
                onClose={() => setShowModal(false)}
            />
        )}
       </>
    )
}

export default TrailerCard