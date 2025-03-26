import React from 'react';
import SongList from './SongList';
import { assets } from '../../assets/spotify-assets/assets/assets';

const LikedSongs = ({ likedSongs, setCurrentSong, currentSong, onLikeSong }) => {
  return (
    <div className="p-6">
      <div className="flex items-center mb-8">
        <div className="w-52 h-52 bg-gradient-to-br from-purple-700 to-blue-300 flex items-center justify-center rounded-lg shadow-lg">
          <img 
            src={assets.like_icon} 
            alt="Liked Songs" 
            className="w-24 h-24 filter brightness-0 invert"
          />
        </div>
        <div className="ml-6">
          <h1 className="text-3xl font-bold text-white mb-2">Liked Songs</h1>
          <p className="text-gray-400">{likedSongs.length} songs</p>
        </div>
      </div>

      {likedSongs.length > 0 ? (
        <SongList 
          songs={likedSongs}
          setCurrentSong={setCurrentSong}
          currentSong={currentSong}
          likedSongs={likedSongs}
          onLikeSong={onLikeSong}
        />
      ) : (
        <div className="text-center text-gray-400 mt-12">
          <p className="text-xl mb-4">Songs you like will appear here</p>
          <p>Save songs by tapping the heart icon</p>
        </div>
      )}
    </div>
  );
};

export default LikedSongs; 