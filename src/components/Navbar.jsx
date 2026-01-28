import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (

    <div className='flex gap-8 bg-zinc-900 w-full h-16 items-center justify-start px-38.5 relative'>
      <div className='flex items-center justify-between w-[55%]'>

      <div className="logo z-50">
        <img className='w-42' src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="The Movie Database (TMDB)"></img>
      </div>
      <div className='z-50 text-zinc-100 font-bold text-sm flex items-center justify-center gap-12 '>
        {
            ["Movies", "TV Shows", "People", "More"].map((navLinks, index)=>(
                <Link key={index}>{navLinks}</Link>
            ))
        }
        </div>
        </div>
          <div className='w-full h-screen  top-0 left-0'>
            
              </div>

    </div>
  )
}

export default Navbar