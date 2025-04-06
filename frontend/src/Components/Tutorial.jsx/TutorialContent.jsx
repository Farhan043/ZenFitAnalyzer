import React, { useState, useEffect, useContext } from 'react';
import { tutorialData } from '../../assets/tutorials';
import { UserDataContext } from '../../Context/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
// import Navbar from '../Navbar';

const Tutorial1 = () => {
  const { user } = useContext(UserDataContext);
  const userId = user?._id || 'guest';
  const navigate = useNavigate();
  
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTutorials, setFilteredTutorials] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem(`fitlifeFavorites_${userId}`);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [viewingFavorites, setViewingFavorites] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [showCompletedWorkouts, setShowCompletedWorkouts] = useState(false);
  const [completedWorkouts, setCompletedWorkouts] = useState(() => {
    const savedCompleted = localStorage.getItem(`fitlifeCompleted_${userId}`);
    return savedCompleted ? JSON.parse(savedCompleted) : [];
  });
  
  // State variables (removed workout planner related ones)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('fitlifeDarkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [focusArea, setFocusArea] = useState('All');
  const [ratingSubmitted, setRatingSubmitted] = useState({});
  const [ratings, setRatings] = useState(() => {
    const savedRatings = localStorage.getItem(`fitlifeRatings_${userId}`);
    return savedRatings ? JSON.parse(savedRatings) : {};
  });
  // Store all user ratings separately for calculating average
  const [allUserRatings, setAllUserRatings] = useState(() => {
    // Get all items from localStorage that start with 'fitlifeRatings_'
    const allRatings = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('fitlifeRatings_')) {
        try {
          const userRatings = JSON.parse(localStorage.getItem(key));
          const userIdFromKey = key.replace('fitlifeRatings_', '');
          // Add user's ratings to the collection
          Object.entries(userRatings).forEach(([tutorialId, rating]) => {
            if (!allRatings[tutorialId]) {
              allRatings[tutorialId] = [];
            }
            allRatings[tutorialId].push({ userId: userIdFromKey, rating });
          });
        } catch (e) {
          console.error('Error parsing ratings from localStorage', e);
        }
      }
    }
    return allRatings;
  });
  const [activeTab, setActiveTab] = useState('browse');
  const [userNotes, setUserNotes] = useState(() => {
    const savedNotes = localStorage.getItem(`fitlifeNotes_${userId}`);
    return savedNotes ? JSON.parse(savedNotes) : {};
  });
  // Store all user notes for displaying in the tutorial modal
  const [allUserNotes, setAllUserNotes] = useState(() => {
    // Get all items from localStorage that start with 'fitlifeNotes_'
    const allNotes = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('fitlifeNotes_')) {
        try {
          const userNotes = JSON.parse(localStorage.getItem(key));
          const userIdFromKey = key.replace('fitlifeNotes_', '');
          // Add user's notes to the collection
          Object.entries(userNotes).forEach(([tutorialId, note]) => {
            if (!allNotes[tutorialId]) {
              allNotes[tutorialId] = [];
            }
            allNotes[tutorialId].push({ userId: userIdFromKey, note });
          });
        } catch (e) {
          console.error('Error parsing notes from localStorage', e);
        }
      }
    }
    return allNotes;
  });
  const [notesSaved, setNotesSaved] = useState({});
  
  // Get unique categories and levels
  const categories = ['All', ...new Set(tutorialData.map(tutorial => tutorial.category))];
  const levels = ['All', ...new Set(tutorialData.map(tutorial => tutorial.level))];
  const focusAreas = ['All', 'Upper Body', 'Lower Body', 'Core', 'Full Body', 'Cardio', 'Flexibility'];

  // Update localstorage items when userId changes
  useEffect(() => {
    if (userId) {
      // Load user-specific data when user changes
      const savedFavorites = localStorage.getItem(`fitlifeFavorites_${userId}`);
      setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
      
      const savedCompleted = localStorage.getItem(`fitlifeCompleted_${userId}`);
      setCompletedWorkouts(savedCompleted ? JSON.parse(savedCompleted) : []);
      
      const savedRatings = localStorage.getItem(`fitlifeRatings_${userId}`);
      setRatings(savedRatings ? JSON.parse(savedRatings) : {});
      
      const savedNotes = localStorage.getItem(`fitlifeNotes_${userId}`);
      setUserNotes(savedNotes ? JSON.parse(savedNotes) : {});
    }
  }, [userId]);

  // Update all user ratings and notes whenever there are changes
  useEffect(() => {
    // Refresh all user ratings when ratings change
    const allRatings = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('fitlifeRatings_')) {
        try {
          const userRatings = JSON.parse(localStorage.getItem(key));
          const userIdFromKey = key.replace('fitlifeRatings_', '');
          Object.entries(userRatings).forEach(([tutorialId, rating]) => {
            if (!allRatings[tutorialId]) {
              allRatings[tutorialId] = [];
            }
            allRatings[tutorialId].push({ userId: userIdFromKey, rating });
          });
        } catch (e) {
          console.error('Error parsing ratings from localStorage', e);
        }
      }
    }
    setAllUserRatings(allRatings);
    
    // Refresh all user notes when notes change
    const allNotes = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('fitlifeNotes_')) {
        try {
          const userNotes = JSON.parse(localStorage.getItem(key));
          const userIdFromKey = key.replace('fitlifeNotes_', '');
          Object.entries(userNotes).forEach(([tutorialId, note]) => {
            if (!allNotes[tutorialId]) {
              allNotes[tutorialId] = [];
            }
            allNotes[tutorialId].push({ userId: userIdFromKey, note });
          });
        } catch (e) {
          console.error('Error parsing notes from localStorage', e);
        }
      }
    }
    setAllUserNotes(allNotes);
  }, [ratings, userNotes]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('fitlifeDarkMode', JSON.stringify(newMode));
    
    // Apply dark mode to document
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Navigate to home page
  const navigateToHome = () => {
    window.location.href = '/';
  };

  // Apply dark mode on initial load
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Save user notes for a tutorial
  const saveNotes = (tutorialId, notes) => {
    const updatedNotes = { ...userNotes, [tutorialId]: notes };
    setUserNotes(updatedNotes);
    localStorage.setItem(`fitlifeNotes_${userId}`, JSON.stringify(updatedNotes));
    
    // Show save confirmation
    setNotesSaved({ ...notesSaved, [tutorialId]: true });
    
    // Hide confirmation after 3 seconds
    setTimeout(() => {
      setNotesSaved(prev => ({ ...prev, [tutorialId]: false }));
    }, 3000);
  };

  // Delete a note
  const deleteNote = (tutorialId, noteUserId) => {
    // Only allow users to delete their own notes
    if (noteUserId !== userId) return;
    
    // Remove note from user's notes
    const updatedNotes = { ...userNotes };
    delete updatedNotes[tutorialId];
    setUserNotes(updatedNotes);
    localStorage.setItem(`fitlifeNotes_${userId}`, JSON.stringify(updatedNotes));
  };

  // Save user rating for a tutorial
  const saveRating = (tutorialId, rating) => {
    const updatedRatings = { ...ratings, [tutorialId]: rating };
    setRatings(updatedRatings);
    setRatingSubmitted({ ...ratingSubmitted, [tutorialId]: true });
    localStorage.setItem(`fitlifeRatings_${userId}`, JSON.stringify(updatedRatings));
    
    // Show rating confirmation
    setTimeout(() => {
      setRatingSubmitted(prev => ({ ...prev, [tutorialId]: false }));
    }, 3000);
  };

  // Function to calculate average rating for a tutorial
  const getAverageRating = (tutorialId) => {
    const tutorialRatings = allUserRatings[tutorialId] || [];
    if (tutorialRatings.length === 0) return 0;
    
    const sum = tutorialRatings.reduce((total, ratingObj) => total + ratingObj.rating, 0);
    return parseFloat((sum / tutorialRatings.length).toFixed(1));
  };
  
  // Function to get count of ratings for a tutorial
  const getRatingCount = (tutorialId) => {
    return (allUserRatings[tutorialId] || []).length;
  };

  // Function to calculate the total number of rated tutorials
  const getTotalRatedTutorials = () => {
    return Object.keys(allUserRatings).length;
  };

  // Total user notes across all tutorials
  const getTotalNotes = () => {
    let total = 0;
    Object.values(allUserNotes).forEach(notesArray => {
      total += notesArray.length;
    });
    return total;
  };

  // Function to extract video ID from YouTube URL
  const getVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Function to close video modal
  const closeVideo = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  // Function to handle video modal opening
  const handleVideoOpen = (tutorial) => {
    setSelectedVideo(tutorial);
    document.body.style.overflow = 'hidden';
  };

  // Function to toggle favorite status
  const toggleFavorite = (e, tutorialId) => {
    e.stopPropagation();
    const isFavorite = favorites.includes(tutorialId);
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(id => id !== tutorialId);
    } else {
      newFavorites = [...favorites, tutorialId];
    }
    
    setFavorites(newFavorites);
    localStorage.setItem(`fitlifeFavorites_${userId}`, JSON.stringify(newFavorites));
  };

  // Function to toggle completed workout status
  const toggleCompleted = (e, tutorialId) => {
    e.stopPropagation();
    const isCompleted = completedWorkouts.includes(tutorialId);
    let newCompleted;
    
    if (isCompleted) {
      newCompleted = completedWorkouts.filter(id => id !== tutorialId);
    } else {
      newCompleted = [...completedWorkouts, tutorialId];
    }
    
    setCompletedWorkouts(newCompleted);
    localStorage.setItem(`fitlifeCompleted_${userId}`, JSON.stringify(newCompleted));
  };

  // Function to handle view mode toggle
  const toggleViewMode = () => {
    setViewingFavorites(!viewingFavorites);
  };

  // Filter tutorials based on selected category, level, search term, etc.
  useEffect(() => {
    let results = tutorialData;
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      results = results.filter(tutorial => tutorial.category === selectedCategory);
    }
    
    // Apply level filter
    if (selectedLevel !== 'All') {
      results = results.filter(tutorial => tutorial.level === selectedLevel);
    }
    
    // Apply focus area filter
    if (focusArea !== 'All') {
      results = results.filter(tutorial => {
        const description = tutorial.description.toLowerCase();
        const title = tutorial.title.toLowerCase();
        const area = focusArea.toLowerCase();
        
        return (
          description.includes(area) || 
          title.includes(area) ||
          (area === 'core' && (description.includes('ab') || description.includes('abs') || title.includes('ab') || title.includes('abs'))) ||
          (area === 'upper body' && (description.includes('arm') || description.includes('chest') || description.includes('shoulder') || title.includes('arm') || title.includes('chest') || title.includes('shoulder'))) ||
          (area === 'lower body' && (description.includes('leg') || description.includes('glute') || description.includes('thigh') || title.includes('leg') || title.includes('glute') || title.includes('thigh')))
        );
      });
    }
    
    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      results = results.filter(tutorial => 
        tutorial.title.toLowerCase().includes(lowercasedSearch) || 
        tutorial.description.toLowerCase().includes(lowercasedSearch) ||
        tutorial.category.toLowerCase().includes(lowercasedSearch) ||
        tutorial.level.toLowerCase().includes(lowercasedSearch) ||
        tutorial.instructor.toLowerCase().includes(lowercasedSearch)
      );
    }
    
    // Filter to favorites if viewing favorites mode is on
    if (viewingFavorites) {
      results = results.filter(tutorial => favorites.includes(tutorial.id));
    }
    
    // Filter to show completed workouts if enabled
    if (showCompletedWorkouts) {
      results = results.filter(tutorial => completedWorkouts.includes(tutorial.id));
    }
    
    // Apply sorting
    if (sortBy === 'duration-asc') {
      results = [...results].sort((a, b) => {
        const aMin = parseInt(a.duration.split(' ')[0]);
        const bMin = parseInt(b.duration.split(' ')[0]);
        return aMin - bMin;
      });
    } else if (sortBy === 'duration-desc') {
      results = [...results].sort((a, b) => {
        const aMin = parseInt(a.duration.split(' ')[0]);
        const bMin = parseInt(b.duration.split(' ')[0]);
        return bMin - aMin;
      });
    } else if (sortBy === 'level') {
      const levelOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'All Levels': 4 };
      results = [...results].sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);
    } else if (sortBy === 'rating') {
      results = [...results].sort((a, b) => {
        const aRating = getAverageRating(a.id) || 0;
        const bRating = getAverageRating(b.id) || 0;
        return bRating - aRating;
      });
    } else if (sortBy === 'recently-added') {
      // Assuming the first tutorials in the array are newest
      results = [...results].reverse();
    }
    
    setFilteredTutorials(results);
  }, [selectedCategory, selectedLevel, focusArea, searchTerm, favorites, viewingFavorites, completedWorkouts, showCompletedWorkouts, sortBy, allUserRatings]);

  // Function to clear completed workouts
  const clearCompletedWorkouts = () => {
    setCompletedWorkouts([]);
    localStorage.removeItem(`fitlifeCompleted_${userId}`);
    toast.success('Workout history cleared successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Function to clear favorites
  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem(`fitlifeFavorites_${userId}`);
    toast.success('Favorites cleared successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-gray-50 to-gray-100'}`}>
      {/* <Navbar /> */}
      
      {/* Hero Section with Background */}
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center"
           style={{
             minHeight: "75vh",
             backgroundImage: isDarkMode 
              ? "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3')"
              : "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3')",
             backgroundPosition: "center",
             backgroundSize: "cover",
             backgroundRepeat: "no-repeat",
             backgroundAttachment: "fixed"
           }}>
        
        {/* Home Button */}
        <button 
          onClick={() => navigate('/home')}
          className="absolute top-4 left-4 p-2 rounded-full bg-gray-700 bg-opacity-50 text-white hover:bg-opacity-70 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 z-30"
          aria-label="Go to Home"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        {!isDarkMode && <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-blue-700/80"></div>}
        <div className="container relative mx-auto px-4 z-10">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-7/12 px-4 ml-auto mr-auto text-center">
              <div className={`${isDarkMode ? 'text-gray-100' : 'text-white'}`}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 animate-fade-in-down">
                  Find Your Perfect Workout
                </h1>
                <p className="mt-4 text-lg md:text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
                  Access high-quality workout tutorials for every fitness level.
                  Start your journey towards a healthier lifestyle today.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a href="#main-content" 
                     className={`px-8 py-3 ${isDarkMode ? 'bg-gray-800 text-green-400 hover:bg-gray-700' : 'bg-white text-green-600'} font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 inline-block transform hover:scale-105`}>
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    Browse Tutorials
                    </span>
                  </a>
                  <button
                    onClick={toggleViewMode}
                    className={`px-8 py-3 font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 inline-block transform hover:scale-105 ${
                      viewingFavorites 
                        ? isDarkMode ? 'bg-gray-800 text-purple-400 hover:bg-gray-700' : 'bg-white text-purple-600' 
                        : isDarkMode ? 'bg-purple-700 text-white hover:bg-purple-800' : 'bg-purple-600 text-white'
                    }`}
                  >
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill={viewingFavorites ? 'none' : 'currentColor'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {viewingFavorites ? 'View All Tutorials' : 'View Favorites'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-700 bg-opacity-50 text-white hover:bg-opacity-70 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>

      
      {/* Main Navigation Tabs */}
      <div id="main-content" className={`container mx-auto px-4 -mt-20 mb-8 relative z-20`}>
        <div className={`${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'} rounded-xl shadow-xl p-4 sm:p-6 backdrop-blur-sm ${!isDarkMode && 'bg-white/90'} transition-all duration-300`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4 sm:mb-6">
            <div className="col-span-1 md:col-span-4">
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 mb-6 sm:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-center sm:text-left mb-2 sm:mb-0 flex items-center">
                  {viewingFavorites ? (
                    <>
                      <svg className="w-7 h-7 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      Your Favorite Workouts
                    </>
                  ) : showCompletedWorkouts ? (
                    <>
                      <svg className="w-7 h-7 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Your Completed Workouts
                    </>
                  ) : (
                    <>
                      <svg className="w-7 h-7 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Find Your Perfect Workout
                    </>
                  )}
                </h2>
                
                {/* Desktop Stats & Action Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                  <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                    <div className="text-center mr-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{completedWorkouts.length}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Favorites</p>
                      <p className="text-xl font-bold text-red-600 dark:text-red-400">{favorites.length}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={clearCompletedWorkouts}
                    disabled={completedWorkouts.length === 0}
                    className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center ${
                      completedWorkouts.length > 0
                        ? isDarkMode
                          ? 'bg-blue-700 text-white hover:bg-blue-800'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    } transition-all duration-200`}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear History
                  </button>
                  
                  <button
                    onClick={clearFavorites}
                    disabled={favorites.length === 0}
                    className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center ${
                      favorites.length > 0
                        ? isDarkMode
                          ? 'bg-red-700 text-white hover:bg-red-800'
                          : 'bg-red-600 text-white hover:bg-red-700'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    } transition-all duration-200`}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear Favorites
                  </button>
                </div>
              </div>
              
              {/* Main Navigation Tabs */}
              <div className="flex flex-col mb-6">
                {/* Tabs */}
                <div className="flex flex-wrap justify-center md:justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700/50 rounded-xl p-1.5 shadow-md w-full">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <button
                        onClick={() => { setActiveTab('browse'); setShowCompletedWorkouts(false); setViewingFavorites(false); }}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
                          activeTab === 'browse' 
                            ? isDarkMode 
                              ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg' 
                              : 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg' 
                            : isDarkMode 
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700/70' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/70'
                        }`}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        All
                        <span className={`ml-2 px-2.5 py-0.5 text-xs rounded-full ${
                          activeTab === 'browse'
                            ? isDarkMode ? 'bg-white/20 text-white' : 'bg-white/30 text-white'
                            : isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                        }`}>
                          {tutorialData.length}
                        </span>
                      </button>
                      
                      <button
                        onClick={() => { setActiveTab('completed'); setShowCompletedWorkouts(true); setViewingFavorites(false); }}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
                          activeTab === 'completed' 
                            ? isDarkMode 
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                              : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg' 
                            : isDarkMode 
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700/70' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/70'
                        }`}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Completed
                        {completedWorkouts.length > 0 && (
                          <span className={`ml-2 px-2.5 py-0.5 text-xs rounded-full ${
                            activeTab === 'completed'
                              ? isDarkMode ? 'bg-white/20 text-white' : 'bg-white/30 text-white'
                              : isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                          }`}>
                            {completedWorkouts.length}
                          </span>
                        )}
                      </button>
                      
                      <button
                        onClick={() => { setActiveTab('favorites'); setViewingFavorites(true); setShowCompletedWorkouts(false); }}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
                          activeTab === 'favorites' 
                            ? isDarkMode 
                              ? 'bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg' 
                              : 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg' 
                            : isDarkMode 
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700/70' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/70'
                        }`}
                      >
                        <svg className="w-5 h-5 mr-2" fill={activeTab === 'favorites' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Favorites
                        {favorites.length > 0 && (
                          <span className={`ml-2 px-2.5 py-0.5 text-xs rounded-full ${
                            activeTab === 'favorites'
                              ? isDarkMode ? 'bg-white/20 text-white' : 'bg-white/30 text-white'
                              : isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                          }`}>
                            {favorites.length}
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => { setActiveTab('categories'); setShowCompletedWorkouts(false); setViewingFavorites(false); }}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
                          activeTab === 'categories' 
                            ? isDarkMode 
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' 
                              : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' 
                            : isDarkMode 
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700/70' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/70'
                        }`}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        Categories
                        <span className={`ml-2 px-2.5 py-0.5 text-xs rounded-full ${
                          activeTab === 'categories'
                            ? isDarkMode ? 'bg-white/20 text-white' : 'bg-white/30 text-white'
                            : isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                        }`}>
                          {categories.length - 1}
                        </span>
                      </button>

                      <button
                        onClick={() => { setActiveTab('levels'); setShowCompletedWorkouts(false); setViewingFavorites(false); }}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
                          activeTab === 'levels' 
                            ? isDarkMode 
                              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' 
                              : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg' 
                            : isDarkMode 
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700/70' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/70'
                        }`}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Levels
                        <span className={`ml-2 px-2.5 py-0.5 text-xs rounded-full ${
                          activeTab === 'levels'
                            ? isDarkMode ? 'bg-white/20 text-white' : 'bg-white/30 text-white'
                            : isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                        }`}>
                          {levels.length - 1}
                        </span>
                      </button>

                      <button
                        onClick={() => { setActiveTab('focus'); setShowCompletedWorkouts(false); setViewingFavorites(false); }}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
                          activeTab === 'focus' 
                            ? isDarkMode 
                              ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-lg' 
                              : 'bg-gradient-to-r from-blue-500 to-sky-500 text-white shadow-lg' 
                            : isDarkMode 
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700/70' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/70'
                        }`}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        Focus Area
                        <span className={`ml-2 px-2.5 py-0.5 text-xs rounded-full ${
                          activeTab === 'focus'
                            ? isDarkMode ? 'bg-white/20 text-white' : 'bg-white/30 text-white'
                            : isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                        }`}>
                          {focusAreas.length - 1}
                        </span>
                      </button>
                    </div>

                    {/* Search and Sort Bar */}
                    <div className="flex flex-wrap items-center gap-3 mb-2 px-2">
                      <div className="relative flex-1 min-w-[200px]">
                        <input
                          type="text"
                          placeholder="Search workouts..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className={`w-full px-4 py-2 pl-9 text-sm ${
                            isDarkMode 
                              ? 'bg-gray-700/80 border-gray-600 text-white placeholder:text-gray-400' 
                              : 'bg-white border-gray-300 text-gray-800 placeholder:text-gray-500'
                          } rounded-lg focus:outline-none focus:ring-2 ${
                            isDarkMode ? 'focus:ring-gray-500' : 'focus:ring-gray-400'
                          } transition-all`}
                        />
                        <div className="absolute left-2.5 top-2.5 text-gray-400 pointer-events-none">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        {searchTerm && (
                          <button 
                            onClick={() => setSearchTerm('')}
                            className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>

                      <div className="relative">
                        <div className="flex items-center">
                          <span className={`mr-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sort by:</span>
                          <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={`px-3 py-2 text-sm border rounded-lg ${
                              isDarkMode 
                                ? 'bg-gray-700/80 border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-800'
                            } focus:outline-none focus:ring-2 focus:ring-gray-400`}
                          >
                            <option value="default">Default</option>
                            <option value="duration-asc">Duration (Shortest)</option>
                            <option value="duration-desc">Duration (Longest)</option>
                            <option value="level">Level</option>
                            <option value="rating">Highest Rated</option>
                            <option value="recently-added">Recently Added</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Tab Content */}
                    <div className="mt-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      {activeTab === 'categories' && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                          {categories.map((category) => (
                            <button
                              key={category}
                              onClick={() => {
                                setSelectedCategory(category);
                                setActiveTab('browse');
                              }}
                              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                                selectedCategory === category
                                  ? isDarkMode 
                                    ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-md' 
                                    : 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md'
                                  : isDarkMode 
                                    ? 'bg-gray-700/80 text-gray-300 hover:bg-gray-600' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      )}

                      {activeTab === 'levels' && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {levels.map((level) => (
                            <button
                              key={level}
                              onClick={() => {
                                setSelectedLevel(level);
                                setActiveTab('browse');
                              }}
                              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                                selectedLevel === level
                                  ? isDarkMode 
                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' 
                                    : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                                  : isDarkMode 
                                    ? 'bg-gray-700/80 text-gray-300 hover:bg-gray-600' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      )}

                      {activeTab === 'focus' && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {focusAreas.map((area) => (
                            <button
                              key={area}
                              onClick={() => {
                                setFocusArea(area);
                                setActiveTab('browse');
                              }}
                              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                                focusArea === area
                                  ? isDarkMode 
                                    ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-md' 
                                    : 'bg-gradient-to-r from-blue-500 to-sky-500 text-white shadow-md'
                                  : isDarkMode 
                                    ? 'bg-gray-700/80 text-gray-300 hover:bg-gray-600' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {area}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Active Filter Display */}
                {(selectedCategory !== 'All' || selectedLevel !== 'All' || focusArea !== 'All') && (
                  <div className={`flex flex-wrap gap-2 mt-4 p-3 rounded-lg ${
                    isDarkMode ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white/80 border border-gray-200/70'
                  }`}>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Active filters:</div>
                    
                    {selectedCategory !== 'All' && (
                      <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${
                        isDarkMode ? 'from-green-600/60 to-teal-600/60 text-white' : 'from-green-100 to-teal-100 text-teal-800'
                      }`}>
                        <span>Category: {selectedCategory}</span>
                        <button 
                          onClick={() => setSelectedCategory('All')}
                          className="ml-1.5 p-0.5 rounded-full hover:bg-white/20"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                    
                    {selectedLevel !== 'All' && (
                      <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${
                        isDarkMode ? 'from-purple-600/60 to-indigo-600/60 text-white' : 'from-purple-100 to-indigo-100 text-purple-800'
                      }`}>
                        <span>Level: {selectedLevel}</span>
                        <button 
                          onClick={() => setSelectedLevel('All')}
                          className="ml-1.5 p-0.5 rounded-full hover:bg-white/20"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                    
                    {focusArea !== 'All' && (
                      <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${
                        isDarkMode ? 'from-blue-600/60 to-sky-600/60 text-white' : 'from-blue-100 to-sky-100 text-blue-800'
                      }`}>
                        <span>Focus: {focusArea}</span>
                        <button 
                          onClick={() => setFocusArea('All')}
                          className="ml-1.5 p-0.5 rounded-full hover:bg-white/20"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                    
                    <button 
                      onClick={() => {
                        setSelectedCategory('All');
                        setSelectedLevel('All');
                        setFocusArea('All');
                      }}
                      className={`ml-auto text-xs px-2 py-1 rounded ${
                        isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-3">
              {activeTab === 'browse' && (
                <div>
                </div>
              )}

              {activeTab === 'completed' && (
                <div className="mb-6">
                  <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Your Completed Workouts
                  </h3>
                  
                  {completedWorkouts.length === 0 ? (
                    <div className={`text-center py-10 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100'} rounded-lg shadow-inner`}>
                      <svg className={`w-20 h-20 mx-auto ${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        No completed workouts yet
                      </h4>
                      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 max-w-md mx-auto`}>
                        Start marking tutorials as completed to track your progress and see your workout history here.
                      </p>
                      <button
                        onClick={() => setActiveTab('browse')}
                        className={`px-6 py-2 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:scale-105`}
                      >
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                          </svg>
                          Browse Tutorials
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className={`p-6 mb-6 rounded-lg ${isDarkMode ? 'bg-gradient-to-r from-blue-900 to-green-900 text-gray-200' : 'bg-gradient-to-r from-blue-100 to-green-100 text-gray-700'} shadow-md`}>
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
                          <div className="flex items-center">
                            <div className={`p-3 rounded-full ${isDarkMode ? 'bg-blue-800' : 'bg-blue-200'} mr-4`}>
                              <svg className={`w-8 h-8 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Workout Statistics</h4>
                              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                <span className="font-bold">{completedWorkouts.length}</span> workout{completedWorkouts.length !== 1 ? 's' : ''} completed
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => setActiveTab('browse')}
                              className={`px-4 py-2 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-lg shadow-sm transition-colors`}
                            >
                              Add More
                            </button>
                            
                            <button
                              onClick={clearCompletedWorkouts}
                              className={`px-4 py-2 ${isDarkMode ? 'bg-red-900 hover:bg-red-800 text-red-100' : 'bg-red-100 hover:bg-red-200 text-red-800'} rounded-lg shadow-sm transition-colors`}
                            >
                              Clear History
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {completedWorkouts.map(id => {
                          const tutorial = tutorialData.find(t => t.id === id);
                          if (!tutorial) return null;
                          
                          return (
                            <div 
                              key={tutorial.id}
                              onClick={() => handleVideoOpen(tutorial)}
                              className={`flex rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transform hover:-translate-y-1`}
                            >
                              <div className="flex-shrink-0 w-24 relative">
                                <img src={tutorial.thumbnail} alt={tutorial.title} className="h-full w-full object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-xs font-medium py-1 text-center">
                                  Completed
                                </div>
                              </div>
                              <div className="p-3 flex-grow">
                                <h5 className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} line-clamp-2 text-sm`}>
                                  {tutorial.title}
                                </h5>
                                <div className="flex items-center mt-2 justify-between">
                                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {tutorial.duration}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleCompleted(e, tutorial.id);
                                    }}
                                    className={`text-xs py-1 px-2 rounded ${isDarkMode ? 'text-red-300 hover:bg-red-900/40' : 'text-red-600 hover:bg-red-50'}`}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'favorites' && (
                <div className="mb-6">
                  <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Your Favorite Workouts
                  </h3>
                  
                  {favorites.length === 0 ? (
                    <div className={`text-center py-10 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100'} rounded-lg shadow-inner`}>
                      <svg className={`w-20 h-20 mx-auto ${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <h4 className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        No favorite workouts yet
                      </h4>
                      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 max-w-md mx-auto`}>
                        Add workouts to your favorites for quick access to your preferred tutorials.
                      </p>
                      <button
                        onClick={() => setActiveTab('browse')}
                        className={`px-6 py-2 ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:scale-105`}
                      >
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                          </svg>
                          Browse Tutorials
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className={`p-6 mb-6 rounded-lg ${isDarkMode ? 'bg-gradient-to-r from-red-900 to-purple-900 text-gray-200' : 'bg-gradient-to-r from-red-100 to-purple-100 text-gray-700'} shadow-md`}>
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
                          <div className="flex items-center">
                            <div className={`p-3 rounded-full ${isDarkMode ? 'bg-red-800' : 'bg-red-200'} mr-4`}>
                              <svg className={`w-8 h-8 ${isDarkMode ? 'text-red-300' : 'text-red-600'}`} fill={isDarkMode ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Your Favorites</h4>
                              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                <span className="font-bold">{favorites.length}</span> workout{favorites.length !== 1 ? 's' : ''} in your favorites
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => setActiveTab('browse')}
                              className={`px-4 py-2 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-lg shadow-sm transition-colors`}
                            >
                              Add More
                            </button>
                            
                            <button
                              onClick={clearFavorites}
                              className={`px-4 py-2 ${isDarkMode ? 'bg-red-900 hover:bg-red-800 text-red-100' : 'bg-red-100 hover:bg-red-200 text-red-800'} rounded-lg shadow-sm transition-colors`}
                            >
                              Clear Favorites
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {favorites.map(id => {
                          const tutorial = tutorialData.find(t => t.id === id);
                          if (!tutorial) return null;
                          
                          return (
                            <div 
                              key={tutorial.id}
                              onClick={() => handleVideoOpen(tutorial)}
                              className={`flex rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transform hover:-translate-y-1`}
                            >
                              <div className="flex-shrink-0 w-24 relative">
                                <img src={tutorial.thumbnail} alt={tutorial.title} className="h-full w-full object-cover" />
                                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-medium p-1">
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                  </svg>
                                </div>
                              </div>
                              <div className="p-3 flex-grow">
                                <h5 className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} line-clamp-2 text-sm`}>
                                  {tutorial.title}
                                </h5>
                                <div className="flex items-center mt-2 justify-between">
                                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {tutorial.duration}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleFavorite(e, tutorial.id);
                                    }}
                                    className={`text-xs py-1 px-2 rounded ${isDarkMode ? 'text-red-300 hover:bg-red-900/40' : 'text-red-600 hover:bg-red-50'}`}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tutorials Grid Section */}
      <section className={`pb-20 ${isDarkMode ? 'text-gray-100' : ''}`}>
        <div className="container mx-auto px-4">
          {filteredTutorials.length === 0 ? (
            <div className={`text-center py-20 ${isDarkMode ? 'text-gray-300' : ''}`}>
              <svg className={`w-16 h-16 mx-auto ${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
                {viewingFavorites ? 'No favorite tutorials found' : 'No tutorials found'}
              </h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                {viewingFavorites 
                  ? 'Add tutorials to your favorites to see them here'
                  : 'Try adjusting your search or category filter'}
              </p>
              {viewingFavorites && (
                <button
                  onClick={toggleViewMode}
                  className={`mt-4 px-6 py-2 ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white font-medium rounded-lg transition-colors`}
                >
                  Browse All Tutorials
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-2 sm:mb-0`}>
                  {viewingFavorites 
                    ? 'Your Favorite Workouts' 
                    : selectedCategory === 'All' 
                      ? 'All Workouts' 
                      : `${selectedCategory} Workouts`}
                </h2>
                <div className={`inline-flex items-center px-3 py-1 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    <span className="font-medium">{filteredTutorials.length}</span> tutorials found
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTutorials.map((tutorial) => (
                  <div 
                    key={tutorial.id} 
                    onClick={() => handleVideoOpen(tutorial)}
                    className={`flex flex-col ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full transform hover:-translate-y-2 cursor-pointer`}
                  >
                    <div className="relative overflow-hidden group" style={{ paddingBottom: '56.25%' }}>
                      <img
                        alt={tutorial.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={tutorial.thumbnail}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 m-2 rounded-full text-sm font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {tutorial.duration}
                      </div>
                      
                      {/* Rating display */}
                      {getRatingCount(tutorial.id) > 0 && (
                        <div className="absolute top-0 left-0 bg-yellow-500 text-white px-3 py-1 m-2 rounded-full text-sm font-medium flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                          {getAverageRating(tutorial.id)} ({getRatingCount(tutorial.id)})
                        </div>
                      )}
                      
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-300 transform hover:scale-110">
                          <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Favorite button */}
                      <button
                        onClick={(e) => toggleFavorite(e, tutorial.id)}
                        className={`absolute bottom-3 right-3 p-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none ${
                          favorites.includes(tutorial.id) 
                            ? 'bg-red-500 text-white' 
                            : isDarkMode 
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                              : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                        aria-label={favorites.includes(tutorial.id) ? "Remove from favorites" : "Add to favorites"}
                      >
                        <svg 
                          className={`w-5 h-5 ${favorites.includes(tutorial.id) ? 'text-white' : ''}`} 
                          viewBox="0 0 24 24"
                          stroke={favorites.includes(tutorial.id) ? 'none' : 'currentColor'}
                          fill={favorites.includes(tutorial.id) ? 'currentColor' : 'none'}
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                          />
                        </svg>
                      </button>
                      
                      {/* Completed workout badge */}
                      {completedWorkouts.includes(tutorial.id) && (
                        <div className="absolute bottom-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-md">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Completed
                        </div>
                      )}
                    </div>
                    
                    <div className={`p-5 flex-grow flex flex-col ${isDarkMode ? 'text-gray-100' : ''}`}>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${isDarkMode ? 'text-blue-300 bg-blue-900' : 'text-blue-600 bg-blue-100'}`}>
                          {tutorial.category}
                        </span>
                        <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${isDarkMode ? 'text-purple-300 bg-purple-900' : 'text-purple-600 bg-purple-100'}`}>
                          {tutorial.level}
                        </span>
                        
                        {/* User rating badge if exists */}
                        {ratings[tutorial.id] && (
                          <span className={`text-xs font-semibold inline-block py-1 px-2 rounded-full flex items-center ${isDarkMode ? 'text-yellow-300 bg-yellow-900' : 'text-yellow-600 bg-yellow-100'}`}>
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            {ratings[tutorial.id]}
                          </span>
                        )}
                      </div>
                      
                      <h3 className={`text-lg font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-2 line-clamp-2 hover:text-${isDarkMode ? 'green-400' : 'green-600'} transition-colors`}>
                        {tutorial.title}
                      </h3>
                      
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 line-clamp-3 flex-grow text-sm`}>
                        {tutorial.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center">
                          <svg className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{tutorial.instructor}</span>
                        </div>
                        
                        {/* Mark as completed toggle */}
                        <button
                          onClick={(e) => toggleCompleted(e, tutorial.id)}
                          className={`text-sm font-medium rounded-full px-2 py-1 ${
                            completedWorkouts.includes(tutorial.id)
                              ? isDarkMode ? 'bg-green-800 text-green-300' : 'bg-green-100 text-green-700'
                              : isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {completedWorkouts.includes(tutorial.id) ? 'Completed' : 'Mark Complete'}
                        </button>
                      </div>
                      
                      {/* Notes indicator */}
                      {((userNotes[tutorial.id] && userNotes[tutorial.id].trim() !== '') || 
                        (allUserNotes[tutorial.id] && allUserNotes[tutorial.id].length > 0)) && (
                        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                          <div className="flex items-start">
                            <svg className={`w-4 h-4 mt-0.5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} mr-1.5 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            {userNotes[tutorial.id] && (
                              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-xs line-clamp-1`}>
                                {userNotes[tutorial.id]}
                                {allUserNotes[tutorial.id] && allUserNotes[tutorial.id].length > 1 && 
                                  <span className="ml-1 text-xs font-medium text-blue-500">
                                    +{allUserNotes[tutorial.id].length - 1} more
                                  </span>
                                }
                              </p>
                            )}
                            {!userNotes[tutorial.id] && allUserNotes[tutorial.id] && allUserNotes[tutorial.id].length > 0 && (
                              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-xs line-clamp-1`}>
                                {allUserNotes[tutorial.id][0].note.substring(0, 30)}...
                                {allUserNotes[tutorial.id].length > 1 && 
                                  <span className="ml-1 text-xs font-medium text-blue-500">
                                    +{allUserNotes[tutorial.id].length - 1} more
                                  </span>
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex justify-center p-4" style={{ overflowY: 'auto' }}>
          <div className="container max-w-6xl mx-auto my-4">
            <div className={`relative rounded-lg shadow-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
              {/* Close Button */}
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 z-10"
                aria-label="Close video"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Video Player */}
              <div className="w-full bg-black">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${getVideoId(selectedVideo.youtubeLink)}`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="p-6">
                {/* Video Details Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDarkMode 
                          ? selectedVideo.level === 'Beginner' 
                            ? 'bg-green-600/20 text-green-400'
                            : selectedVideo.level === 'Intermediate' 
                              ? 'bg-yellow-600/20 text-yellow-400'
                              : 'bg-red-600/20 text-red-400'
                          : selectedVideo.level === 'Beginner' 
                            ? 'bg-green-100 text-green-700'
                            : selectedVideo.level === 'Intermediate' 
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                      }`}>
                        {selectedVideo.level}
                      </span>
                      
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDarkMode ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {selectedVideo.category}
                      </span>
                      
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {selectedVideo.duration}
                      </span>
                    </div>
                    
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">{selectedVideo.title}</h2>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                      {selectedVideo.description}
                    </p>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex items-center">
                        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mr-2`}>Instructor:</span>
                        <span className="font-medium">{selectedVideo.instructor}</span>
                      </div>
                      <div className="flex items-center">
                        <div className={`mr-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i}>
                              {i < Math.round(getAverageRating(selectedVideo.id) || 0) ? (
                                <svg className="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                              )}
                            </span>
                          ))}
                        </div>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          ({getRatingCount(selectedVideo.id) || 0} ratings)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => toggleFavorite(e, selectedVideo.id)}
                      className={`px-4 py-2 rounded-lg flex items-center ${
                        favorites.includes(selectedVideo.id)
                          ? isDarkMode 
                            ? 'bg-pink-600/20 text-pink-400 hover:bg-pink-600/30' 
                            : 'bg-pink-100 text-pink-600 hover:bg-pink-200' 
                          : isDarkMode 
                            ? 'bg-gray-700 text-gray-300 hover:text-pink-400 hover:bg-pink-600/20' 
                            : 'bg-gray-100 text-gray-600 hover:text-pink-600 hover:bg-pink-100'
                      } transition-colors`}
                    >
                      <svg className="w-5 h-5 mr-2" fill={favorites.includes(selectedVideo.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {favorites.includes(selectedVideo.id) ? 'Saved' : 'Save'}
                    </button>
                    
                    <button
                      onClick={(e) => toggleCompleted(e, selectedVideo.id)}
                      className={`px-4 py-2 rounded-lg flex items-center ${
                        completedWorkouts.includes(selectedVideo.id)
                          ? isDarkMode 
                            ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'
                            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          : isDarkMode 
                            ? 'bg-gray-700 text-gray-300 hover:text-blue-400 hover:bg-blue-600/20'
                            : 'bg-gray-100 text-gray-600 hover:text-blue-600 hover:bg-blue-100'
                      } transition-colors`}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {completedWorkouts.includes(selectedVideo.id) ? 'Completed' : 'Mark Complete'}
                    </button>
                  </div>
                </div>
                
                {/* Equipment & Benefits Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-indigo-50'}`}>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <svg className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      Equipment Needed
                    </h3>
                    <ul className={`list-disc list-inside ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {selectedVideo.equipment && selectedVideo.equipment.length > 0 ? (
                        selectedVideo.equipment.map((item, index) => (
                          <li key={index} className="mb-1">{item}</li>
                        ))
                      ) : (
                        <li>No special equipment needed</li>
                      )}
                    </ul>
                  </div>
                  
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-indigo-50'}`}>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <svg className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Benefits
                    </h3>
                    <ul className={`list-disc list-inside ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {selectedVideo.benefits && selectedVideo.benefits.length > 0 ? (
                        selectedVideo.benefits.map((benefit, index) => (
                          <li key={index} className="mb-1">{benefit}</li>
                        ))
                      ) : (
                        <>
                          <li className="mb-1">Improves overall fitness and strength</li>
                          <li className="mb-1">Enhances flexibility and mobility</li>
                          <li className="mb-1">Boosts energy and reduces stress</li>
                          <li className="mb-1">Supports weight management goals</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
                
                {/* Rating and Notes Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Rating */}
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <svg className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Rate This Workout
                    </h3>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-center py-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={(e) => {
                              e.stopPropagation();
                              saveRating(selectedVideo.id, star);
                            }}
                            className={`mx-1 p-1 rounded-full focus:outline-none transition-transform hover:scale-110 ${
                              (ratings[selectedVideo.id] || 0) >= star
                                ? isDarkMode ? 'text-yellow-400' : 'text-yellow-500'
                                : isDarkMode ? 'text-gray-600' : 'text-gray-300'
                            }`}
                          >
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                      {ratingSubmitted[selectedVideo.id] && (
                        <div className={`text-center mt-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                          Rating saved!
                        </div>
                      )}
                    </div>
                    
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {getRatingCount(selectedVideo.id) > 0 ? (
                        <div className="text-center">
                          <span className="font-medium">{getAverageRating(selectedVideo.id).toFixed(1)}</span> out of 5
                          <span className="mx-1">•</span>
                          Based on {getRatingCount(selectedVideo.id)} {getRatingCount(selectedVideo.id) === 1 ? 'rating' : 'ratings'}
                        </div>
                      ) : (
                        <div className="text-center">Be the first to rate this workout!</div>
                      )}
                    </div>
                  </div>
                  
                  {/* Notes */}
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <svg className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Your Notes
                    </h3>
                    
                    <div className="mb-4">
                      <textarea
                        value={userNotes[selectedVideo.id] || ''}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          const notes = e.target.value;
                          setUserNotes({...userNotes, [selectedVideo.id]: notes});
                        }}
                        className={`w-full rounded-lg p-3 min-h-[100px] ${
                          isDarkMode 
                            ? 'bg-gray-600 border-gray-500 text-white placeholder:text-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
                        } focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none`}
                        placeholder="Add your notes about this workout..."
                      ></textarea>
                      
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            saveNotes(selectedVideo.id, userNotes[selectedVideo.id] || '');
                          }}
                          className={`px-4 py-2 rounded-lg flex items-center ${
                            isDarkMode 
                              ? 'bg-purple-600/20 text-purple-400 hover:bg-purple-600/30'
                              : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                          }`}
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                          </svg>
                          Save Notes
                        </button>
                      </div>
                      
                      {notesSaved[selectedVideo.id] && (
                        <div className={`text-right mt-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                          Notes saved!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Community Notes */}
                {allUserNotes[selectedVideo.id] && allUserNotes[selectedVideo.id].length > 0 && (
                  <div className={`mb-4 p-4 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <svg className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                      Community Notes ({allUserNotes[selectedVideo.id].length})
                    </h3>
                    
                    <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                      {allUserNotes[selectedVideo.id].map((noteObj, index) => (
                        <div key={index} className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                          <div className="flex justify-between items-start mb-2">
                            <div className={`flex items-center ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span className="text-sm font-medium">User {noteObj.userId.substr(0, 6)}</span>
                            </div>
                            
                            {noteObj.userId === userId && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNote(selectedVideo.id, noteObj.userId);
                                }}
                                className={`p-1 rounded-full hover:bg-gray-200 ${isDarkMode ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' : 'text-gray-500 hover:text-red-500'}`}
                                title="Delete note"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                          <p className={`text-sm whitespace-pre-wrap ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {noteObj.note}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Tutorial1;