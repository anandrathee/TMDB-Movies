import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { MdKeyboardBackspace } from "react-icons/md";

const PersonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchPersonDetails = async () => {
      if (!id) {
        setError("No person ID in URL");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log("🔍 Loading person ID:", id);

        // Person details
        const personRes = await axios.get(`/person/${id}?language=en-US`);
        setPerson(personRes.data);
        console.log("✅ Person loaded:", personRes.data.name);

        // Movies
        const moviesRes = await axios.get(`/person/${id}/movie_credits?language=en-US`);
        setMovies(moviesRes.data.cast.slice(0, 8));

        // TV Shows
        const tvRes = await axios.get(`/person/${id}/tv_credits?language=en-US`);
        setTvShows(tvRes.data.cast.slice(0, 8));

      } catch (error) {
        console.error("❌ Error:", error.response?.data || error.message);
        setError(error.response?.data?.status_message || "Failed to load person");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-zinc-900 p-10">
        <div className="text-white text-xl flex items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading person details... (ID: {id})</span>
        </div>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white px-10 py-20 gap-6">
        <h1 className="text-5xl font-bold text-red-500">Person Not Found</h1>
        <p className="text-xl text-zinc-400">ID: {id}</p>
        <p className="text-lg text-zinc-500">{error}</p>
        <button 
          onClick={() => navigate(-1)}
          className="px-12 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold text-lg transition-all shadow-xl"
        >
          ← Go Back to People
        </button>
      </div>
    );
  }

  const popularity = Math.round(person.popularity || 0);

  return (
    <div className="w-full min-h-screen text-white bg-zinc-900/95">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 z-50 bg-white/90 backdrop-blur-sm text-black font-bold px-6 py-3 rounded-2xl shadow-2xl hover:bg-white transition-all text-lg flex items-center gap-2"
      >
        <MdKeyboardBackspace className="text-xl" />
        Back
      </button>

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-10 max-w-7xl mx-auto">
        {/* Background Image */}
        {person.profile_path && (
          <div 
            className="absolute inset-0 -top-24 bg-cover bg-center bg-no-repeat brightness-50 -z-10"
            style={{ backgroundImage: `url(${IMAGE_BASE}${person.profile_path})` }}
          />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/90" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Profile Image */}
          <div className="lg:col-span-1">
            <div className="w-full max-w-sm mx-auto lg:mx-0">
              <div className="relative group">
                <img
                  src={`${IMAGE_BASE}${person.profile_path}`}
                  alt={person.name}
                  className="w-full aspect-2/3 object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-all duration-500"
                />
                
                {/* Popularity Badge */}
                <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-3xl flex flex-col items-center justify-center text-white font-bold shadow-2xl transform rotate-6 ${
                  popularity >= 50 ? 'bg-green-600' :
                  popularity >= 30 ? 'bg-blue-500' :
                  popularity >= 10 ? 'bg-yellow-500' :
                  'bg-orange-500'
                }`}>
                  <div className="text-2xl font-black">{popularity}</div>
                  <div className="text-xs uppercase tracking-widest">POP</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Name & Header */}
            <div>
              <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight bg-linear-to-r from-white to-zinc-200 bg-clip-text text-transparent">
                {person.name}
              </h1>
              
              {person.original_name !== person.name && (
                <p className="text-2xl text-zinc-400 italic mb-6">
                  "{person.original_name}"
                </p>
              )}

              <div className="flex flex-wrap gap-4 mb-8">
                <span className="px-6 py-3 bg-zinc-700/50 backdrop-blur-sm rounded-2xl font-semibold text-lg">
                  {person.known_for_department?.toUpperCase()}
                </span>
                <span className="px-6 py-3 bg-blue-600/30 backdrop-blur-sm rounded-2xl font-semibold text-lg">
                  {movies.length + tvShows.length} Credits
                </span>
                <span className="px-6 py-3 bg-green-600/30 backdrop-blur-sm rounded-2xl font-semibold text-lg">
                  {popularity}% Popularity
                </span>
              </div>
            </div>

            {/* Biography */}
            {person.biography && (
              <div className="bg-zinc-800/50 backdrop-blur-md p-8 rounded-3xl border border-zinc-700/50">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Biography
                </h2>
                <p className="text-lg leading-relaxed text-zinc-200 max-h-48 overflow-y-auto whitespace-pre-wrap">
                  {person.biography}
                </p>
              </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-zinc-800/50 backdrop-blur-sm p-8 rounded-3xl text-center border border-zinc-700/50 hover:bg-zinc-800/70 transition-all">
                <div className="text-zinc-500 uppercase tracking-wider text-sm mb-2">Movies</div>
                <div className="text-4xl font-black text-blue-400">{movies.length}</div>
              </div>
              <div className="bg-zinc-800/50 backdrop-blur-sm p-8 rounded-3xl text-center border border-zinc-700/50 hover:bg-zinc-800/70 transition-all">
                <div className="text-zinc-500 uppercase tracking-wider text-sm mb-2">TV Shows</div>
                <div className="text-4xl font-black text-purple-400">{tvShows.length}</div>
              </div>
              <div className="bg-zinc-800/50 backdrop-blur-sm p-8 rounded-3xl text-center border border-zinc-700/50 hover:bg-zinc-800/70 transition-all">
                <div className="text-zinc-500 uppercase tracking-wider text-sm mb-2">Popularity</div>
                <div className="text-4xl font-black text-green-400">{popularity}%</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="w-16 h-16 bg-zinc-700 hover:bg-zinc-600 rounded-3xl flex items-center justify-center text-2xl transition-all shadow-xl hover:scale-110">
                <span>❤</span>
              </button>
              <button className="w-16 h-16 bg-zinc-700 hover:bg-zinc-600 rounded-3xl flex items-center justify-center text-2xl transition-all shadow-xl hover:scale-110">
                <span>⭐</span>
              </button>
              <button className="px-12 py-4 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-3xl font-bold text-xl transition-all shadow-2xl hover:shadow-3xl hover:-translate-y-1">
                View Full Credits
              </button>
            </div>
          </div>
        </div>

        {/* Credits Preview */}
        {(movies.length > 0 || tvShows.length > 0) && (
          <div className="mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Movies */}
              {movies.length > 0 && (
                <div>
                  <h3 className="text-4xl font-bold mb-10 flex items-center gap-3">
                    Movies 
                    <span className="text-blue-400 text-xl">({movies.length})</span>
                  </h3>
                  <div className="grid grid-cols-4 gap-4">
                    {movies.slice(0, 8).map((movie) => (
                      <div key={movie.id} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                        <img
                          src={`https://image.tmdb.org/t/p/w185${movie.poster_path || movie.backdrop_path}`}
                          alt={movie.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-lineaer-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-all p-4 flex items-end">
                          <p className="text-white font-semibold text-sm line-clamp-3">{movie.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TV Shows */}
              {tvShows.length > 0 && (
                <div>
                  <h3 className="text-4xl font-bold mb-10 flex items-center gap-3">
                    TV Shows 
                    <span className="text-purple-400 text-xl">({tvShows.length})</span>
                  </h3>
                  <div className="grid grid-cols-4 gap-4">
                    {tvShows.slice(0, 8).map((show) => (
                      <div key={show.id} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                        <img
                          src={`https://image.tmdb.org/t/p/w185${show.poster_path || show.backdrop_path}`}
                          alt={show.name}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-all p-4 flex items-end">
                          <p className="text-white font-semibold text-sm line-clamp-3">{show.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonDetails;
