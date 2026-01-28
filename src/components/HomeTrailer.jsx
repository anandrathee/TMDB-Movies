import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../context/Context";
import axios from "../utils/axios";

const HomeTrailer = () => {
  const { trendingMovies } = useContext(MovieContext);
  const [currentMovieDetails, setCurrentMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  // console.log(currentMovieDetails)



  useEffect(() => {
    getTrendingTrailer();
  }, [trendingMovies]);

   const getTrendingTrailer = async () => {
    try {
      const randomNumber = Math.floor(Math.random() * 20);
      setCurrentMovieDetails(trendingMovies[randomNumber]);
      const movieId = trendingMovies[randomNumber]?.id;
      if (!movieId) return;

      const response = await axios.get(`/movie/${movieId}/videos`);
      const trailer = response.data.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
      );
      setTrailerKey(trailer?.key || '');
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="w-full h-[90vh] bg-linear-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="details absolute top-[40%] left-0 w-full px-8 flex justify-between items-center">
        <div className="left_detail w-1/2 flex flex-col gap-6 pl-10">
          <h1 className="text-white text-5xl font-bold">{currentMovieDetails?.title}</h1>
          <p className="text-white w-140 font-semibold text-lg">{currentMovieDetails?.overview}</p>
          </div> 
        <div className="right_detail"></div> 
      </div>
    {trailerKey ? (
      // ✅ Trailer mil gaya
      
    <iframe
  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=1&loop=1&playlist=${trailerKey}`}
  className="w-full h-full"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
    ) : (
      // ✅ Loading state
      <div className="w-full h-full flex items-center justify-center text-white text-xl">
        Loading trending trailer...
      </div>
    )}
  </div>
  );
};

export default HomeTrailer;
