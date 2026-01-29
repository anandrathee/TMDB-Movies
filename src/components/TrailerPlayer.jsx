import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { IoMdHeartEmpty } from "react-icons/io";

const TrailerPlayer = ({ trailerKey, movie, onClose }) => {
    const rating = Math.round(movie.vote_average * 10)
    
    return (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-3xl bg-zinc-900 rounded-xl overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 rounded-full bg-black/70 hover:bg-black text-white p-2 z-50 transition-colors"
                >
                    <RxCross2 className='text-white text-xl' />
                </button>
                
                {/* YouTube Player */}
                <div className="aspect-video w-full">
                    <iframe
                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={`${movie.title} Trailer`}
                    />
                </div>
                
                {/* Movie Details */}
                <div className="p-6 text-white">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">{movie.title || movie.name}</h2>
                            <div className="flex items-center gap-4 mt-2">
                                <span className="text-green-400 font-semibold">{rating}% Rating</span>
                                <span>•</span>
                                <span>
                                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 
                                     movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : 'N/A'}
                                </span>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors">
                            <IoMdHeartEmpty /> Add to Watchlist
                        </button>
                    </div>
                    
                    <p className="mt-4 text-gray-300">{movie.overview}</p>
                    
                    <div className="mt-6 flex gap-4">
                        <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition-colors">
                            Watch Movie
                        </button>
                        <button className="border border-gray-600 hover:border-white px-6 py-2 rounded-lg transition-colors">
                            More Info
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrailerPlayer