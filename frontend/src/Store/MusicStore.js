import { create } from "zustand";
import { songsData } from "../assets/spotify-assets/assets/assets";

// Update the punjabiSongs array at the top of the file
const punjabiSongs = [
  {
    id: 1,
    name: "G.O.A.T.",
    artist: "Diljit Dosanjh",
    image: "https://i.scdn.co/image/ab67616d0000b273c9caa00171c2b666899685c7",
    genre: "Punjabi Pop",
    year: "2020",
    duration: "3:22",
    file: "https://example.com/goat.mp3" // Replace with actual audio file URL
  },
  {
    id: 2,
    name: "Brown Munde",
    artist: "AP Dhillon, Gurinder Gill",
    image: "https://i.scdn.co/image/ab67616d0000b273e361d5d0fe6c8c3e03a1d490",
    genre: "Punjabi Hip Hop",
    year: "2020",
    duration: "4:15",
    file: "https://example.com/brown-munde.mp3"
  },
  {
    id: 3,
    name: "Excuses",
    artist: "AP Dhillon, Gurinder Gill",
    image: "https://i.scdn.co/image/ab67616d0000b273a8b6a6c75f3b51f118f0fbb9",
    genre: "Punjabi Pop",
    year: "2021",
    duration: "2:56",
    file: "https://example.com/excuses.mp3"
  },
  {
    id: 4,
    name: "Lover",
    artist: "Diljit Dosanjh",
    image: "https://i.scdn.co/image/ab67616d0000b273c1d3f2530d4e176061d33245",
    genre: "Punjabi Pop",
    year: "2020",
    duration: "3:48",
    file: "https://example.com/lover.mp3"
  },
  {
    id: 5,
    name: "Bijlee Bijlee",
    artist: "Harrdy Sandhu",
    image: "https://i.scdn.co/image/ab67616d0000b2737f37baf5d5f6d6581780ee31",
    genre: "Punjabi Pop",
    year: "2021",
    duration: "3:02",
    file: "https://example.com/bijlee.mp3"
  },
  {
    id: 6,
    name: "Titliaan",
    artist: "Afsana Khan, Harrdy Sandhu",
    image: "https://i.scdn.co/image/ab67616d0000b273c9c0ccabd11e40eb3d892848",
    genre: "Punjabi Pop",
    year: "2020",
    duration: "3:27",
    file: "https://example.com/titliaan.mp3"
  },
  {
    id: 7,
    name: "Pasoori",
    artist: "Ali Sethi, Shae Gill",
    image: "https://i.scdn.co/image/ab67616d0000b273c8f9b6c3d5ffa3c95c0c5ef5",
    genre: "Punjabi Pop",
    year: "2022",
    duration: "3:44",
    file: "https://example.com/pasoori.mp3"
  },
  {
    id: 8,
    name: "Elevated",
    artist: "Shubh",
    image: "https://i.scdn.co/image/ab67616d0000b273e5a25a8759d8683f5d8d7861",
    genre: "Punjabi Hip Hop",
    year: "2021",
    duration: "3:15",
    file: "https://example.com/elevated.mp3"
  },
  {
    id: 9,
    name: "295",
    artist: "Sidhu Moose Wala",
    image: "https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431",
    genre: "Punjabi Hip Hop",
    year: "2021",
    duration: "4:32",
    file: "https://example.com/295.mp3"
  },
  {
    id: 10,
    name: "Desires",
    artist: "AP Dhillon, Gurinder Gill",
    image: "https://i.scdn.co/image/ab67616d0000b273fe06c51bbd7c3a1ee8ea1dd8",
    genre: "Punjabi Hip Hop",
    year: "2021",
    duration: "3:39",
    file: "https://example.com/desires.mp3"
  },
  {
    id: 11,
    name: "Insane",
    artist: "AP Dhillon",
    image: "https://i.scdn.co/image/ab67616d0000b273fe06c51bbd7c3a1ee8ea1dd8",
    genre: "Punjabi Hip Hop",
    year: "2021",
    duration: "2:59",
    file: "https://example.com/insane.mp3"
  },
  {
    id: 12,
    name: "Levels",
    artist: "Sidhu Moose Wala",
    image: "https://i.scdn.co/image/ab67616d0000b273431b40a3479c2b9f7cf10f85",
    genre: "Punjabi Hip Hop",
    year: "2021",
    duration: "4:12",
    file: "https://example.com/levels.mp3"
  },
  {
    id: 13,
    name: "Dawood",
    artist: "Diljit Dosanjh",
    image: "https://i.scdn.co/image/ab67616d0000b273c9caa00171c2b666899685c7",
    genre: "Punjabi Pop",
    year: "2020",
    duration: "3:18",
    file: "https://example.com/dawood.mp3"
  },
  {
    id: 14,
    name: "We Rollin",
    artist: "Shubh",
    image: "https://i.scdn.co/image/ab67616d0000b273d9a129c4a656a55afff2ca02",
    genre: "Punjabi Hip Hop",
    year: "2021",
    duration: "3:42",
    file: "https://example.com/we-rollin.mp3"
  },
  {
    id: 15,
    name: "Spaceship",
    artist: "AP Dhillon",
    image: "https://i.scdn.co/image/ab67616d0000b273fe06c51bbd7c3a1ee8ea1dd8",
    genre: "Punjabi Hip Hop",
    year: "2021",
    duration: "3:05",
    file: "https://example.com/spaceship.mp3"
  }
  // ... Continue adding more songs following the same pattern
];

