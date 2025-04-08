import React, { useState, useEffect, useRef } from 'react';
import { UserDataContext } from '../../Context/UserContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Welcome = () => {
  const { user, setUser } = React.useContext(UserDataContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [hasProfilePicture, setHasProfilePicture] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  // Handle video load event
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  // Fetch user's profile picture on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        
        if (response.data.user.profilePicture) {
          setPreviewUrl(response.data.user.profilePicture);
          setHasProfilePicture(true);
          // Update local storage with the Cloudinary URL
          localStorage.setItem('profilePicture', response.data.user.profilePicture);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Check file type
      if (!file.type.match(/^image\/(jpeg|jpg|png)$/i)) {
        toast.error("Only JPEG, JPG, and PNG images are allowed");
        return;
      }

      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setHasProfilePicture(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      toast.info("Please select an image first");
      return;
    }

    if (selectedImage.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("profilePhoto", selectedImage);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Please login to upload profile picture");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/upload-photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        const profileUrl = response.data.profilePicture;
        
        // Update user context
        setUser(prev => ({
          ...prev,
          profilePicture: profileUrl
        }));
        
        // Store Cloudinary URL in localStorage
        localStorage.setItem('profilePicture', profileUrl);
        
        setPreviewUrl(profileUrl);
        setHasProfilePicture(true);
        setSelectedImage(null);
        toast.success("Profile picture uploaded successfully!");

        // Update user profile
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/users/update-profile`,
          { profilePicture: profileUrl },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        error.response?.data?.message || 
        "Failed to upload profile picture. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          onLoadedData={handleVideoLoaded}
        >
          <source src="https://cdn.pixabay.com/video/2023/10/06/183734-872027044_tiny.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Custom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/80 to-purple-900/40"></div>
      </div>

      {/* Loading screen */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mb-4"></div>
          <p className="text-purple-300 animate-pulse">Loading your cosmic journey...</p>
        </div>
      )}

      {/* Animated stars */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, index) => (
          <div 
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 4 + 3}s infinite ${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main content with cosmic layout */}
      <div className="min-h-screen relative z-10 container mx-auto px-4 py-4 md:py-8 flex flex-col">
        {/* Floating cosmic circles */}
        <div className="absolute top-1/4 -left-20 w-40 md:w-60 h-40 md:h-60 rounded-full bg-purple-700/20 filter blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-32 w-60 md:w-80 h-60 md:h-80 rounded-full bg-blue-500/10 filter blur-3xl"></div>
        
        {/* Header */}
        <div className="flex justify-center mb-4 md:mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="py-2 md:py-3 px-4 md:px-6 bg-purple-900/30 backdrop-blur-sm rounded-full border-t border-purple-500/20 shadow-lg"
          >
            <h1 className="text-lg md:text-xl text-white font-medium">Cosmic Journey</h1>
          </motion.div>
        </div>
        
        {/* Main content area */}
        <div className="flex flex-col lg:flex-row flex-grow items-center justify-center gap-6 md:gap-8 lg:gap-12 mt-2 md:mt-0">
          {/* Left Panel - Profile & Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-sm lg:w-5/12 bg-black/20 backdrop-blur-md rounded-3xl border border-purple-500/20 overflow-hidden shadow-[0_0_25px_rgba(139,92,246,0.15)]"
          >
            <div className="p-4 md:p-5 lg:p-8">
              {/* User profile & Picture */}
              <div className="flex flex-col items-center">
                <div className="relative group mb-4 md:mb-6">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                        <span className="text-2xl md:text-4xl text-white">
                          {user?.name?.charAt(0)?.toUpperCase() || '?'}
                        </span>
                      </div>
                    )}
                    
                    {/* Glowing ring effect */}
                    <div className="absolute inset-0 border-8 border-purple-500/10 rounded-full animate-pulse-slow"></div>
                  </div>
                  
                  <label className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full p-2 md:p-2.5 shadow-lg cursor-pointer hover:shadow-[0_0_10px_rgba(139,92,246,0.7)] transition-all duration-300 group-hover:scale-110 hover:scale-110">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </label>
                </div>
                
                {/* Upload Button */}
                {selectedImage && !hasProfilePicture && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="px-4 md:px-6 py-2 mb-4 md:mb-6 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full text-white text-sm md:text-base font-medium shadow-lg hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300 disabled:opacity-50 transform hover:scale-105"
                  >
                    {isUploading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </div>
                    ) : "Upload Profile Picture"}
                  </motion.button>
                )}

                {/* User info card */}
                <div className="w-full bg-white/5 backdrop-blur-md rounded-xl p-4 md:p-5 border border-purple-500/10">
                  <h2 className="text-base md:text-xl text-white font-semibold mb-2">Profile Information</h2>
                  <div className="space-y-2 md:space-y-3 text-left">
                    <div>
                      <p className="text-purple-300 text-xs md:text-sm">Name</p>
                      <p className="text-white text-sm md:text-base">{user?.name || 'Guest User'}</p>
                    </div>
                    <div>
                      <p className="text-purple-300 text-xs md:text-sm">Email</p>
                      <p className="text-white text-sm md:text-base">{user?.email || 'Not available'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Panel - Welcome Message & Actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-md lg:w-7/12 flex flex-col"
          >
            {/* Welcome message */}
            <div className="bg-black/20 backdrop-blur-md rounded-3xl border border-purple-500/20 p-5 md:p-6 lg:p-8 mb-4 md:mb-6 shadow-[0_0_25px_rgba(139,92,246,0.15)]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3 md:space-y-4"
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">
                  Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{user?.name?.split(' ')[0] || 'Explorer'}</span>!
                </h1>
                
                <p className="text-purple-100/90 text-base md:text-lg">
                  You're all set now. Let's embark on this cosmic journey together and reach for the stars!
                </p>
              </motion.div>
            </div>
            
            {/* Quick actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col space-y-4"
            >
              {/* Get Started button */}
              <Link
                to="/home"
                className="relative w-full py-3 md:py-4 px-4 md:px-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transform hover:translate-y-[-2px] group overflow-hidden"
              >
                {/* Animated particles on hover */}
                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div 
                      key={index}
                      className="absolute w-1 h-10 bg-white/30 rounded-full transform rotate-45 group-hover:translate-y-[-100px] group-hover:translate-x-[100px] transition-transform duration-700"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        transitionDelay: `${index * 0.1}s`,
                      }}
                    ></div>
                  ))}
                </div>
                
                <div className="relative flex items-center justify-center space-x-3">
                  <span className="text-lg md:text-xl text-white font-semibold">Begin Your Journey</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-white transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
              
              {/* Additional links */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <Link to="/profile" className="flex items-center justify-center space-x-1 md:space-x-2 py-2 md:py-3 px-2 md:px-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-xl transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-white text-sm md:text-base">My Profile</span>
                </Link>
                <Link to="/social" className="flex items-center justify-center space-x-1 md:space-x-2 py-2 md:py-3 px-2 md:px-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-xl transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-white text-sm md:text-base">Community</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Style tag for custom animations */}
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        
        @keyframes pulse-slow {
          0% { opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { opacity: 0.4; }
        }
      `}</style>
      
      <ToastContainer position="bottom-center" theme="dark" />
    </div>
  );
};

export default Welcome;











