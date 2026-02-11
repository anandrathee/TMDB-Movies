import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Navbar from "../components/Navbar";
import HomeTrailer from "../components/HomeTrailer";
import Trending from "../components/Trending";
import LatestTrailers from "../components/LatestTrailers";
import FreeToWatch from "../components/FreeToWatch";
import WhatIsPopular from "../components/WhatIsPopular";
import PopularMovies from "../RouteComponents/PopularMovies";
import SearchBar from "../partials/SearchBar";
import SearchMovies from "../components/SearchMovies";
import SearchedMovieDetails from "../components/SearchedMovieDetails";
import ShowMovieDetails from "../components/ShowMovieDetails";
import NowPlaying from "../RouteComponents/NowPlaying";
import Upcoming from "../RouteComponents/Upcoming";
import TopRated from "../RouteComponents/TopRated";
import TvAiringToday from "../RouteComponents/TvAiringToday";
import TvPopular from "../RouteComponents/TvPopular";
import OnTv from "../RouteComponents/OnTv";
import TvTopRated from "../RouteComponents/TvTopRated";
import People from "../RouteComponents/People";

const NavRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home>
            <HomeTrailer />
            <Trending />
            <LatestTrailers />
            <WhatIsPopular />
            <FreeToWatch />
          </Home>
        }
      />

        {/* MOVIES */}
      <Route path="/movies/popular" element={<PopularMovies />} />
      <Route path="/movies/now-playing" element={<NowPlaying />} />
      <Route path="/movies/upcoming" element={<Upcoming />} />
      <Route path="/movies/top-rated" element={<TopRated />} />
      
      {/* TV SHOWS */}
      <Route path="/tv-shows/airing-today" element={<TvAiringToday />} />
      <Route path="/tv-shows/popular" element={<TvPopular/>} />
      <Route path="/tv-shows/on-tv" element={<OnTv/>} />
      <Route path="/tv-shows/top-rated" element={<TvTopRated/>} />


      <Route path="/people/popular" element={<People/>} />
      
      {/* OTHERS */}
      <Route path="/search/movieDetails" element={<SearchedMovieDetails />} />
      <Route path="/movie-detail" element={<ShowMovieDetails />} />
      
      {/* 404 */}
      <Route path="*" element={<div className="p-20 text-white">404 - Page Not Found</div>} />
    </Routes>
  );
};

export default NavRoutes;
