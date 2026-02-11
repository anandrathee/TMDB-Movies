import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "../utils/axios";
import MovieCard from "../partials/MovieCard";

const Upcoming = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const getUpcomingMovies = async () => {
    if (loading || !hasMore) return;
    
    try {
      setLoading(true);
      const endpoint = `/movie/upcoming?page=${currentPage}`;
      const { data } = await axios.get(endpoint);
      
      // DUPLICATE CHECK + FILTER
      const newMovies = data.results.filter(
        newMovie => !upcomingMovies.some(existing => existing.id === newMovie.id)
      );
      
      setUpcomingMovies(prev => [...prev, ...newMovies]);
      
      // End check
      if (newMovies.length === 0 || currentPage >= 1000) {
        setHasMore(false);
        console.log("No more movies!");
      }
      
      console.log(`Page ${currentPage}: ${newMovies.length} new movies (total: ${upcomingMovies.length + newMovies.length})`);
    } catch (error) {
      console.log(" Error:", error);
    } finally {
      setLoading(false);
    }
  };

  //  Intersection Observer
  const lastMovieRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setCurrentPage(prev => prev + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [hasMore, loading]);

  useEffect(() => {
    if (currentPage === 1) {
      setUpcomingMovies([]); // Reset on first page
    }
    getUpcomingMovies();
  }, [currentPage]);

  return (
    <div className="w-full h-full flex flex-col px-32.5 py-10 gap-6 bg-zinc-800">
      <h1 className="text-3xl text-white font-semibold">
        Upcoming Movies ({upcomingMovies.length} loaded)
      </h1>
      
      <div className="movies flex flex-wrap gap-10 items-start justify-start">
        {upcomingMovies.map((elem, index) => (
          <div 
            key={`${elem.id}-${index}`} // COMPOSITE KEY - DUPLICATE ERROR GONE!
            ref={index === upcomingMovies.length - 1 && hasMore ? lastMovieRef : null}
          >
            <MovieCard movie={elem} />
          </div>
        ))}
      </div>

      {/* Loading spinner */}
      {loading && (
        <div className="w-full flex justify-center py-12">
          <div className="flex items-center gap-3 text-white text-lg">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            Loading page {currentPage}...
          </div>
        </div>
      )}

      {/* End message */}
      {!hasMore && upcomingMovies.length > 0 && (
        <div className="w-full text-center py-12">
          <p className="text-gray-400 text-xl">🎉 All {upcomingMovies.length} movies loaded!</p>
        </div>
      )}
    </div>
  );
};


export default Upcoming