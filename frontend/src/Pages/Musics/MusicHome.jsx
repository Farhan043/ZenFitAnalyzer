// import React, { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import SpotifyWebApi from 'spotify-web-api-js';
// import { Play, Pause, Music, Search } from 'lucide-react';
// import axios from 'axios';

// const spotifyApi = new SpotifyWebApi();
// const CLIENT_ID = '90156c415f2e4946a916bf1d4c19bf4d';
// const CLIENT_SECRET = 'b49521d5c3094857804090c57fa33355';
// const REDIRECT_URI = 'http://localhost:5173/musichome';

// function MusicHome() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [tracks, setTracks] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentTrack, setCurrentTrack] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isSearching, setIsSearching] = useState(false);
//   const [accessToken, setAccessToken] = useState("");
//   const [newReleases, setNewReleases] = useState([]);
// const audioRef = useRef(new Audio());


//   useEffect(() => {

//     const hash = window.location.hash
//       .substring(1)
//       .split('&')
//       .reduce((initial, item) => {
//         const parts = item.split('=');
//         initial[parts[0]] = decodeURIComponent(parts[1]);
//         return initial;
//       }, {});

//     if (hash.access_token) {
//       localStorage.setItem('spotifyToken', hash.access_token); // Store correctly
//       spotifyApi.setAccessToken(hash.access_token);
//       setIsAuthenticated(true);
//       fetchTracks();
//     } else {
//       const token = localStorage.getItem('spotifyToken');
//       if (token) {
//         spotifyApi.setAccessToken(token);
//         setIsAuthenticated(true);
//         fetchTracks();
//       }
//     }
//   }, []);


//   // useEffect(() => {
//   //   const fetchNewReleases = async () => {
//   //     try {
//   //       const response = await axios.get("https://api.spotify.com/v1/browse/new-releases", {
//   //         headers: {
//   //           Authorization:   `Bearer ${accessToken}`,
//   //         },
//   //       });
//   //       console.log(response.data.albums);
//   //       setNewReleases(response.data.albums.items);
//   //     } catch (error) {
//   //       console.error("Error fetching new releases: ", error);
//   //     }
//   //   };

//   //   fetchNewReleases();
//   // }, []);
  
  

//   const login = () => {
//     const scopes = [
//       'user-read-private',
//       'user-read-email'
//     ];

//     window.location.href = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
//   };

//   useEffect(() => {
//     // Retrieve token from localStorage or URL
//     const storedToken = localStorage.getItem("spotifyToken");
//     const urlToken = new URLSearchParams(window.location.hash.substring(1)).get("access_token");

//     if (urlToken) {
//         localStorage.setItem("spotifyToken", urlToken);
//         setAccessToken(urlToken);
//     } else if (storedToken) {
//         setAccessToken(storedToken);
//     }
// }, []);

 
// async function getAccessToken() {
//   const response = await fetch("https://accounts.spotify.com/api/token", {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
//       },
//       body: "grant_type=client_credentials",
//   });

//   const data = await response.json();
//   return data.access_token;
// }

// // async function fetchTracks() {
// //   try {
// //     const accessToken = await getAccessToken();
// //     if (!accessToken) throw new Error("No access token available.");

// //     const response = await fetch("https://api.spotify.com/v1/browse/new-releases?limit=50&country=IN", {
// //       headers: { Authorization: `Bearer ${accessToken}` },
// //     });

// //     if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

// //     const data = await response.json();
// //     console.log(data.albums.items); // Check the fetched data

// //     // Store the new releases properly in state
// //     setTracks(data.albums.items.flatMap(album => album.tracks?.items || []));
// //   } catch (error) {
// //     console.error("Error fetching tracks:", error.message);
// //   }
// // }


// //   const handleSearch = async (e) => {
// //     e.preventDefault();
// //     if (!searchQuery.trim()) {
// //       fetchTracks();
// //       return;
// //     }

// //     try {
// //       setIsSearching(true);
// //       const data = await spotifyApi.search(searchQuery, ['track'], { limit: 50 });
// //       setTracks(data.tracks.items);
// //     } catch (error) {
// //       console.error('Search error:', error);
// //       handleTokenError(error);
// //     }
// //   };

// //   const handlePlayPause = async (track) => {
// //     try {
// //       const token = localStorage.getItem("spotifyToken");
// //       if (!token) {
// //         alert("Please log in to Spotify first!");
// //         login();
// //         return;
// //       }

