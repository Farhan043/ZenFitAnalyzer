import { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Ensure profile picture is loaded from localStorage
        if (!parsedUser.profilePicture) {
          parsedUser.profilePicture = localStorage.getItem('profilePicture');
        }
        return parsedUser;
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return null;
      }
    }
    return null;
  });

  const updateUser = (newUserData) => {
    setUser(prevUser => ({ ...prevUser, ...newUserData }));
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Handle both possible response structures
      const userData = response.data.user || response.data;
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Don't clear user data on network errors to prevent data loss
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  };
 
  useEffect(() => {
    fetchData();
  }, []);

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      if (user.profilePicture) {
        localStorage.setItem('profilePicture', user.profilePicture);
      }
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('profilePicture');
    }
  }, [user]);
  
  return (
    <UserDataContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserContext


