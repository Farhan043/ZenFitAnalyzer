import { create } from "zustand";
import { songsData } from "../assets/spotify-assets/assets/assets";

export const useMusicStore = create((set, get) => ({
  currentSongIndex: 0,
  isPlaying: false,
  volume: 0.5,
  progress: 0,
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
}));
