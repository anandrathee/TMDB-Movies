import React, { createContext, useEffect, useState } from 'react'
import axios from '../utils/axios';

export const MovieContext = createContext()

const Context = ({ children }) => {
    const [trendingMovies, setTrendingMovies] = useState([]);
   const [trendingMoviesWeek, setTrendingMoviesWeek] = useState('today');
   const [latestTrailerCategory, setLatestTrailerCategory] = useState('popular');
   const [latestTrailers, setLatestTrailers] = useState([]);
   const [freeToWatchData, setFreeToWatchData] = useState([]);
   const [freeToWatchCategory, setFreeToWatchCategory] = useState('movies');
 
   // Trending Movies API Call
   const getTrendingMovies = async ()=>{
    try{

      let endpoint = '';
      let params = {};

      if(trendingMoviesWeek.toLocaleLowerCase() === 'today'){
        endpoint = '/trending/movie/day';

      }else if(trendingMoviesWeek.toLocaleLowerCase() === 'this week'){
        endpoint = '/trending/movie/week';
      } else{
        endpoint = '/trending/movie/day'; // Default to today
      }

        const { data } = await axios.get(endpoint);
        setTrendingMovies(data.results);
    }catch(error){
        console.log("Error fetching trending movies: ", error);
   }
   }

   // Latest Trailers API Call
   const getLatestTrailers = async ()=>{
    try{
      let endpoint = '';
      let params = {};
      
      // Category ke hisaab se endpoint set karo
      switch(latestTrailerCategory.toLowerCase()) {
        case 'streaming':
          endpoint = '/discover/movie';
          params = {
            with_watch_providers: '8|9|337',
            watch_region: 'IN'
          };
          break;
        case 'on tv':
          endpoint = '/tv/on_the_air';
          break;
        case 'for rent':
          endpoint = '/discover/movie';
          params = {
            with_watch_monetization_types: 'rent'
          };
          break;
        case 'in theatres':
          endpoint = '/movie/now_playing';
          break;
        default: // 'popular'
          endpoint = '/movie/popular';
      }
      
      const { data } = await axios.get(endpoint, { params });
      setLatestTrailers(data.results);
    }catch(error){
      console.log("Error fetching latest trailers: ", error);
    }
   }

   const getFreeToWatchData = async ()=>{
  try {
    let endpoint = '';
    let params = {}; 
    
    // Category ke hisaab se endpoint set karo
    if (freeToWatchCategory.toLowerCase() === 'movies') {
      endpoint = '/discover/movie';
      params = {
        with_watch_monetization_types: 'free', // FREE movies filter
        watch_region: 'IN',
        sort_by: 'popularity.desc'
      };
    } else if (freeToWatchCategory.toLowerCase() === 'tv shows') {
      endpoint = '/discover/tv'; // TV shows endpoint
      params = {
        with_watch_monetization_types: 'free', // FREE TV shows
        watch_region: 'IN',
        sort_by: 'popularity.desc'
      };
    } else {
      endpoint = '/discover/movie';
      params = {
        with_watch_monetization_types: 'free',
        watch_region: 'IN',
         sort_by: 'popularity.desc'
      };
    }
    
    const { data } = await axios.get(endpoint, {params});
    setFreeToWatchData(data.results);
  } catch(error) {
    console.log("Error fetching free to watch data: ", error);
  }
}



   // API Calls on component mount and dependency change
   useEffect(()=>{
        getTrendingMovies();
   }, [trendingMoviesWeek]);

   useEffect(()=>{
        getLatestTrailers();
   }, [latestTrailerCategory]);

    useEffect(()=>{
      getFreeToWatchData();
  }, [freeToWatchCategory]);

   // Context values
   const moviesValues = {
    trendingMovies, 
    setTrendingMovies,
    trendingMoviesWeek,
    setTrendingMoviesWeek,
    latestTrailers,
    setLatestTrailers,
    latestTrailerCategory,
    setLatestTrailerCategory,
    freeToWatchData,
    setFreeToWatchData,
    freeToWatchCategory,
    setFreeToWatchCategory,

   }

  return (
    <MovieContext.Provider value={moviesValues}>
      {children}
    </MovieContext.Provider>
  )
}

export default Context