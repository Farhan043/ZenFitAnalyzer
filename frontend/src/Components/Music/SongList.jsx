import React from 'react';
import { assets } from '../../assets/spotify-assets/assets/assets';

const SongList = ({ songs, setCurrentSong, currentSong, likedSongs, onLikeSong }) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {songs.map((song) => {
        const isLiked = likedSongs.some(s => s.id === song.id);
        
        return (
          <div 
            key={song.id}
            className={`flex items-center p-3 sm:p-4 hover:bg-gray-800 cursor-pointer ${
              currentSong.id === song.id ? 'bg-gray-800' : ''
            }`}
          >
            <div 
              className="flex items-center flex-1 min-w-0"
              onClick={() => setCurrentSong(song)}
            >
              <img src={song.image} alt={song.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover flex-shrink-0" />
              <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                <div className="text-white font-medium truncate">{song.name}</div>
                <div className="text-gray-400 text-xs sm:text-sm truncate">{song.artist || 'Unknown Artist'}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onLikeSong(song);
                }}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <svg 
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
              <div className="text-gray-400 text-xs sm:text-sm w-12 sm:w-16 text-right">{song.duration}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SongList; 