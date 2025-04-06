import React from 'react';
import { assets } from '../../assets/spotify-assets/assets/assets';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="w-full relative mb-4">
      <img 
        src={assets.search_icon} 
        alt="Search" 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 opacity-70"
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for songs..."
        className="w-full pl-10 pr-4 py-2 sm:py-3 bg-gray-800 rounded-full text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
};

export default SearchBar; 