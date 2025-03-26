import React, { useState, useEffect, useContext } from 'react';
import { UserDataContext } from '../../Context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Search, UserPlus, UserCheck } from 'lucide-react';
import ProfileImage from '../Common/ProfileImage';

const UserDiscovery = () => {
  const { user: currentUser } = useContext(UserDataContext);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/social/users`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Don't modify the profilePicture, use it directly from the backend
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/social/follow/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      fetchUsers(); // Refresh the user list
      toast.success('Successfully followed user!');
    } catch (error) {
      console.error('Error following user:', error);
      toast.error('Failed to follow user');
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/social/unfollow/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      fetchUsers(); // Refresh the user list
      toast.success('Successfully unfollowed user!');
    } catch (error) {
      console.error('Error unfollowing user:', error);
      toast.error('Failed to unfollow user');
    }
  };

  const filteredUsers = users.filter(u => 
    u._id !== currentUser._id &&
    (u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     u.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full max-w-8xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg p-4 sm:p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8 text-white">Loading users...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-white">No users found</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((discoveredUser) => (
                <div
                  key={discoveredUser._id}
                  className="flex flex-col sm:flex-row items-center justify-between p-4 hover:bg-white/5 rounded-lg transition space-y-4 sm:space-y-0"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-3 w-full">
                    <ProfileImage 
                      user={discoveredUser}
                      size="md"
                      className="flex-shrink-0"
                    />
                    <div className="text-center sm:text-left">
                      <h3 className="font-semibold text-white text-lg">
                        {discoveredUser.name}
                      </h3>
                      <p className="text-sm text-white/70">
                        {discoveredUser.email}
                      </p>
                      <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 text-sm text-white/80">
                        <span>{discoveredUser.followers?.length || 0} followers</span>
                        <span>{discoveredUser.following?.length || 0} following</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto">
                    {currentUser.following?.includes(discoveredUser._id) ? (
                      <button
                        onClick={() => handleUnfollow(discoveredUser._id)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
                      >
                        <UserCheck size={20} />
                        <span className="hidden sm:inline">Following</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleFollow(discoveredUser._id)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                      >
                        <UserPlus size={20} />
                        <span className="hidden sm:inline">Follow</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDiscovery; 