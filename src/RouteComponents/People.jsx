import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "../utils/axios";
import PeopleCard from "../partials/PeopleCard";

const People = () => {
  const [peoplePopular, setPeoplePopular] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const getPeoplePopular = async () => {
    if (loading || !hasMore) return;
    
    try {
      setLoading(true);
      const endpoint = `/person/popular?page=${currentPage}`;
      const { data } = await axios.get(endpoint);
      
      const newPeople = data.results.filter(
        newPerson => !peoplePopular.some(existing => existing.id === newPerson.id)
      );
      
      setPeoplePopular(prev => [...prev, ...newPeople]);
      
      // End check
      if (newPeople.length === 0 || currentPage >= 1000) {
        setHasMore(false);
        console.log("No more people!");
      }
      
      console.log(`People Page ${currentPage}: ${newPeople.length} new (total: ${peoplePopular.length + newPeople.length})`);
    } catch (error) {
      console.log(" Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Intersection Observer
  const lastPersonRef = useCallback(node => {
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
      setPeoplePopular([]); // Reset
    }
    getPeoplePopular();
  }, [currentPage]);

  return (
    <div className="w-full h-full flex flex-col px-32.5 py-10 gap-6 bg-zinc-800">
      <h1 className="text-3xl text-white font-semibold">
        Popular People ({peoplePopular.length} loaded)
      </h1>
      
      <div className="movies flex flex-wrap gap-10 items-start justify-start">
        {peoplePopular.map((person, index) => (
          <div 
            ref={index === peoplePopular.length - 1 && hasMore ? lastPersonRef : null}
          >
            <PeopleCard person={person} />
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
      {!hasMore && peoplePopular.length > 0 && (
        <div className="w-full text-center py-12">
          <p className="text-gray-400 text-xl">🎉 All {peoplePopular.length} people loaded!</p>
        </div>
      )}
    </div>
  );
};

export default People;
