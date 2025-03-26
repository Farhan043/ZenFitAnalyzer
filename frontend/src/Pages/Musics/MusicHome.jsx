import React, { useState, useRef, useEffect } from 'react';
import { assets, songsData, albumsData } from '../../assets/spotify-assets/assets/assets';
import Sidebar from '../../components/Music/Sidebar';
import MusicPlayer from '../../components/Music/MusicPlayer';
import SearchBar from '../../components/Music/SearchBar';
import SongList from '../../components/Music/SongList';
import AlbumGrid from '../../components/Music/AlbumGrid';
import LikedSongs from '../../components/Music/LikedSongs';

const MusicHome = () => {
  const [currentSong, setCurrentSong] = useState(songsData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState('home');
  const [likedSongs, setLikedSongs] = useState(() => {
    const saved = localStorage.getItem('likedSongs');
    return saved ? JSON.parse(saved) : [];
  });
  const audioRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
  }, [likedSongs]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    const currentIndex = songsData.findIndex(song => song.id === currentSong.id);
    const nextSong = songsData[(currentIndex + 1) % songsData.length];
    setCurrentSong(nextSong);
  };

  const handlePrevSong = () => {
    const currentIndex = songsData.findIndex(song => song.id === currentSong.id);
    const prevSong = songsData[(currentIndex - 1 + songsData.length) % songsData.length];
    setCurrentSong(prevSong);
  };

  const handleLikeSong = (song) => {
    setLikedSongs(prev => {
      const isLiked = prev.some(s => s.id === song.id);
      if (isLiked) {
        return prev.filter(s => s.id !== song.id);
      } else {
        return [...prev, song];
      }
    });
  };

  const renderMainContent = () => {
    switch(currentView) {
      case 'liked':
        return (
          <LikedSongs 
            likedSongs={likedSongs}
            setCurrentSong={setCurrentSong}
            currentSong={currentSong}
            onLikeSong={handleLikeSong}
          />
        );
      case 'home':
      default:
        return (
          <>
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
            
            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Featured Albums</h2>
              <AlbumGrid albums={albumsData} />
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-4">All Songs</h2>
              <SongList 
                songs={songsData.filter(song => 
                  song.name.toLowerCase().includes(searchQuery.toLowerCase())
                )}
                setCurrentSong={setCurrentSong}
                currentSong={currentSong}
                likedSongs={likedSongs}
                onLikeSong={handleLikeSong}
              />
            </section>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar 
        likedSongs={likedSongs} 
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {renderMainContent()}
        </div>

        <MusicPlayer 
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNextSong}
          onPrev={handlePrevSong}
          audioRef={audioRef}
          isLiked={likedSongs.some(s => s.id === currentSong.id)}
          onLikeSong={() => handleLikeSong(currentSong)}
        />
      </div>
    </div>
  );
};

export default MusicHome;