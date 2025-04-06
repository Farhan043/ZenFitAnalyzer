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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [likedSongs, setLikedSongs] = useState(() => {
    const saved = localStorage.getItem('likedSongs');
    return saved ? JSON.parse(saved) : [];
  });
  const audioRef = useRef(null);

  // Close sidebar when window resizes to larger screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderMainContent = () => {
    switch(currentView) {
      case 'liked':
        return (
          <div className="px-4 py-4 md:p-6">
            <div className="flex items-center mb-6 md:hidden">
              <button 
                onClick={toggleSidebar} 
                className="mr-4 p-2 bg-gray-800 rounded-md hover:bg-gray-700"
                aria-label="Menu"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 5.75H19.25"/>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 18.25H19.25"/>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 12H19.25"/>
                </svg>
              </button>
              <h1 className="text-xl font-bold">Liked Songs</h1>
            </div>
            <LikedSongs 
              likedSongs={likedSongs}
              setCurrentSong={setCurrentSong}
              currentSong={currentSong}
              onLikeSong={handleLikeSong}
            />
          </div>
        );
      case 'home':
      default:
        return (
          <div className="px-4 py-4 md:p-6">
            <div className="md:hidden mb-4">
              <button 
                onClick={toggleSidebar} 
                className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 mb-4"
                aria-label="Menu"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 5.75H19.25"/>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 18.25H19.25"/>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 12H19.25"/>
                </svg>
              </button>
            </div>
            
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
            
            <section className="mt-6 md:mt-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4">Featured Albums</h2>
              <AlbumGrid albums={albumsData} />
            </section>

            <section className="mt-6 md:mt-10 pb-20 md:pb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-4">All Songs</h2>
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
          </div>
        );
    }
  };

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col md:flex-row relative overflow-hidden">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar - fixed on mobile, regular on desktop */}
      <div 
        className={`fixed md:relative top-0 left-0 h-full z-40 md:z-auto transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <Sidebar 
          likedSongs={likedSongs} 
          currentView={currentView}
          setCurrentView={(view) => {
            setCurrentView(view);
            setIsSidebarOpen(false); // Close on navigation
          }}
          closeSidebar={() => setIsSidebarOpen(false)}
        />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col md:h-screen w-full overflow-hidden">
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {renderMainContent()}
        </div>
        
        {/* Fixed player at bottom */}
        <div className="fixed bottom-0 left-0 right-0 md:relative">
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
    </div>
  );
};

export default MusicHome;