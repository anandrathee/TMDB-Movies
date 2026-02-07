import React, { useContext, useEffect } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";


import { MovieContext } from "../context/Context";

const MovieDetails = () => {
 const { searchAddedItem } = useContext(MovieContext);
  const navigate = useNavigate();
  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

  // ✅ redirect if no movie selected
  useEffect(() => {
    if (!searchAddedItem || !searchAddedItem.id) {
      navigate("/");
    }
  }, [searchAddedItem, navigate]);

  if (!searchAddedItem || !searchAddedItem.id) return null;
  return (
    <div className="relative w-full h-screen text-white overflow-hidden">
      <div className="backBtn">
        <button onClick={() => navigate(-1)} className="text-white absolute top-28 left-32 z-95 bg-zinc-800 font-semibold px-3 py-2 rounded flex items-center justify-center gap-1 ">
 Go Back</button>
      </div>
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url(${IMAGE_BASE}${searchAddedItem.backdrop_path})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />

      {/* Content */}
      <div className="relative z-10 flex gap-10 px-20 py-16 h-full items-center">

        {/* Poster */}
        <div className="w-[260px] shrink-0 rounded-xl overflow-hidden shadow-2xl">
          <img
            src={`${IMAGE_BASE}${searchAddedItem.poster_path}`}
            alt={searchAddedItem.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl font-bold">
            {searchAddedItem.title}{" "}
            <span className="text-gray-300 font-normal">
              ({searchAddedItem.release_date?.slice(0, 4)})
            </span>
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span className="px-2 py-1 border border-gray-400 rounded">
              U/A 16+
            </span>
            <span>Drama • Crime</span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-4 mt-2">
            <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center font-bold">
              {Math.round(searchAddedItem.vote_average * 10)}%
            </div>
            <span className="font-semibold">User Score</span>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-4">
            <button className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-zinc-700">
              ❤
            </button>
            <button className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-zinc-700">
              🔖
            </button>
            <button className="flex items-center gap-2 text-white font-semibold hover:text-gray-300">
              ▶ Play Trailer
            </button>
          </div>

          {/* Tagline */}
          {searchAddedItem.tagline && (
            <p className="italic text-gray-300 mt-4">
              {searchAddedItem.tagline}
            </p>
          )}

          {/* Overview */}
          <div>
            <h2 className="text-lg font-semibold mb-1">Overview</h2>
            <p className="text-gray-200 text-sm leading-relaxed">
              {searchAddedItem.overview}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