// //       if (currentTrack?.id === track.id && isPlaying) {
// //         await fetch("http://localhost:4000/api/music/pause", {
// //           method: "PUT",
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setIsPlaying(false);
// //       } else {
// //         await fetch("http://localhost:4000/api/music/play", {
// //           method: "PUT",
// //           headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
// //           body: JSON.stringify({ trackUri: track.uri }),
// //         });
// //         setCurrentTrack(track);
// //         setIsPlaying(true);
// //       }
// //     } catch (error) {
// //       console.error("Playback error:", error);
// //     }
// //   };

// const fetchTracks = async () => {
//   try {
//     const accessToken = await getAccessToken();
//     if (!accessToken) throw new Error("No access token available.");

//     const response = await fetch(
//       "https://api.spotify.com/v1/browse/new-releases?limit=10&country=IN",
//       {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       }
//     );

//     if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//     const data = await response.json();
//     console.log("Fetched Albums:", data.albums.items);

//     // const extractedTracks = data.albums.items.flatMap((album) =>
//     //   album.artists.map((artist) => ({
//     //     id: album.id,
//     //     name: album.name,
//     //     artist: artist.name,
//     //     image: album.images?.[0]?.url || "https://via.placeholder.com/150",
//     //     preview_url: album.tracks?.items?.[0]?.preview_url || null,
//     //   }))
//     // );
//     const extractedTracks = data.albums.items.flatMap((album) =>
//       album.tracks?.items?.map((track) => ({
//         id: track.id,
//         name: track.name,
//         artist: track.artists.map((a) => a.name).join(", "),
//         image: album.images?.[0]?.url || "https://via.placeholder.com/150",
//         preview_url: track.preview_url || null,
//       })) || []
//     );

//     console.log("Extracted Tracks:", extractedTracks);
//     setTracks(extractedTracks);
//   } catch (error) {
//     console.error("Error fetching tracks:", error.message);
//   }
// };

// // Function to fetch search results
// const handleSearch = async (e) => {
//   e.preventDefault();
//   if (!searchQuery) return;
//   try {
//     setIsSearching(true);
//     const accessToken = await getAccessToken();
//     if (!accessToken) throw new Error("No access token available.");

//     const response = await fetch(
//       `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=10`,
//       {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       }
//     );

//     if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//     const data = await response.json();
//     console.log("Search Results:", data.tracks.items);

//     const searchResults = data.tracks.items.map((track) => ({
//       id: track.id,
//       name: track.name,
//       artist: track.artists.map((a) => a.name).join(", "),
//       image: track.album.images?.[0]?.url || "https://via.placeholder.com/150",
//       preview_url: track.preview_url || null,
//     }));

//     setTracks(searchResults);
//   } catch (error) {
//     console.error("Error searching tracks:", error.message);
//   }
// };

// // Play/Pause handler
// const handlePlayPause = (track) => {
//   if (currentTrack?.id === track.id && isPlaying) {
//     audioRef.current.pause();
//     setIsPlaying(false);
//   } else {
//     if (track.preview_url) {
//       if (currentTrack?.id !== track.id) {
//         audioRef.current.pause(); // Pause the previous track
//       }
//       audioRef.current.src = track.preview_url;
//       audioRef.current.play();
//       setCurrentTrack(track);
//       setIsPlaying(true);
//     } else {
//       alert("No preview available for this track.");
//     }
//   }
// };

// // Stop playing when component unmounts
// useEffect(() => {
//   return () => {
//     audioRef.current.pause();
//   };
// }, []);

// // Fetch new releases on load

// // Fetch new releases on load

//   const handleTokenError = (error) => {
//     if (error.status === 401) {
//       localStorage.removeItem('spotifyToken');
//       setIsAuthenticated(false);
//       login();
//     }
//   };

//   useEffect(() => {
//     if (accessToken) {
//         fetchTracks();
//     }
// }, [accessToken]);

//   return (
//     // <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 text-white p-8">
//     //   {!isAuthenticated ? (
//     //     <div className="flex flex-col items-center justify-center h-screen">
//     //       <motion.div
//     //         initial={{ scale: 0 }}
//     //         animate={{ scale: 1 }}
//     //         transition={{ duration: 0.5 }}
//     //         className="text-center"
//     //       >
//     //         <Music className="w-24 h-24 mb-6 mx-auto text-blue-500" />
//     //         <h1 className="text-4xl font-bold mb-8">Music Player</h1>
//     //         <button
//     //           onClick={login}
//     //           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
//     //         >
//     //           Connect with Spotify
//     //         </button>
//     //       </motion.div>
//     //     </div>
//     //   ) : (
//     //     <div className="container mx-auto">
//     //       <motion.h1
//     //         initial={{ opacity: 0, y: -20 }}
//     //         animate={{ opacity: 1, y: 0 }}
//     //         className="text-4xl font-bold mb-8"
//     //       >
//     //         {isSearching ? 'Search Results' : 'New Releases'}
//     //       </motion.h1>

