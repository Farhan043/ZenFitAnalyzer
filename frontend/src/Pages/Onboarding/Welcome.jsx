import React, { useState, useEffect } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl"
      >
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Profile Picture Section */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/50 shadow-lg">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-blue-400 flex items-center justify-center">
                  <span className="text-4xl text-white">
                    {user?.name?.charAt(0)?.toUpperCase() || '?'}
                  </span>
                </div>
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </label>
          </div>

          {/* Upload Button - Only show if new image selected and not yet uploaded */}
          {selectedImage && !hasProfilePicture && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleUpload}
              disabled={isUploading}
              className="px-6 py-2 bg-white rounded-full text-indigo-600 font-semibold shadow-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {isUploading ? "Uploading..." : "Upload Profile Picture"}
            </motion.button>
          )}

          {/* Welcome Text */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl text-white font-bold"
          >
            Welcome, {user?.name || 'Guest'}!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/90 text-lg"
          >
            You're all set now. Let's reach your goals together!
          </motion.p>

          {/* Go To Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full mt-8"
          >
            <Link
              to='/home'
              className="block w-full py-4 px-8 bg-white/20 hover:bg-white/30 text-white text-xl font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </motion.div>
      <ToastContainer position="bottom-center" theme="dark" />
    </div>
  );
};

export default Welcome;











