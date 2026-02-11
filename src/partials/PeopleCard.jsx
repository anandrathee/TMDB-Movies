import React from 'react';
import { IoMdHeartEmpty } from "react-icons/io";
import { Link } from 'react-router-dom';

const PeopleCard = ({ person, handleCardButton }) => {
  const PROFILE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const popularity = Math.round(person.popularity);

  return (
    <Link 
      to={`/person/${person.id}`}
      onClick={() => handleCardButton(person)} 
      className="container w-36 h-72 flex flex-col gap-4 hover:scale-105 transition-all duration-300"
    >
      {/* Profile Image */}
      <div className='w-36 h-68 rounded-lg relative overflow-hidden'>
        <img 
          className='w-full h-full bg-cover rounded-md object-cover' 
          src={`${PROFILE_BASE_URL}${person.profile_path}`} 
          alt={person.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/144x216/1a1a1a/ffffff?text=No+Image';
          }}
        />
        
        {/* Popularity Badge */}
        <div 
          className={`w-9 h-9 text-white font-bold text-xs rounded-full flex items-center justify-center absolute bottom-2 right-2 border-4 transition-all duration-300 ${
            popularity >= 50 ? 'bg-green-600 border-green-400' :
            popularity >= 30 ? 'bg-blue-500 border-blue-400' :
            popularity >= 10 ? 'bg-yellow-500 border-yellow-400' :
            'bg-orange-500 border-orange-400'
          }`}
        >
          {popularity}%
        </div>

        {/* Heart Icon */}
        <div className="heart absolute top-1 left-1 text-2xl text-red-500 opacity-70 hover:opacity-100 transition-opacity">
          <IoMdHeartEmpty />
        </div>
      </div>
      
      {/* Name & Popularity */}
      <div className="details pl-3 flex flex-col gap-1">
        <h1 className='font-bold line-clamp-2 text-white text-sm leading-tight'>
          {person.name || person.original_name}
        </h1>
        <p className='text-zinc-400 text-xs'>
          Popularity: {popularity}%
        </p>
      </div>
    </Link>
  );
};

export default PeopleCard;