//     //       <form onSubmit={handleSearch} className="mb-8">
//     //         <div className="flex gap-4">
//     //           <div className="flex-1 relative">
//     //             <input
//     //               type="text"
//     //               value={searchQuery}
//     //               onChange={(e) => setSearchQuery(e.target.value)}
//     //               placeholder="Search for any song..."
//     //               className="w-full bg-white/10 rounded-full py-2 px-6 pr-12 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//     //             />
//     //             <Search className="absolute right-4 top-2.5 w-5 h-5 text-gray-300" />
//     //           </div>
//     //           <button
//     //           onClick={fetchTracks}
//     //             type="submit"
//     //             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-all duration-300"
//     //           >
//     //             Search
//     //           </button>
//     //         </div>
//     //       </form>
        
     
//     //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//     //         {tracks.map((track, index) => (
//     //           <motion.div
//     //             key={track.id}
//     //             initial={{ opacity: 0, y: 20 }}
//     //             animate={{ opacity: 1, y: 0 }}
//     //             transition={{ delay: index * 0.1 }}
//     //             className="bg-white/10 backdrop-blur-lg rounded-xl p-4 hover:bg-white/20 transition-all duration-300"
//     //           >
//     //             {track.album?.images?.[0] && (
//     //               <img
//     //                 src={track.album.images[0].url}
//     //                 alt={track.name}
//     //                 className="w-full h-48 object-cover rounded-lg mb-4"
//     //               />
//     //             )}
//     //             <h3 className="font-semibold text-lg mb-2">{track.name}</h3>
//     //             <p className="text-gray-300 mb-4">{track.artists?.map(a => a.name).join(', ') || 'Unknown Artist'}</p>
                
//     //             <button
//     //               onClick={() => handlePlayPause(track)}
//     //               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-all duration-300 flex items-center"
//     //             >
//     //               {currentTrack?.id === track.id && isPlaying ? <Pause /> : <Play />}
//     //             </button>
//     //           </motion.div>
//     //         ))}
//     //       </div>
//     //     </div>
//     //   )}
//     // </div>

//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 text-white p-8">
//     {!isAuthenticated ? (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-center"
//         >
//           <Music className="w-24 h-24 mb-6 mx-auto text-blue-500" />
//           <h1 className="text-4xl font-bold mb-8">Music Player</h1>
//           <button
//             onClick={login}
//             className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
//           >
//             Connect with Spotify
//           </button>
//         </motion.div>
//       </div>
//     ) : (
//       <div className="container mx-auto">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-4xl font-bold mb-8"
//         >
//           {isSearching ? "Search Results" : "New Releases"}
//         </motion.h1>

//         <form onSubmit={handleSearch} className="mb-8">
//           <div className="flex gap-4">
//             <div className="flex-1 relative">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search for any song..."
//                 className="w-full bg-white/10 rounded-full py-2 px-6 pr-12 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <Search className="absolute right-4 top-2.5 w-5 h-5 text-gray-300" />
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-all duration-300"
//             >
//               Search
//             </button>
//           </div>
//         </form>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {tracks.length > 0 ? (
//             tracks.map((track, index) => (
//               <motion.div
//                 key={track.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="bg-white/10 backdrop-blur-lg rounded-xl p-4 hover:bg-white/20 transition-all duration-300"
//               >
//                 {track.image && (
//                   <img
//                     src={track.image}
//                     alt={track.name}
//                     className="w-full h-48 object-cover rounded-lg mb-4"
//                   />
//                 )}
//                 <h3 className="font-semibold text-lg mb-2">{track.name}</h3>
//                 <p className="text-gray-300 mb-4">{track.artist || "Unknown Artist"}</p>

//                 <button
//                   onClick={() => handlePlayPause(track)}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-all duration-300 flex items-center"
//                 >
//                   {currentTrack?.id === track.id && isPlaying ? <Pause /> : <Play />}
//                 </button>
//               </motion.div>
//             ))
//           ) : (
//             <p className="text-gray-400 text-center col-span-4">No tracks available.</p>
//           )}
//         </div>
//       </div>
//     )}
//   </div>
//   );
// }

