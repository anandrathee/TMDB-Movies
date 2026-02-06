import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "../components/Home";
import Navbar from "../components/Navbar";
import HomeTrailer from "../components/HomeTrailer";
import Trending from "../components/Trending";
import LatestTrailers from "../components/LatestTrailers";
import FreeToWatch from "../components/FreeToWatch";
import WhatIsPopular from "../components/WhatIsPopular";
import PopularMovies from '../RouteComponents/PopularMovies'
import SearchBar from '../partials/SearchBar';

const NavRoutes = () => {
  return (
   <Routes>
        <Route
          path="/"
          element={
            <Home>
              <Navbar />
              <SearchBar/>
              <HomeTrailer />
              <Trending />
              <LatestTrailers />
              <WhatIsPopular />
              <FreeToWatch />
            </Home>
          }
        />

        <Route path="/movies/popular" element={<PopularMovies />} />
      </Routes>
  )
}

export default NavRoutes