import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const dropdownItems = {
    "Movies": ["Popular", "Now Playing", "Upcoming", "Top Rated"],
    "TV Shows": ["Popular", "Airing Today", "On TV", "Top Rated"],
    "People": ["Popular People"],
    "More": ["Discussions", "Leaderboard", "Support", "API"]
  };

  const handleMouseEnter = (menu) => {
    setHoveredMenu(menu);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  return (
    <div className="flex gap-8 bg-zinc-900 w-full h-16 items-center justify-start px-38.5">
      <div className="flex items-center justify-between w-[55%]">
        <div className="logo z-50">
          <img
            className="w-42"
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="The Movie Database (TMDB)"
          />
        </div>

        <div className="z-50 text-zinc-100 font-bold text-sm flex items-center justify-center gap-12">
          {Object.keys(dropdownItems).map((menu) => (
            <div
              key={menu}
              className="relative"
              onMouseEnter={() => handleMouseEnter(menu)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                className={`cursor-pointer hover:text-white transition-colors ${
                  hoveredMenu === menu ? "text-white" : ""
                }`}
              >
                {menu}
              </Link>

              {/* Dynamic Dropdown for each menu */}
              {hoveredMenu === menu && dropdownItems[menu].length > 0 && (
                <div
                  className="absolute top-5 -left-4 bg-white rounded-md py-3 text-black flex flex-col min-w-48 shadow-xl z-50"
                  onMouseEnter={() => setHoveredMenu(menu)}
                  onMouseLeave={handleMouseLeave}
                >
                  {dropdownItems[menu].map((item) => (
                    <Link 
                    to={`/${menu.toLowerCase()}/${item.toLowerCase()}`}
                      key={item}
                      className="font-medium hover:bg-zinc-100 px-4 py-2 cursor-pointer transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;