// export default MusicHome;





// // import React, { useState, useEffect } from "react";
// // import { motion } from "framer-motion";
// // import { Play, Pause, Music, Search } from "lucide-react";
// // // import { getAccessToken } from "../utils/spotifyAuth";

// // const MusicHome = ({ isAuthenticated, login }) => {
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [tracks, setTracks] = useState([]);
// //   const [isSearching, setIsSearching] = useState(false);
// //   const [currentTrack, setCurrentTrack] = useState(null);
// //   const [isPlaying, setIsPlaying] = useState(false);

// //   // Function to fetch new releases
// //   const fetchTracks = async () => {
// //     try {
// //       const accessToken = await getAccessToken();
// //       if (!accessToken) throw new Error("No access token available.");

// //       const response = await fetch(
// //         "https://api.spotify.com/v1/browse/new-releases?limit=10&country=IN",
// //         {
// //           headers: { Authorization: `Bearer ${accessToken}` },
// //         }
// //       );

// //       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

// //       const data = await response.json();
// //       console.log("Fetched Albums:", data.albums.items);

// //       // Extract tracks from albums
// //       const extractedTracks = data.albums.items.flatMap((album) =>
// //         album.artists.map((artist) => ({
// //           id: album.id,
// //           name: album.name,
// //           artist: artist.name,
// //           image: album.images?.[0]?.url || "https://via.placeholder.com/150",
// //           preview_url: album.tracks?.items?.[0]?.preview_url || null,
// //         }))
// //       );

// //       console.log("Extracted Tracks:", extractedTracks);
// //       setTracks(extractedTracks);
// //     } catch (error) {
// //       console.error("Error fetching tracks:", error.message);
// //     }
// //   };

// //   // Function to fetch search results
// //   const handleSearch = async (e) => {
// //     e.preventDefault();
// //     if (!searchQuery) return;
// //     try {
// //       setIsSearching(true);
// //       const accessToken = await getAccessToken();
// //       if (!accessToken) throw new Error("No access token available.");

// //       const response = await fetch(
// //         `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=10`,
// //         {
// //           headers: { Authorization: `Bearer ${accessToken}` },
// //         }
// //       );

// //       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

// //       const data = await response.json();
// //       console.log("Search Results:", data.tracks.items);

// //       const searchResults = data.tracks.items.map((track) => ({
// //         id: track.id,
// //         name: track.name,
// //         artist: track.artists.map((a) => a.name).join(", "),
// //         image: track.album.images?.[0]?.url || "https://via.placeholder.com/150",
// //         preview_url: track.preview_url || null,
// //       }));

// //       setTracks(searchResults);
// //     } catch (error) {
// //       console.error("Error searching tracks:", error.message);
// //     }
// //   };

// //   // Play/Pause handler
// //   const handlePlayPause = (track) => {
// //     if (currentTrack?.id === track.id) {
// //       setIsPlaying(!isPlaying);
// //     } else {
// //       setCurrentTrack(track);
// //       setIsPlaying(true);
// //     }
// //   };

// //   // Fetch new releases on load
// //   useEffect(() => {
// //     fetchTracks();
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 text-white p-8">
// //       {!isAuthenticated ? (
// //         <div className="flex flex-col items-center justify-center h-screen">
// //           <motion.div
// //             initial={{ scale: 0 }}
// //             animate={{ scale: 1 }}
// //             transition={{ duration: 0.5 }}
// //             className="text-center"
// //           >
// //             <Music className="w-24 h-24 mb-6 mx-auto text-blue-500" />
// //             <h1 className="text-4xl font-bold mb-8">Music Player</h1>
// //             <button
// //               onClick={login}
// //               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
// //             >
// //               Connect with Spotify
// //             </button>
// //           </motion.div>
// //         </div>
// //       ) : (
// //         <div className="container mx-auto">
// //           <motion.h1
// //             initial={{ opacity: 0, y: -20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             className="text-4xl font-bold mb-8"
// //           >
// //             {isSearching ? "Search Results" : "New Releases"}
// //           </motion.h1>

