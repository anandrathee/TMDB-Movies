import React, { useContext, useEffect, useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { MovieContext } from "../context/Context";
import TrailerPlayer from "./TrailerPlayer";

const ShowMovieDetails = () => {
  const {movieDetail} = useContext(MovieContext);

  const [showModal, setShowModal] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  const navigate = useNavigate();
  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

  // TMDB se trailer key lana
  const getMovieTrailer = async () => {
    try {
      const movieId = movieDetail?.id;
      if (!movieId) return;

      const res = await axios.get(`/movie/${movieId}/videos`);

      const trailer = res.data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );

      setTrailerKey(trailer?.key || "");
    } catch (error) {
      console.log("Error fetching movie trailer:", error);
    }
  };

  // Play button click
  const handlePlayClick = async () => {
    // agar key nahi hai to pehle fetch karo
    if (!trailerKey) {
      await getMovieTrailer();
    }

    // agar key mil gayi to modal khol do
    if (trailerKey) {
      setShowModal(true);
    } else {
      alert("Trailer not available for this movie");
    }
  };

  // jab MovieDetails pe aaye ya movie change ho
  useEffect(() => {
    if (!movieDetail || !movieDetail.id) {
      navigate("/");
    } else {
      setTrailerKey("");
      setShowModal(false);
      getMovieTrailer();
    }
  }, [movieDetail, navigate]);

  if (!movieDetail || !movieDetail.id) return null;

  return (
    <div className="movieDetails relative w-full h-[85vh] overflow-hidden text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-10 left-32 z-[95] bg-zinc-100 text-black font-semibold w-20 h-10 text-2xl rounded flex items-center justify-center gap-1"
      >
        <MdKeyboardBackspace />
      </button>

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-100"
        style={{
          backgroundImage: `url(${IMAGE_BASE}${movieDetail.backdrop_path})`,
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />

      {/* Content */}
      <div className="relative z-10 flex gap-10 px-20 py-16 h-full items-center">
        {/* Poster */}
        <div className="w-64 shrink-0 rounded-xl overflow-hidden shadow-2xl">
          <img
            src={`${IMAGE_BASE}${movieDetail.poster_path}`}
            alt={movieDetail.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl font-bold">
            {movieDetail.title || movieDetail.name}{" "}
            <span className="text-gray-300 font-normal">
              (
              {movieDetail.release_date
                ? movieDetail.release_date.slice(0, 4)
                : movieDetail.first_air_date
                ? movieDetail.first_air_date.slice(0, 4)
                : "N/A"}
              )
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
              {Math.round((movieDetail.vote_average || 0) * 10)}%
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
            <button
              onClick={handlePlayClick}
              className="flex items-center gap-2 text-white font-semibold hover:text-gray-300"
            >
              ▶ Play Trailer
            </button>
          </div>

          {/* Tagline */}
          {movieDetail.tagline && (
            <p className="italic text-gray-300 mt-4">
              {movieDetail.tagline}
            </p>
          )}

          {/* Overview */}
          <div>
            <h2 className="text-lg font-semibold mb-1">Overview</h2>
            <p className="text-gray-200 text-sm leading-relaxed">
              {movieDetail.overview}
            </p>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showModal && trailerKey && (
        <TrailerPlayer
          trailerKey={trailerKey}
          movie={movieDetail}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ShowMovieDetails;
