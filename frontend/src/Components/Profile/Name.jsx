import React, { act, useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; 
import { Camera, ArrowLeft, Users, Award, History, BarChart2, Mail, Shield, Settings, X } from 'lucide-react';
import ProfileImage from '../Common/ProfileImage';

const Name = () => {
  const { user, updateUser } = useContext(UserDataContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showModal, setShowModal] = useState(null);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileInfo, setProfileInfo] = useState({
    name: user.name || '',
    email: user.email || '',
    gender: user.gender || '',
    dob: user.dob || '',
    height: user.height || '',
    weight: user.weight || ''
  });

  const [postsCount, setPostsCount] = useState(0);

  const titles = {
    contactUs: 'Contact Us',
    privacyPolicy: 'Privacy Policy',
    settings: 'Settings',
    other: 'Other',
    account: 'Account',
    personalData: 'Personal Data',
    achievement: 'Achievement',
    activityHistory: 'Activity History',
    workoutProgress: 'Workout Progress',
    profile: 'Profile',
    height: 'Height',
    weight: 'Weight',
    age: 'Age',
    gender: 'Gender',
    name: 'Name',
    email: 'Email',
    userDetails: 'User Details',
    changePassword: 'Change Password',
    dob: 'Date of Birth',
    updateProfile: 'Update Profile Information',
    send: 'Send',
    close: 'Close',
    message: 'Message',
    updateProfileInfo: 'Update Profile Information',
  };

  useEffect(() => {
    fetchSocialData();
    fetchPostsCount();
  }, []);

  const fetchSocialData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [followersRes, followingRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BASE_URL}/social/followers`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${import.meta.env.VITE_BASE_URL}/social/following`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setFollowers(followersRes.data);
      setFollowing(followingRes.data);
    } catch (error) {
      console.error('Error fetching social data:', error);
      toast.error('Failed to load social data');
    }
  };

  const fetchPostsCount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/social/posts/count`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data && typeof response.data.count === 'number') {
        setPostsCount(response.data.count);
      } else {
        console.error('Invalid response format:', response.data);
        setPostsCount(0);
      }
    } catch (error) {
      console.error('Error fetching posts count:', error);
      setPostsCount(0);
      if (error.response?.status === 404) {
        toast.error('Could not fetch posts count - endpoint not found');
      } else {
        toast.error('Failed to load posts count');
      }
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setSelectedFile(file);
    handleUpload(file);
  };

  const handleUpload = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("profilePhoto", file);

    try {
      const token = localStorage.getItem('token');
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
        updateUser({ ...user, profilePicture: profileUrl });
        localStorage.setItem('profilePicture', profileUrl);
        toast.success('Profile picture updated successfully!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to update profile picture');
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    setProfileInfo({
      name: user.name || '',
      email: user.email || '',
      gender: user.gender || '',
      dob: user.dob || '',
      height: user.height || '',
      weight: user.weight || ''
    });
  }, [user]);

  const openModal = (modalName) => {
    if (!activeModal) {
      setActiveModal(modalName);
    }
  };

  const closeModal = () => {
    if (activeModal === 'contact') {
        setEmail('');
        setMessage('');
    }
    setActiveModal(null);
  };

  const handleSend = async () => {
    if (!email || !message) {
      toast.error('Please fill in all fields.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You are not logged in. Please log in and try again.');
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/uploads`,
        { email, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        toast.success('Message sent successfully!', {
          position: 'top-right',
          theme: 'dark',
        });
        setEmail('');
        setMessage('');
        closeModal(); // Close the modal after submission
      } else {
        toast.error('Failed to send message.');
      }
    } catch (error) {
      console.error('Contact API Error:', error.response);
      toast.error(error.response?.data?.error || 'An error occurred. Please try again later.');
    }
  };

  const handleChangePassword = async () => {
    try {
      if (!newPassword) {
        toast.error('Please enter a new password');
        return;
      }

      // Password validation
      if (newPassword.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication required. Please log in again.');
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/change-password`,
        { password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        toast.success('Password changed successfully!');
        setNewPassword('');
        closeModal();
      }
    } catch (error) {
      console.error('Change Password Error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to change password';
      toast.error(errorMessage);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication required. Please log in again.');
        return;
      }

      // Validate inputs
      if (!profileInfo.name || !profileInfo.email) {
        toast.error('Name and email are required fields');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(profileInfo.email)) {
        toast.error('Please enter a valid email address');
        return;
      }

      // Height and weight validation
      if (profileInfo.height && (profileInfo.height < 0 || profileInfo.height > 10)) {
        toast.error('Please enter a valid height (0-10 ft)');
        return;
      }

      if (profileInfo.weight && (profileInfo.weight < 0 || profileInfo.weight > 500)) {
        toast.error('Please enter a valid weight (0-500 kg)');
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/update-profile`,
        profileInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        updateUser({ ...user, ...response.data.user });
        toast.success('Profile updated successfully!');
        closeModal();
      }
    } catch (error) {
      console.error('Update Profile Error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update profile';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900/80 backdrop-blur-md z-10 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/social')} 
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-300" />
            </button>
            {/* <h1 className="text-xl font-semibold text-gray-100 ml-4">
              {titles.profile}
            </h1> */}
          </div>
          <button 
            onClick={() => openModal('setting')}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <Settings size={20} className="text-gray-300" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Profile Card */}
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
          
          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col items-center -mt-16">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-full h-full rounded-full border-4 border-gray-800 overflow-hidden bg-gray-700">
                  <ProfileImage user={user} size="xl" />
                </div>
                <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer shadow-lg hover:bg-blue-600 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                  <Camera size={18} className="text-white" />
                </label>
              </div>

              {/* User Details */}
              <h2 className="mt-4 text-2xl font-bold text-gray-100">{user?.name}</h2>
              <p className="text-gray-400">{user?.email}</p>

              {/* Stats */}
              <div className="flex gap-8 mt-6">
                <div onClick={() => openModal('followers')} className="text-center cursor-pointer">
                  <div className="text-xl font-semibold text-gray-100">{followers.length}</div>
                  <div className="text-sm text-gray-400">Followers</div>
                </div>
                <div onClick={() => openModal('following')} className="text-center cursor-pointer">
                  <div className="text-xl font-semibold text-gray-100">{following.length}</div>
                  <div className="text-sm text-gray-400">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-100">{postsCount}</div>
                  <div className="text-sm text-gray-400">Posts</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { icon: <i className="ri-ruler-line"/>, label: titles.height, value: `${user?.height || 'N/A'} ft` },
            { icon: <i className="ri-scales-3-line"/>, label: titles.weight, value: `${user?.weight || 'N/A'} kg` },
            { icon: <i className="ri-user-line"/>, label: titles.gender, value: user?.gender || 'N/A' },
            { icon: <i className="ri-calendar-line"/>, label: titles.age, 
              value: user?.dob ? `${new Date().getFullYear() - new Date(user.dob).getFullYear()}` : 'N/A' }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-4 flex flex-col items-center">
              <div className="text-blue-400 mb-2">{stat.icon}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
              <div className="text-lg font-semibold text-gray-100 mt-1">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {[
            { icon: <Users size={24} />, label: 'Social Feed', path: '/socialfeed', color: 'from-blue-500 to-blue-600' },
            { icon: <Mail size={24} />, label: titles.contactUs, action: () => openModal('contact'), color: 'from-red-500 to-red-600' }
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => item.path ? navigate(item.path) : item.action()}
              className={`bg-gradient-to-r ${item.color} p-4 rounded-xl cursor-pointer `}
            >
              <div className="flex items-center gap-3">
                <div className="text-white">{item.icon}</div>
                <span className="text-white font-medium">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

     

      {/* Modal for Personal Data */}
      {activeModal === 'personalData' && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="glass rounded-lg p-6 w-11/12 max-w-md">
            <h2 className="text-xl text-blue-400 font-bold mb-4 text-center">{titles.personalData}</h2>
            <ul className="space-y-2">
              <li className='text-blue-400 text-xl'><strong className='text-blue-400 text-xl'>{titles.name}:</strong> {user.name || 'N/A'}</li>
              <li className='text-blue-400 text-xl'><strong className='text-blue-400 text-xl'>{titles.email}:</strong> {user.email || 'N/A'}</li>
              <li className='text-blue-400 text-xl'><strong className='text-blue-400 text-xl'>{titles.gender}:</strong> {user.gender || 'N/A'}</li>
              <li className='text-blue-400 text-xl'><strong className='text-blue-400 text-xl'>{titles.dob}:</strong> {user.dob ? new Date(user.dob).toLocaleDateString('en-GB') : 'N/A'}</li>
              <li className='text-blue-400 text-xl'><strong className='text-blue-400 text-xl'>{titles.height}:</strong> {user.height || 'N/A'} ft</li>
              <li className='text-blue-400 text-xl'><strong className='text-blue-400 text-xl'>{titles.weight}:</strong> {user.weight || 'N/A'} kg</li>
              {user.logs && Array.isArray(user.logs) ? (
                <li>
                  <strong>Logs:</strong>
                  <ul>
                    {user.logs.map((log, index) => (
                      <li key={index}>
                        <p>{JSON.stringify(log)}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : null}
            </ul>
            <button
              className="mt-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg w-full"
              onClick={closeModal}
            >
              {titles.close}
            </button>
          </div>
        </div>
      )}

      {/* Contact Us Modal */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="glass rounded-lg p-6 w-11/12 max-w-md">
            <h2 className="text-xl text-blue-400 font-bold mb-4 text-center">{titles.contactUs}</h2>
            <div className="mb-4">
              <label className="block text-blue-400 text-sm font-bold mb-2">{titles.email}:</label>
              <input
                type="email"
                className="w-full px-3 py-2 rounded-lg bg-black bg-opacity-50 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-blue-400 text-sm font-bold mb-2">{titles.message}:</label>
              <textarea
                className="w-full px-3 py-2 rounded-lg bg-black bg-opacity-50 text-white"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
              ></textarea>
            </div>
            <button
              className="w-full bg-blue-400 text-white py-2 rounded-lg"
              onClick={handleSend}
            >
             {titles.send}
            </button>
            <button
              className="mt-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg w-full"
              onClick={closeModal}
            >
              {titles.close}
            </button>
          </div>
        </div>
      )}

      {/* Modal for Privacy Policy */}
      {activeModal === 'policy' && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="glass rounded-lg p-6 w-11/12 max-w-md">
            <h2 className="text-xl text-blue-400 font-bold mb-4 text-center">{ titles.privacyPolicy}</h2>
            <p>
              {/* Add your privacy policy content here */}
            </p>
            <button
              className="mt-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg w-full"
              onClick={closeModal}
            >
             {titles.close}
            </button>
          </div>
        </div>
      )}

      {/* Modal for Settings */}
      {activeModal === 'setting' && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col">
            {/* Header - Keep fixed */}
            <div className="bg-gray-800 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl text-gray-100 font-semibold">
                {titles.settings}
              </h2>
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="space-y-6">
                {/* Password Change Section */}
                <div className="space-y-4 bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-lg text-gray-200 font-medium">
                    {titles.changePassword}
                  </h3>
                  <div className="space-y-2">
                    <input
                      type="password"
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                    <button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
                      onClick={handleChangePassword}
                    >
                      {titles.changePassword}
                    </button>
                  </div>
                </div>

                {/* Profile Update Section */}
                <div className="space-y-4 bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-lg text-gray-200 font-medium">
                    {titles.updateProfileInfo}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm text-gray-400 mb-1">Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        value={profileInfo.name}
                        onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm text-gray-400 mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        value={profileInfo.email}
                        onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Gender</label>
                      <select
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        value={profileInfo.gender}
                        onChange={(e) => setProfileInfo({ ...profileInfo, gender: e.target.value })}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        value={profileInfo.dob}
                        onChange={(e) => setProfileInfo({ ...profileInfo, dob: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Height (ft)</label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        value={profileInfo.height}
                        onChange={(e) => setProfileInfo({ ...profileInfo, height: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Weight (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        value={profileInfo.weight}
                        onChange={(e) => setProfileInfo({ ...profileInfo, weight: e.target.value })}
                      />
                    </div>
                  </div>
                  <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors mt-4"
                    onClick={handleUpdateProfile}
                  >
                    {titles.updateProfile}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Followers Modal */}
      {activeModal === 'followers' && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col">
            <div className="bg-gray-800 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl text-gray-100 font-semibold">Followers</h2>
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="space-y-2">
                {followers.length > 0 ? (
                  followers.map(follower => (
                    <div 
                      key={follower._id} 
                      className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <ProfileImage 
                          user={follower}
                          size="md"
                        />
                      </div>
                      <div>
                        <span className="text-gray-200 font-medium">{follower.name}</span>
                        <p className="text-sm text-gray-400">{follower.email}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400">No followers yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {activeModal === 'following' && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col">
            <div className="bg-gray-800 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl text-gray-100 font-semibold">Following</h2>
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="space-y-2">
                {following.length > 0 ? (
                  following.map(followed => (
                    <div 
                      key={followed._id} 
                      className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <ProfileImage 
                          user={followed}
                          size="md"
                        />
                      </div>
                      <div>
                        <span className="text-gray-200 font-medium">{followed.name}</span>
                        <p className="text-sm text-gray-400">{followed.email}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400">Not following anyone yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer 
        position="bottom-center"
        theme="dark"
        toastClassName="bg-gray-800 text-gray-100"
      />

      {/* Add this CSS to your component or global styles */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.5) rgba(17, 24, 39, 0.7);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.7);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
          border: 2px solid rgba(17, 24, 39, 0.7);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default Name;