// //           <form onSubmit={handleSearch} className="mb-8">
// //             <div className="flex gap-4">
// //               <div className="flex-1 relative">
// //                 <input
// //                   type="text"
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                   placeholder="Search for any song..."
// //                   className="w-full bg-white/10 rounded-full py-2 px-6 pr-12 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //                 <Search className="absolute right-4 top-2.5 w-5 h-5 text-gray-300" />
// //               </div>
// //               <button
// //                 type="submit"
// //                 className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-all duration-300"
// //               >
// //                 Search
// //               </button>
// //             </div>
// //           </form>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //             {tracks.length > 0 ? (
// //               tracks.map((track, index) => (
// //                 <motion.div
// //                   key={track.id}
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: index * 0.1 }}
// //                   className="bg-white/10 backdrop-blur-lg rounded-xl p-4 hover:bg-white/20 transition-all duration-300"
// //                 >
// //                   {track.image && (
// //                     <img
// //                       src={track.image}
// //                       alt={track.name}
// //                       className="w-full h-48 object-cover rounded-lg mb-4"
// //                     />
// //                   )}
// //                   <h3 className="font-semibold text-lg mb-2">{track.name}</h3>
// //                   <p className="text-gray-300 mb-4">{track.artist || "Unknown Artist"}</p>

// //                   {track.preview_url ? (
// //                     <audio controls className="w-full">
// //                       <source src={track.preview_url} type="audio/mpeg" />
// //                       Your browser does not support the audio element.
// //                     </audio>
// //                   ) : (
// //                     <p className="text-sm text-gray-400">No preview available</p>
// //                   )}

// //                   <button
// //                     onClick={() => handlePlayPause(track)}
// //                     className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-all duration-300 flex items-center"
// //                   >
// //                     {currentTrack?.id === track.id && isPlaying ? <Pause /> : <Play />}
// //                   </button>
// //                 </motion.div>
// //               ))
// //             ) : (
// //               <p className="text-gray-400 text-center col-span-4">No tracks available.</p>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default MusicHome;

























// import React, { useState, useRef, useEffect } from "react";
// import { assets, albumsData, songsData } from "../../assets/spotify-assets/assets/assets";

// const MusicHome = () => {
//   const [currentSong, setCurrentSong] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(1);
//   const [progress, setProgress] = useState(0);
//   const audioRef = useRef(null);
// const [searchQuery, setSearchQuery] = useState("");
// const [filteredSongs, setFilteredSongs] = useState(songsData);

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = volume;
//       const updateProgress = () => {
//         setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
//       };
//       audioRef.current.addEventListener("timeupdate", updateProgress);
//       return () => audioRef.current.removeEventListener("timeupdate", updateProgress);
//     }
//   }, [volume, currentSong]);

//   const playSong = (song) => {
//     setCurrentSong(song);
//     setIsPlaying(true);
//     if (audioRef.current) {
//       audioRef.current.src = song.file;
//       audioRef.current.play();
//     }
//   };

//   const togglePlayPause = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const playNext = () => {
//     const currentIndex = songsData.findIndex((song) => song.id === currentSong.id);
//     const nextSong = songsData[(currentIndex + 1) % songsData.length];
//     playSong(nextSong);
//   };

//   const playPrevious = () => {
//     const currentIndex = songsData.findIndex((song) => song.id === currentSong.id);
//     const prevSong = songsData[(currentIndex - 1 + songsData.length) % songsData.length];
//     playSong(prevSong);
//   };

// const handleSearch = (e) => {
//   setSearchQuery(e.target.value);
//   const filtered = songsData.filter(song => 
//     song.name.toLowerCase().includes(e.target.value.toLowerCase())
//   );
//   setFilteredSongs(filtered);
// };

//   return (
//     <div className="flex h-screen bg-gray-900 text-white">
//       {/* Sidebar */}
//       <aside className="w-1/5 bg-gray-800 p-4">
//         <img src={assets.spotify_logo} alt="Spotify Logo" className="w-32 mb-4" />
//         <nav>
//           <button className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
//             <img src={assets.home_icon} alt="Home" className="w-6" />
//             <span>Home</span>
//           </button>
//           <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearch}
//           placeholder="Search songs..."
//           className="w-full p-2 rounded bg-gray-700 text-white"
//         />
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-scroll">
//         <h1 className="text-2xl font-bold">Albums</h1>
//         <div className="grid grid-cols-3 gap-4 mt-4">
//           {albumsData.map((album) => (
//             <div key={album.id} className="bg-gray-700 p-4 rounded-lg">
//               <img src={album.image} alt={album.name} className="w-full rounded" />
//               <h2 className="mt-2 text-lg font-semibold">{album.name}</h2>
//             </div>
//           ))}
//         </div>

