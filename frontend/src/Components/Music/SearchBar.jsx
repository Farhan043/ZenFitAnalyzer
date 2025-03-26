import React from 'react';
import { assets } from '../../assets/spotify-assets/assets/assets';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative mt-7">
      <img 
        src={assets.search_icon} 
        alt="Search" 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for songs..."
        className="w-full pl-12 pr-4 py-3 bg-gray-800 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
};

export default SearchBar; 