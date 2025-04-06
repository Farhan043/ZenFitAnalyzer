import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/spotify-assets/assets/assets';

const MusicPlayer = ({ currentSong, isPlaying, onPlayPause, onNext, onPrev, audioRef, isLiked, onLikeSong }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    // Handle player view on smaller screens
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleProgressChange = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    audioRef.current.currentTime = time;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-900 border-t border-gray-800 px-3 sm:px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center">
      <audio
        ref={audioRef}
        src={currentSong.file}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
      />
      
      {/* Song info */}
      <div className="w-full sm:w-1/4 flex items-center justify-between mb-3 sm:mb-0">
        <div className="flex items-center">
          <img src={currentSong.image} alt={currentSong.name} className="h-12 w-12 sm:h-14 sm:w-14 rounded object-cover" />
          <div className="ml-3 overflow-hidden max-w-[120px] sm:max-w-none">
            <div className="text-white font-medium truncate text-sm sm:text-base">{currentSong.name}</div>
            <div className="text-gray-400 text-xs sm:text-sm truncate">{currentSong.artist}</div>
          </div>
        </div>
        
        {/* Like button only on larger screens */}
        {!isMobile && (
          <button 
            onClick={onLikeSong}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <svg 
              className={`w-5 h-5 transition-colors ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`}
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        )}
      </div>

      {/* Controls and progress - always visible */}
      <div className="w-full sm:flex-1 flex flex-col items-center">
        <div className="flex items-center space-x-4 sm:space-x-6 mb-2">
          <button 
            onClick={onPrev}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <img src={assets.prev_icon} alt="Previous" className="w-5 h-5" />
          </button>
          
          <button 
            onClick={onPlayPause} 
            className="p-2 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
          >
            <img 
              src={isPlaying ? assets.pause_icon : assets.play_icon} 
              alt={isPlaying ? "Pause" : "Play"} 
              className="w-5 h-5 filter brightness-0 invert"
            />
          </button>
          
          <button 
            onClick={onNext}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <img src={assets.next_icon} alt="Next" className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full flex items-center space-x-2 sm:space-x-4">
          <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="flex-1 accent-green-500 h-1"
          />
          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume control - hidden on mobile */}
      <div className="hidden sm:flex w-1/4 items-center justify-end">
        <img src={assets.volume_icon} alt="Volume" className="w-5 h-5 mr-2" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 accent-green-500 h-1"
        />
      </div>
    </div>
  );
};

export default MusicPlayer; 