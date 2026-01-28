import React from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import HomeTrailer from './components/HomeTrailer'
import Trending from './components/Trending'
import LatestTrailers from './components/LatestTrailers'
import FreeToWatch from './components/FreeToWatch'
import WhatIsPopular from './components/WhatIsPopular'

const App = () => {
  return (
    <>
    <Home>
      <Navbar/>
      <HomeTrailer/>
      <Trending/>
      <LatestTrailers/>
      <WhatIsPopular/>
      <FreeToWatch/>
    </Home>
    </>
  )
}

export default App