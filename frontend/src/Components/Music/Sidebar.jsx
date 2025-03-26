import React from 'react';
import { assets } from '../../assets/spotify-assets/assets/assets';

const Sidebar = ({ likedSongs, currentView, setCurrentView }) => {
  return (
    <div className="w-64  bg-gray-900 p-6">
      <div className="mb-8">
        <img src={assets.spotify_logo} alt="Spotify" className="h-10" />
      </div>
      
      <nav>
        <ul className="space-y-4">
          <li 
            className={`flex items-center space-x-4 cursor-pointer ${
              currentView === 'home' ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setCurrentView('home')}
          >
            <img src={assets.home_icon} alt="Home" className="w-6 h-6" />
            <span>Home</span>
          </li>
          <li className="flex items-center space-x-4 text-gray-300 hover:text-white cursor-pointer">
            <img src={assets.search_icon} alt="Search" className="w-6 h-6" />
            <span>Search</span>
          </li>
          <li className="flex items-center space-x-4 text-gray-300 hover:text-white cursor-pointer">
            <img src={assets.stack_icon} alt="Library" className="w-6 h-6" />
            <span>Your Library</span>
          </li>
        </ul>

        <div className="mt-8">
          <h3 className="text-gray-400 uppercase text-sm font-bold mb-4">Playlists</h3>
          <div 
            className={`flex items-center space-x-4 cursor-pointer ${
              currentView === 'liked' ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setCurrentView('liked')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-700 to-blue-300 flex items-center justify-center rounded">
              <img src={assets.like_icon} alt="Liked Songs" className="w-6 h-6 filter brightness-0 invert" />
            </div>
            <div>
              <div className="font-medium">Liked Songs</div>
              <div className="text-sm text-gray-400">{likedSongs.length} songs</div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar; 