//         {/* <main className="flex-1 p-6 overflow-y-scroll"> */}
//         <h1 className="text-2xl font-bold">Songs</h1>
//         <ul className="mt-4">
//           {filteredSongs.map((song) => (
//             <li key={song.id} className="flex items-center space-x-4 p-2 hover:bg-gray-700 rounded cursor-pointer">
//               <img src={song.image} alt={song.name} className="w-12 h-12 rounded" />
//               <div>
//                 <h3 className="text-lg font-semibold">{song.name}</h3>
//                 <button onClick={() => playSong(song)} className="ml-2 p-1 bg-blue-500 rounded">Play</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </main>

//       {/* Music Player */}
//       {currentSong && (
//         <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <img src={currentSong.image} alt={currentSong.name} className="w-12 h-12 rounded" />
//             <div>
//               <h3 className="text-lg font-semibold">{currentSong.name}</h3>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <button onClick={playPrevious}>
//               <img src={assets.prev_icon} alt="Previous" className="w-8" />
//             </button>
//             <button onClick={togglePlayPause}>
//               <img src={isPlaying ? assets.pause_icon : assets.play_icon} alt="Play/Pause" className="w-8" />
//             </button>
//             <button onClick={playNext}>
//               <img src={assets.next_icon} alt="Next" className="w-8" />
//             </button>
//           </div>
//           <div className="flex flex-col items-center w-1/3">
//             <input 
//               type="range" 
//               value={progress} 
//               max="100" 
//               onChange={(e) => (audioRef.current.currentTime = (e.target.value * audioRef.current.duration) / 100)}
//               className="w-full"
//             />
//             <input 
//               type="range" 
//               value={volume * 100} 
//               max="100" 
//               onChange={(e) => setVolume(e.target.value / 100)}
//               className="w-24 mt-2"
//             />
//           </div>
//           <audio ref={audioRef} />
//         </footer>
//       )}
//     </div>
//   );
// };

// export default MusicHome;










// import React, { useEffect, useRef } from "react";
// import { useMusicStore } from "../../Store/MusicStore";
// import { assets, albumsData, songsData } from "../../assets/spotify-assets/assets/assets";

// const MusicHome = () => {
//   const {
//     currentSongIndex,
//     setCurrentSongIndex,
//     isPlaying,
//     setIsPlaying,
//     volume,
//     setVolume,
//     progress,
//     setProgress,
//     playNext,
//     playPrevious,
//     playSong,
//     audioRef,
//   } = useMusicStore();

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = volume;
//       const updateProgress = () => {
//         setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
//       };
//       audioRef.current.addEventListener("timeupdate", updateProgress);
//       audioRef.current.addEventListener("ended", playNext);
//       return () => {
//         audioRef.current.removeEventListener("timeupdate", updateProgress);
//         audioRef.current.removeEventListener("ended", playNext);
//       };
//     }
//   }, [volume, currentSongIndex]);

 
  

//   return (
//     <div className="flex h-screen bg-black text-white">
//       <aside className="w-1/5 bg-gray-900 p-4 flex flex-col space-y-6">
//         <h2 className="text-xl font-bold">Home</h2>
//         <h2 className="text-xl font-bold mt-2">Search</h2>
//         <h2 className="text-xl font-bold mt-4">Your Library</h2>
//         <button className="bg-white text-black rounded px-3 py-2 mt-2">Create Playlist</button>
//       </aside>

//       <main className="flex-1 p-6 overflow-y-scroll">

//         <h2 className="text-xl font-bold mt-6">Today's Biggest Hits</h2>
//         <div className="grid grid-cols-4 gap-4 mt-4">
//           {songsData.map((song, index) => (
//             <div key={song.id} className="bg-gray-800 p-4 rounded cursor-pointer hover:bg-gray-700">
//               <img src={song.image} alt={song.name} className="w-full rounded" />
//               <h3 className="text-md font-semibold mt-2">{song.name}</h3>
//               <button onClick={() => playSong(index)} className="mt-2 p-2 bg-blue-500 rounded">Play</button>
//             </div>
//           ))}
//         </div>
//       </main>

