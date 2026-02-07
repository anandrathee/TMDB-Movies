import React, { createContext, useCallback, useEffect, useState } from 'react'
import axios from '../utils/axios';

export const MovieContext = createContext()

const Context = ({ children }) => {
   const [trendingMovies, setTrendingMovies] = useState([]);
   const [trendingMoviesWeek, setTrendingMoviesWeek] = useState('today');
   const [latestTrailerCategory, setLatestTrailerCategory] = useState('popular');
   const [latestTrailers, setLatestTrailers] = useState([]);
   const [whatsPopular, setWhatsPopular] = useState([]);
   const [whatsPopularCategory, setWhatsPopularCategory] = useState('streaming');
   const [freeToWatchData, setFreeToWatchData] = useState([]);
   const [freeToWatchCategory, setFreeToWatchCategory] = useState('movies');
   const [searchQuery, setSearchQuery] = useState('');
   const [searchedData, setSearchedData] = useState([])

  //  console.log(searchedData)
 

  
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
        endpoint = '/trending/movie/day'; 
      }

        const { data } = await axios.get(endpoint);
        setTrendingMovies(data.results);
    }catch(error){
        console.log("Error fetching trending movies: ", error);
   }
   }

   // Latest Trailers API Call
 const getLatestTrailers = useCallback(async () => {


     try {
        let endpoint = '';
        let params = {};
        
        switch(latestTrailerCategory.toLowerCase()) {
            case 'streaming':
                endpoint = '/discover/movie';
                params = {
                    with_watch_providers: '8|9|337',
                    watch_region: 'IN',
                    sort_by: 'popularity.desc',
                    page: 1
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
        default: 
          endpoint = '/movie/popular';
      }
      
      const { data } = await axios.get(endpoint, { params });
      setLatestTrailers(data.results);
    }catch(error){
      console.log("Error fetching latest trailers: ", error);
    }
   }, [latestTrailerCategory]); 


    const getWhatsPopular = async ()=>{
    try{
      let endpoint = '';
      let params = {};
      
      switch(whatsPopularCategory.toLowerCase()) {
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
        default: 
          endpoint = '/discover/movie';
      }
      
      const { data } = await axios.get(endpoint, { params });
      setWhatsPopular(data.results);
    }catch(error){
      console.log("Error fetching latest trailers: ", error);
    }
   }


   const getFreeToWatchData = async ()=>{
  try {
    let endpoint = '';
    let params = {}; 
    
    
    if (freeToWatchCategory.toLowerCase() === 'movies') {
      endpoint = '/discover/movie';
      params = {
        with_watch_monetization_types: 'free', 
        watch_region: 'IN',
        sort_by: 'popularity.desc'
      };
    } else if (freeToWatchCategory.toLowerCase() === 'tv shows') {
      endpoint = '/discover/tv'; 
      params = {
        with_watch_monetization_types: 'free', 
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

const getSearchData = async () => {
  try {
    let endpoint;
    
    if (searchQuery.trim()) {
      endpoint = `/search/multi?query=${encodeURIComponent(searchQuery)}&page=1`;
    } else {
      endpoint = '/trending/all/week';
    }
    
    const { data } = await axios.get(endpoint);
    setSearchedData(data.results);
  } catch(error) {
    console.log("Search Error:", error.response?.data || error.message);
    setSearchedData([]);
  }
};

const handleMovie = ()=>{
  
}




   useEffect(()=>{
        getTrendingMovies();
   }, [trendingMoviesWeek]);

 useEffect(() => {
    getLatestTrailers();
}, [latestTrailerCategory]); 

   useEffect(()=>{
        getWhatsPopular();
   }, [whatsPopularCategory]);

    useEffect(()=>{
      getFreeToWatchData();
  }, [freeToWatchCategory]);

 useEffect(() => {
  const timeoutId = setTimeout(() => {
    getSearchData();
  }, 500);

  return () => clearTimeout(timeoutId); 
}, [searchQuery]);

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
    whatsPopular, 
    setWhatsPopular,
    whatsPopularCategory, 
    setWhatsPopularCategory,
    searchQuery,
    setSearchQuery,
    searchedData,
    setSearchedData,
    getSearchData,



   }

  return (
    <MovieContext.Provider value={moviesValues}>
      {children}
    </MovieContext.Provider>
  )
}

export default Context