// Add these categories to help with filtering
const categories = {
  PUNJABI_POP: "Punjabi Pop",
  PUNJABI_HIP_HOP: "Punjabi Hip Hop",
  BHANGRA: "Bhangra",
  FOLK: "Punjabi Folk"
};

export const useMusicStore = create((set, get) => ({
  songs: punjabiSongs,
  playlists: [],
  currentSongIndex: 0,
  isPlaying: false,
  volume: 0.5,
  progress: 0,
  searchQuery: "",
  filteredSongs: punjabiSongs,
  audioRef: { current: new Audio() }, // Persistent audio reference

  setCurrentSongIndex: (index) => set({ currentSongIndex: index }),
  setIsPlaying: (status) => {
    const state = get();
    if (state.audioRef.current) {
      if (status) {
        state.audioRef.current.play();
      } else {
        state.audioRef.current.pause();
      }
    }
    set({ isPlaying: status });
  },
  setVolume: (volume) => {
    const state = get();
    if (state.audioRef.current) {
      state.audioRef.current.volume = volume;
    }
    set({ volume });
  },
  setProgress: (progress) => set({ progress }),

  playSong: (index) =>
    set((state) => {
      if (state.audioRef.current) {
        const song = songsData[index];
        if (!song || !song.file) return state;

        if (state.currentSongIndex !== index) {
          state.audioRef.current.src = song.file;
          state.audioRef.current.load();
        }
        state.audioRef.current.volume = state.volume;
        state.audioRef.current.play();
      }
      return { currentSongIndex: index, isPlaying: true };
    }),

  playNext: () =>
    set((state) => {
      let newIndex = (state.currentSongIndex + 1) % songsData.length;
      state.audioRef.current.src = songsData[newIndex].file;
      state.audioRef.current.load();
      state.audioRef.current.play();
      return { currentSongIndex: newIndex, isPlaying: true };
    }),

  playPrevious: () =>
    set((state) => {
      let newIndex =
        (state.currentSongIndex - 1 + songsData.length) % songsData.length;
      state.audioRef.current.src = songsData[newIndex].file;
      state.audioRef.current.load();
      state.audioRef.current.play();
      return { currentSongIndex: newIndex, isPlaying: true };
    }),

  togglePlayPause: () =>
    set((state) => {
      if (state.audioRef.current) {
        if (state.audioRef.current.paused) {
          state.audioRef.current.play();
          return { isPlaying: true };
        } else {
          state.audioRef.current.pause();
          return { isPlaying: false };
        }
      }
      return state;
    }),

  // Add new actions for playlists
  createPlaylist: (name) =>
    set((state) => ({
      playlists: [
        ...state.playlists,
        {
          id: Date.now(),
          name,
          songs: []
        }
      ]
    })),

  addToPlaylist: (playlistId, song) =>
    set((state) => ({
      playlists: state.playlists.map(playlist =>
        playlist.id === playlistId
          ? { ...playlist, songs: [...playlist.songs, song] }
          : playlist
      )
    })),

  removeFromPlaylist: (playlistId, songId) =>
    set((state) => ({
      playlists: state.playlists.map(playlist =>
        playlist.id === playlistId
          ? { ...playlist, songs: playlist.songs.filter(song => song.id !== songId) }
          : playlist
      )
    })),

  // Add category filtering
  filterByCategory: (category) =>
    set((state) => ({
      filteredSongs: state.songs.filter(song => song.genre === category)
    })),

  // Reset filters
  resetFilters: () =>
    set((state) => ({
      filteredSongs: state.songs,
      searchQuery: ""
    })),

  // Enhanced search to include genre
  setSearchQuery: (query) =>
    set((state) => ({
      searchQuery: query,
      filteredSongs: state.songs.filter(song =>
        song.name.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.genre.toLowerCase().includes(query.toLowerCase())
      )
    })),
}));