//       <div className="fixed bottom-0 left-0 w-full bg-black bg-opacity-50 p-4 flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           <img src={songsData[currentSongIndex].image} alt="current song" className="w-12 h-12 rounded" />
//           <div>
//             <h3 className="text-lg font-semibold">{songsData[currentSongIndex].name}</h3>
//             <p className="text-sm text-gray-400">{songsData[currentSongIndex].artist}</p>
//           </div>
//         </div>
//         <div className="flex space-x-4 items-center">
//           <button onClick={playPrevious} className="p-2 bg-gray-700 rounded">⏮</button>
//           <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 bg-gray-700 rounded">{isPlaying ? "⏸" : "▶"}</button>
//           <button onClick={playNext} className="p-2 bg-gray-700 rounded">⏭</button>
//         </div>
//         <input 
//           type="range" 
//           value={progress} 
//           max="100" 
//           className="w-2/5"
//           onChange={(e) => {
//             if (audioRef.current) {
//               audioRef.current.currentTime = (e.target.value / 100) * audioRef.current.duration;
//               setProgress(e.target.value);
//             }
//           }}
//         />
//         <input 
//           type="range" 
//           value={volume} 
//           min="0" 
//           max="1" 
//           step="0.01" 
//           onChange={(e) => setVolume(e.target.value)} 
//           className="w-16"
//         />
//       </div>
//       <audio ref={audioRef} />
//     </div>
//   );
// };

// export default MusicHome;



// import React, { useEffect, useState, useRef } from "react";
// import { useMusicStore } from "../../Store/MusicStore";
// import { Play, Pause } from "lucide-react";
// import axios from "axios";

// const MusicHome = () => {
//   const [songs, setSongs] = useState([]);
//   const [newSong, setNewSong] = useState({ name: "", artist: "", file: null, image: null });
//   const [loading, setLoading] = useState(false);
  
//   const {
//     currentSongIndex,
//     isPlaying,
//     setIsPlaying,
//     volume,
//     setVolume,
//     progress,
//     setProgress,
//     playNext,
//     playPrevious,
//     playSong,
//     audioRef,
//   } = useMusicStore();

//   // Fetch songs from backend
//   useEffect(() => {
//     const fetchSongs = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
//         const response = await axios.get("http://localhost:4000/api/songs", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSongs(response.data);
//       } catch (error) {
//         console.error("Error fetching songs:", error);
//       }
//     };
//     fetchSongs();
//   }, []);
  
//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = volume;
//       const updateProgress = () => {
//         setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
//       };
//       audioRef.current.addEventListener("timeupdate", updateProgress);
//       audioRef.current.addEventListener("ended", playNext);
//       return () => {
//         audioRef.current.removeEventListener("timeupdate", updateProgress);
//         audioRef.current.removeEventListener("ended", playNext);
//       };
//     }
//   }, [volume, currentSongIndex]);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setNewSong({ ...newSong, [name]: files ? files[0] : value });
//   };

//   // Upload new song
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("name", newSong.name);
//     formData.append("artist", newSong.artist);
//     formData.append("file", newSong.file);
//     formData.append("image", newSong.image);

//     try {
//       await axios.post("http://localhost:4000/api/songs", formData);
//       alert("Song added successfully!");
//       window.location.reload();
//     } catch (error) {
//       console.error("Error uploading song:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-black text-white pb-24">
//       {/* Upload Song Form */}
//       <form onSubmit={handleUpload} className="p-6 flex flex-col gap-4 bg-gray-800 max-w-md mx-auto rounded-xl shadow-lg">
//         <h2 className="text-xl font-bold text-center">Upload a New Song</h2>
//         <input type="text" name="name" placeholder="Song Name" className="p-2 rounded bg-gray-700" required onChange={handleChange} />
//         <input type="text" name="artist" placeholder="Artist Name" className="p-2 rounded bg-gray-700" required onChange={handleChange} />
//         <input type="file" name="file" accept="audio/*" className="p-2 rounded bg-gray-700" required onChange={handleChange} />
//         <input type="file" name="image" accept="image/*" className="p-2 rounded bg-gray-700" required onChange={handleChange} />
//         <button type="submit" className="p-2 bg-blue-500 rounded hover:bg-blue-600" disabled={loading}>{loading ? "Uploading..." : "Upload Song"}</button>
//       </form>
      
//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-auto w-full max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-center mb-6">Trending Music</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {songs.map((song, index) => (
//             <div key={song._id} className="bg-gray-800 p-5 rounded-xl cursor-pointer hover:bg-gray-700 transition-all shadow-lg">
//               <img src={song.image} alt={song.name} className="w-full rounded-xl" />
//               <h3 className="text-lg font-semibold mt-3 text-center">{song.name}</h3>
//               <button onClick={() => playSong(index)} className="mt-3 p-2 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center w-full transition-all">
//                 {currentSongIndex === index && isPlaying ? <Pause size={24} /> : <Play size={24} />}
//               </button>
//             </div>
//           ))}
//         </div>
//       </main>

