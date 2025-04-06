import React from 'react';
import { assets } from '../../assets/spotify-assets/assets/assets';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ likedSongs, currentView, setCurrentView, closeSidebar }) => {
  const navigate = useNavigate();
  
  return (
    <div className="w-64 h-full bg-gray-900 flex flex-col overflow-hidden">
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <i className="ri-arrow-left-line text-white text-2xl cursor-pointer mr-3" 
              onClick={() => navigate('/home')}></i>
            <img src={assets.spotify_logo} alt="Spotify" className="h-8 hidden md:block" />
          </div>
          
          {/* Close button for mobile */}
          <button 
            onClick={closeSidebar}
            className="md:hidden text-gray-400 hover:text-white p-1"
            aria-label="Close sidebar"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 6.75L6.75 17.25"></path>
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.75 6.75L17.25 17.25"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-5">
        <ul className="space-y-6">
          <li 
            className={`flex items-center space-x-4 cursor-pointer ${
              currentView === 'home' ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setCurrentView('home')}
          >
            <img src={assets.home_icon} alt="Home" className="w-6 h-6" />
            <span className="font-medium">Home</span>
          </li>
          <li className="flex items-center space-x-4 text-gray-300 hover:text-white cursor-pointer">
            <img src={assets.search_icon} alt="Search" className="w-6 h-6" />
            <span className="font-medium">Search</span>
          </li>
          <li className="flex items-center space-x-4 text-gray-300 hover:text-white cursor-pointer">
            <img src={assets.stack_icon} alt="Library" className="w-6 h-6" />
            <span className="font-medium">Your Library</span>
          </li>
        </ul>

        <div className="mt-10">
          <h3 className="text-gray-400 uppercase text-xs font-bold mb-4 tracking-wider">Playlists</h3>
          <div 
            className={`flex items-center space-x-4 cursor-pointer p-2 rounded-md ${
              currentView === 'liked' ? 'bg-gray-800/60 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800/30'
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