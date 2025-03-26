import React from 'react';
import { assets } from '../../assets/spotify-assets/assets/assets';

const SongList = ({ songs, setCurrentSong, currentSong, likedSongs, onLikeSong }) => {
  return (
    <div className="bg-gray-900 rounded-lg">
      {songs.map((song) => {
        const isLiked = likedSongs.some(s => s.id === song.id);
        
        return (
          <div 
            key={song.id}
            className={`flex items-center p-4 hover:bg-gray-800 cursor-pointer ${
              currentSong.id === song.id ? 'bg-gray-800' : ''
            }`}
          >
            <div 
              className="flex items-center flex-1"
              onClick={() => setCurrentSong(song)}
            >
              <img src={song.image} alt={song.name} className="w-12 h-12 rounded" />
              <div className="ml-4 flex-1">
                <div className="text-white font-medium">{song.name}</div>
                <div className="text-gray-400 text-sm">{song.artist || 'Unknown Artist'}</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onLikeSong(song);
                }}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <svg 
                  className={`w-5 h-5 transition-colors ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
              <div className="text-gray-400 w-16 text-right">{song.duration}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SongList; 