//       {/* Music Player */}
//       <div className="fixed bottom-0 left-0 w-full bg-gray-900 p-4 flex flex-col md:flex-row justify-between items-center shadow-lg z-50 space-y-4 md:space-y-0">
//         <div className="flex items-center space-x-4 w-full md:w-auto justify-center md:justify-start">
//           <img src={songs[currentSongIndex]?.image} alt="current song" className="w-14 h-14 rounded-xl" />
//           <div className="text-center md:text-left">
//             <h3 className="text-lg font-semibold">{songs[currentSongIndex]?.name}</h3>
//             <p className="text-sm text-gray-400">{songs[currentSongIndex]?.artist}</p>
//           </div>
//         </div>
//         <div className="flex space-x-4 items-center w-full md:w-auto justify-center">
//           <button onClick={playPrevious} className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full">⏮</button>
//           <button onClick={() => setIsPlaying(!isPlaying)} className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full">
//             {isPlaying ? <Pause size={24} /> : <Play size={24} />}
//           </button>
//           <button onClick={playNext} className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full">⏭</button>
//         </div>
//       </div>
//       <audio ref={audioRef} />
//     </div>
//   );
// };

// export default MusicHome;













import React, { useState, useRef, useEffect } from "react";
import { assets, albumsData, songsData } from "../../assets/spotify-assets/assets/assets";

const MusicHome = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      const updateProgress = () => {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
      };
      audioRef.current.addEventListener("timeupdate", updateProgress);
      audioRef.current.addEventListener("ended", playNext);
      return () => {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
        audioRef.current.removeEventListener("ended", playNext);
      };
    }
  }, [volume, currentSongIndex]);

  const playSong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = songsData[index].file;
      audioRef.current.play();
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    const nextIndex = (currentSongIndex + 1) % songsData.length;
    playSong(nextIndex);
  };

  const playPrevious = () => {
    const prevIndex = (currentSongIndex - 1 + songsData.length) % songsData.length;
    playSong(prevIndex);
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-900 p-4 flex flex-col space-y-6">
        <h2 className="text-xl font-bold">Home</h2>
        <h2 className="text-xl font-bold mt-2">Search</h2>
        <h2 className="text-xl font-bold mt-4">Your Library</h2>
        <button className="bg-white text-black rounded px-3 py-2 mt-2">Create Playlist</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-scroll">
        <h1 className="text-2xl font-bold">Featured Charts</h1>
        <div className="flex space-x-4 overflow-x-scroll p-2">
          {albumsData.map((album) => (
            <div key={album.id} className="w-40 flex-shrink-0">
              <img src={album.image} alt={album.name} className="w-full rounded" />
              <h3 className="text-md font-semibold mt-2">{album.name}</h3>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold mt-6">Today's Biggest Hits</h2>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {songsData.map((song, index) => (
            <div key={song.id} className="bg-gray-800 p-4 rounded cursor-pointer hover:bg-gray-700">
              <img src={song.image} alt={song.name} className="w-full rounded" />
              <h3 className="text-md font-semibold mt-2">{song.name}</h3>
              <button onClick={() => playSong(index)} className="mt-2 p-2 bg-blue-500 rounded">Play</button>
            </div>
          ))}
        </div>
      </main>

      {/* Music Player */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={songsData[currentSongIndex].image} alt="current song" className="w-12 h-12 rounded" />
          <div>
            <h3 className="text-lg font-semibold">{songsData[currentSongIndex].name}</h3>
            <p className="text-sm text-gray-400">{songsData[currentSongIndex].artist}</p>
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          <button onClick={playPrevious} className="p-2 bg-gray-700 rounded">⏮</button>
          <button onClick={togglePlayPause} className="p-2 bg-gray-700 rounded">{isPlaying ? "⏸" : "▶"}</button>
          <button onClick={playNext} className="p-2 bg-gray-700 rounded">⏭</button>
        </div>
        <input 
          type="range" 
          value={progress} 
          max="100" 
          className="w-2/5"
          onChange={(e) => {
            if (audioRef.current) {
              audioRef.current.currentTime = (e.target.value / 100) * audioRef.current.duration;
              setProgress(e.target.value);
            }
          }}
        />
        <input 
          type="range" 
          value={volume} 
          min="0" 
          max="1" 
          step="0.01" 
          onChange={(e) => setVolume(e.target.value)} 
          className="w-16"
        />
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default MusicHome;
